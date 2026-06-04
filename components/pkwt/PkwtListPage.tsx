"use client";

import { useState, useMemo } from "react";
import { usePkwtStore } from "@/store/usePkwtStore";
import { SuccessAlert } from "@/components/ui/SuccessAlert";
import { ActionDropdown, DropdownItem } from "@/components/ui/ActionDropdown";
import { PkwtEditModal } from "./PkwtEditModal";
import { formatDate } from "@/lib/utils";
import type { Branch, Pkwt } from "@/lib/types";

export function PkwtListPage({ branch }: { branch: Branch }) {
  const pkwts = usePkwtStore((s) => s.pkwts);
  const successMessage = usePkwtStore((s) => s.successMessage);
  const setSuccessMessage = usePkwtStore((s) => s.setSuccessMessage);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [editPkwt, setEditPkwt] = useState<Pkwt | null>(null);

  const branchPkwts = useMemo(
    () => pkwts.filter((p) => p.branch === branch),
    [pkwts, branch]
  );

  const departments = useMemo(
    () =>
      Array.from(new Set(branchPkwts.map((p) => p.employee_department))).filter(Boolean),
    [branchPkwts]
  );

  const positions = useMemo(
    () =>
      Array.from(new Set(branchPkwts.map((p) => p.employee_position))).filter(Boolean),
    [branchPkwts]
  );

  const filtered = useMemo(() => {
    return branchPkwts.filter((p) => {
      const matchSearch =
        search === "" ||
        p.employee_name.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "" || p.status === statusFilter;

      const matchDept =
        departmentFilter === "" ||
        p.employee_department?.toLowerCase() === departmentFilter.toLowerCase();

      const matchPos =
        positionFilter === "" ||
        p.employee_position?.toLowerCase() === positionFilter.toLowerCase();

      return matchSearch && matchStatus && matchDept && matchPos;
    });
  }, [branchPkwts, search, statusFilter, departmentFilter, positionFilter]);

  const statusBadge = (status: string) => {
    if (status === "active") return "bg-green-100 text-green-700";
    if (status === "almost expired") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const rowBg = (status: string) => {
    if (status === "expired") return "bg-red-50 hover:bg-red-100";
    if (status === "almost expired") return "bg-yellow-50 hover:bg-yellow-100";
    return "hover:bg-gray-50";
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              PKWT {branch} Employees
            </h1>
            <p className="text-gray-500 mt-1">
              Management data kontrak karyawan {branch}
            </p>
          </div>

    
        </div>

        <SuccessAlert
          message={successMessage}
          onDismiss={() => setSuccessMessage(null)}
        />

        {/* FILTER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-6">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee..."
            className="w-full xl:w-1/3 border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#3db5ff]"
          />

          <div className="flex flex-col sm:flex-row gap-3">

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-56 border border-gray-300 rounded-xl px-4 py-2.5"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="almost expired">Almost Expired</option>
              <option value="expired">Expired</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-56 border border-gray-300 rounded-xl px-4 py-2.5"
            >
              <option value="">All Department</option>
              {departments.map((d) => (
                <option key={d} value={d.toLowerCase()}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="w-56 border border-gray-300 rounded-xl px-4 py-2.5"
            >
              <option value="">All Position</option>
              {positions.map((p) => (
                <option key={p} value={p.toLowerCase()}>
                  {p}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <div className="min-w-[1200px]">

            <table className="w-full table-auto">

              <thead className="bg-[#3db5ff] text-white">
                <tr>
                  <th className="py-3 px-4 text-center">No</th>
                  <th className="py-3 px-4 text-left">Employee</th>
                  <th className="py-3 px-4 text-left">Contract</th>
                  <th className="py-3 px-4 text-left">Department</th>
                  <th className="py-3 px-4 text-left">Position</th>
                  <th className="py-3 px-4 text-left">Start</th>
                  <th className="py-3 px-4 text-left">End</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">File PKWT</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((pkwt, idx) => (
                  <tr
                    key={pkwt.id}
                    className={`border-b ${rowBg(pkwt.status)}`}
                  >

                    <td className="py-3 px-4 text-center">{idx + 1}</td>

                    <td className="py-3 px-4 font-medium text-gray-800">
                      {pkwt.employee_name}
                    </td>

                    <td className="py-3 px-4">{pkwt.contract_number}</td>
                    <td className="py-3 px-4">{pkwt.employee_department}</td>
                    <td className="py-3 px-4">{pkwt.employee_position}</td>
                    <td className="py-3 px-4">{formatDate(pkwt.start_date)}</td>
                    <td className="py-3 px-4">{formatDate(pkwt.end_date)}</td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge(
                          pkwt.status
                        )}`}
                      >
                        {pkwt.status}
                      </span>
                    </td>

                    {/* FILE */}
                    <td className="py-3 px-4">
                      <span className="text-blue-600 font-medium">
                        Download
                      </span>
                    </td>

                    {/* ACTION FIXED */}
                    <td className="py-3 px-4 text-center">
                      <ActionDropdown>

                        {/* EDIT DATA */}
                        <DropdownItem onClick={() => setEditPkwt(pkwt)}>
                          Edit Data
                        </DropdownItem>

                        {/* DELETE FILE ONLY */}
                        <DropdownItem
                          className="text-red-500"
                          onClick={() => {
                            if (confirm("Delete only PKWT file?")) {
                              // nanti ganti ke fungsi delete file saja
                              console.log("Delete file only:", pkwt.id);
                            }
                          }}
                        >
                          Delete File Only
                        </DropdownItem>

                      </ActionDropdown>
                    </td>

                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center py-8 text-gray-500">
                      No PKWT employee data found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

          </div>
        </div>

      </div>

      {editPkwt && (
        <PkwtEditModal
          pkwt={editPkwt}
          onClose={() => setEditPkwt(null)}
        />
      )}
    </div>
  );
}