"use client";

import { useEffect, useMemo, useState } from "react";
import type { DepartmentRow } from "@/lib/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type PageType = "okr" | "form" | "sop" | "memo";

interface DepartmentPageTemplateProps {
  pageType: PageType;
  deptLabel: string;
  rows: DepartmentRow[];
}

const titles: Record<PageType, string> = {
  okr: "OBJECTIVES & KEY RESULTS (OKR)",
  form: "FORM",
  sop: "STANDARD OPERATING PROCEDURE (SOP)",
  memo: "MEMORANDUM",
};

type EditValues = {
  objective: string;
  keyResult: string;
  owner: string;
  weight: string;
  target: string;
  actual: string;
  progress: string;

  title: string;
  documentNumber: string;
  revision: string;
  isoScope: string;
};

export function DepartmentPageTemplate({
  pageType,
  deptLabel,
  rows,
}: DepartmentPageTemplateProps) {
  const isOkr = pageType === "okr";

  const [tableRows, setTableRows] = useState<DepartmentRow[]>(rows);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [editingRow, setEditingRow] = useState<DepartmentRow | null>(null);
  const [editingFileRow, setEditingFileRow] = useState<DepartmentRow | null>(
    null
  );

  const [editValues, setEditValues] = useState<EditValues>({
    objective: "",
    keyResult: "",
    owner: "",
    weight: "",
    target: "",
    actual: "",
    progress: "",
    title: "",
    documentNumber: "",
    revision: "",
    isoScope: "",
  });

  const [fileValue, setFileValue] = useState("");

  useEffect(() => {
    setTableRows(rows);
  }, [rows]);

  const getProgressColor = (progress: number) => {
    if (progress >= 85) return "bg-green-500";
    if (progress >= 70) return "bg-yellow-400";
    return "bg-red-500";
  };

  const getProgressBadge = (progress: number) => {
    if (progress >= 85) return "bg-green-100 text-green-700";
    if (progress >= 70) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const chartData: ChartData<"bar"> = {
    labels: isOkr ? tableRows.map((row) => row.objective ?? "") : [],
    datasets: [
      {
        label: "Progress (%)",
        data: isOkr ? tableRows.map((row) => Number(row.progress) || 0) : [],
        backgroundColor: isOkr
          ? tableRows.map((row) => {
              const progress = Number(row.progress) || 0;
              if (progress >= 85) return "#22c55e";
              if (progress >= 70) return "#facc15";
              return "#ef4444";
            })
          : [],
        borderRadius: 6,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  const openEditModal = (row: DepartmentRow) => {
    setOpenMenuId(null);
    setEditingFileRow(null);
    setEditingRow(row);

    if (isOkr) {
      setEditValues({
        objective: row.objective ?? "",
        keyResult: row.keyResult ?? "",
        owner: row.owner ?? "",
        weight: String(row.weight ?? ""),
        target: String(row.target ?? ""),
        actual: String(row.actual ?? ""),
        progress: String(row.progress ?? ""),
        title: "",
        documentNumber: "",
        revision: "",
        isoScope: "",
      });
    } else {
      setEditValues({
        objective: "",
        keyResult: "",
        owner: "",
        weight: "",
        target: "",
        actual: "",
        progress: "",
        title: row.title ?? "",
        documentNumber: row.documentNumber ?? "",
        revision: row.revision ?? "",
        isoScope: row.isoScope ?? "",
      });
    }
  };

  const openEditFileModal = (row: DepartmentRow) => {
    setOpenMenuId(null);
    setEditingRow(null);
    setEditingFileRow(row);
    setFileValue(row.file ?? "");
  };

  const closeModals = () => {
    setEditingRow(null);
    setEditingFileRow(null);
  };

  const handleDelete = (id: number) => {
    setTableRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleSaveEdit = () => {
    if (!editingRow) return;

    setTableRows((prev) =>
      prev.map((row) => {
        if (row.id !== editingRow.id) return row;

        if (isOkr) {
          return {
            ...row,
            objective: editValues.objective,
            keyResult: editValues.keyResult,
            owner: editValues.owner,
            weight: Number(editValues.weight) || 0,
            target: Number(editValues.target) || 0,
            actual: Number(editValues.actual) || 0,
            progress: Number(editValues.progress) || 0,
          };
        }

        return {
          ...row,
          title: editValues.title,
          documentNumber: editValues.documentNumber,
          revision: editValues.revision,
          isoScope: editValues.isoScope,
        };
      })
    );

    closeModals();
  };

  const handleSaveFile = () => {
    if (!editingFileRow) return;

    setTableRows((prev) =>
      prev.map((row) =>
        row.id === editingFileRow.id
          ? {
              ...row,
              file: fileValue,
            }
          : row
      )
    );

    closeModals();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* TABLE */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            {titles[pageType]} DIVISI {deptLabel.toUpperCase()}
          </h1>

          <button
            type="button"
            className="px-4 py-2 bg-[#3db5ff] text-white rounded font-semibold hover:bg-[#33a0e0] transition"
          >
            ADD NEW
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded">
            <thead className="bg-[#3db5ff] text-white text-sm">
              {isOkr ? (
                <tr>
                  <th className="px-3 py-2 text-center">ID</th>
                  <th className="px-3 py-2">OBJECTIVE NAME</th>
                  <th className="px-3 py-2">KEY RESULT</th>
                  <th className="px-3 py-2">OWNER</th>
                  <th className="px-3 py-2 text-center">WEIGHT (%)</th>
                  <th className="px-3 py-2 text-center">TARGET (%)</th>
                  <th className="px-3 py-2 text-center">ACTUAL (%)</th>
                  <th className="px-3 py-2 text-center">PROGRESS (%)</th>
                  <th className="px-3 py-2 text-center">ACTIONS</th>
                </tr>
              ) : (
                <tr>
                  <th className="px-3 py-2 text-center">No</th>
                  <th className="px-3 py-2">Nama Prosedur</th>
                  <th className="px-3 py-2">No Dokumen</th>
                  <th className="px-3 py-2">Revisi Ke</th>
                  <th className="px-3 py-2">Scope ISO</th>
                  <th className="px-3 py-2">File</th>
                  <th className="px-3 py-2 text-center">Actions</th>
                </tr>
              )}
            </thead>

            <tbody className="text-sm">
              {tableRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={isOkr ? 9 : 7}
                    className="px-3 py-8 text-center text-gray-500"
                  >
                    No data found.
                  </td>
                </tr>
              ) : (
                tableRows.map((row) =>
                  isOkr ? (
                    <tr key={row.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2 text-center">{row.id}</td>
                      <td className="px-3 py-2">{row.objective ?? "-"}</td>
                      <td className="px-3 py-2">{row.keyResult ?? "-"}</td>
                      <td className="px-3 py-2">{row.owner ?? "-"}</td>
                      <td className="px-3 py-2 text-center">
                        {row.weight ?? "-"}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {row.target ?? "-"}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {row.actual ?? "-"}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getProgressBadge(
                            Number(row.progress) || 0
                          )}`}
                        >
                          {Number(row.progress) || 0}%
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <div className="relative inline-block">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenuId(openMenuId === row.id ? null : row.id)
                            }
                            className="px-3 py-1.5 rounded-lg border border-[#3db5ff] text-[#3db5ff] bg-white hover:bg-blue-50 transition"
                          >
                            Actions <span className="ml-1">▾</span>
                          </button>

                          {openMenuId === row.id && (
                            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-30">
                              <button
                                type="button"
                                onClick={() => openEditModal(row)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  handleDelete(row.id);
                                }}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={row.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2 text-center">{row.id}</td>

                      <td className="px-3 py-2">{row.title ?? "-"}</td>

                      <td className="px-3 py-2">{row.documentNumber ?? "-"}</td>

                      <td className="px-3 py-2 text-center">
                        {row.revision ?? "-"}
                      </td>

                      <td className="px-3 py-2">{row.isoScope ?? "-"}</td>

                      <td className="px-3 py-2">
                        {row.file ? (
                          <a
                            href={row.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Download
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>

                      <td className="px-3 py-2 text-center">
                        <div className="relative inline-block">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenuId(openMenuId === row.id ? null : row.id)
                            }
                            className="px-3 py-1.5 rounded-lg border border-[#3db5ff] text-[#3db5ff] bg-white hover:bg-blue-50 transition"
                          >
                            Actions <span className="ml-1">▾</span>
                          </button>

                          {openMenuId === row.id && (
                            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-30">
                              <button
                                type="button"
                                onClick={() => openEditModal(row)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => openEditFileModal(row)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Edit File
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  handleDelete(row.id);
                                }}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 CARD BAWAH KHUSUS OKR */}
      {isOkr && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1 */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="font-semibold mb-4">Progress per Objective</h2>

            <div className="h-[280px]">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="font-semibold mb-4">Result</h2>

            <div className="space-y-4">
              {tableRows.map((row) => {
                const progress = Number(row.progress) || 0;

                return (
                  <div key={row.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{row.objective ?? "-"}</span>
                      <span>{progress}%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(progress)}`}
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="font-semibold mb-4">Keterangan</h2>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Tidak Berjalan &lt; 30%
              </li>

              <li className="flex items-center">
                <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                Sedang Berjalan 30-69%
              </li>

              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Target Tercapai 70-99%
              </li>

              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                Melampaui Target 100%
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* MODAL EDIT */}
      {editingRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="border-b px-6 py-4">
              <h3 className="text-lg font-bold text-gray-800">Edit Data</h3>
              <p className="text-sm text-gray-500">
                Frontend only — perubahan akan langsung tampil di tabel.
              </p>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
              {isOkr ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-semibold">
                      Objective Name
                    </label>
                    <input
                      value={editValues.objective}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          objective: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-semibold">
                      Key Result
                    </label>
                    <input
                      value={editValues.keyResult}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          keyResult: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      Owner
                    </label>
                    <input
                      value={editValues.owner}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          owner: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      Weight (%)
                    </label>
                    <input
                      type="number"
                      value={editValues.weight}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          weight: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      Target (%)
                    </label>
                    <input
                      type="number"
                      value={editValues.target}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          target: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      Actual (%)
                    </label>
                    <input
                      type="number"
                      value={editValues.actual}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          actual: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-semibold">
                      Progress (%)
                    </label>
                    <input
                      type="number"
                      value={editValues.progress}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          progress: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-semibold">
                      Nama Prosedur
                    </label>
                    <input
                      value={editValues.title}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      No Dokumen
                    </label>
                    <input
                      value={editValues.documentNumber}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          documentNumber: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      Revisi Ke
                    </label>
                    <input
                      value={editValues.revision}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          revision: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-semibold">
                      Scope ISO
                    </label>
                    <input
                      value={editValues.isoScope}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          isoScope: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
              <button
                type="button"
                onClick={closeModals}
                className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveEdit}
                className="rounded-lg bg-[#3db5ff] px-4 py-2 font-semibold text-white hover:bg-[#33a0e0]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT FILE */}
      {editingFileRow && !isOkr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="border-b px-6 py-4">
              <h3 className="text-lg font-bold text-gray-800">Edit File</h3>
              <p className="text-sm text-gray-500">
                Frontend only — ubah path/file yang tampil di tabel.
              </p>
            </div>

            <div className="px-6 py-5">
              <label className="mb-1 block text-sm font-semibold">
                File Path / URL
              </label>
              <input
                value={fileValue}
                onChange={(e) => setFileValue(e.target.value)}
                placeholder="/files/forms/leave-request-form.pdf"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
              />

              <p className="mt-2 text-sm text-gray-500">
                Contoh: /files/forms/leave-request-form.pdf
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
              <button
                type="button"
                onClick={closeModals}
                className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveFile}
                className="rounded-lg bg-[#3db5ff] px-4 py-2 font-semibold text-white hover:bg-[#33a0e0]"
              >
                Save File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}