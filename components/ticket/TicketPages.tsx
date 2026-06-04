"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionDropdown, DropdownItem } from "@/components/ui/ActionDropdown";

type TicketStatus = "pending" | "diproses" | "ditolak";

type Ticket = {
  id: number;
  name: string;
  division: string;
  category: string;
  ticketNumber: string;
  description: string;
  status: TicketStatus;
  created_at: string;
};

const initialTickets: Ticket[] = [
  {
    id: 1,
    name: "Ragil Agung Pamungkas",
    division: "Technology",
    category: "Job Order",
    ticketNumber: "TKT-2026-001",
    description: "Permohonan pembuatan Job Order untuk kebutuhan pengembangan aplikasi internal.",
    status: "pending",
    created_at: "2026-06-05",
  },
  {
    id: 2,
    name: "Dewi Rahayu",
    division: "Finance, Accounting, Tax",
    category: "Kwitansi/Penagihan",
    ticketNumber: "TKT-2026-002",
    description: "Pengajuan dokumen kwitansi dan penagihan vendor bulan Mei 2026.",
    status: "diproses",
    created_at: "2026-06-04",
  },
  {
    id: 3,
    name: "Ahmad Fauzi",
    division: "Legal",
    category: "Perjanjian Kerja Sama",
    ticketNumber: "TKT-2026-003",
    description: "Permintaan review dan pembuatan draft Perjanjian Kerja Sama dengan mitra baru.",
    status: "ditolak",
    created_at: "2026-06-03",
  },
  {
    id: 4,
    name: "Siti Nurhaliza",
    division: "Human Resource General Affairs",
    category: "Surat Keputusan",
    ticketNumber: "TKT-2026-004",
    description: "Pengajuan Surat Keputusan untuk penunjukan PIC proyek.",
    status: "pending",
    created_at: "2026-06-02",
  },
  {
    id: 5,
    name: "Andi Pratama",
    division: "Business Development",
    category: "Memorandum of Agreement",
    ticketNumber: "TKT-2026-005",
    description: "Permohonan pembuatan Memorandum of Agreement dengan calon partner bisnis.",
    status: "diproses",
    created_at: "2026-06-01",
  },
];

function statusBadgeClass(status: TicketStatus) {
  if (status === "diproses") return "bg-green-100 text-green-700";
  if (status === "ditolak") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
}

function statusLabel(status: TicketStatus) {
  if (status === "diproses") return "Diproses";
  if (status === "ditolak") return "Ditolak";
  return "Pending";
}

export function TicketListPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();

    return tickets.filter((t) => {
      return (
        t.name.toLowerCase().includes(keyword) ||
        t.division.toLowerCase().includes(keyword) ||
        t.category.toLowerCase().includes(keyword) ||
        t.ticketNumber.toLowerCase().includes(keyword) ||
        t.description.toLowerCase().includes(keyword) ||
        t.created_at.toLowerCase().includes(keyword) ||
        statusLabel(t.status).toLowerCase().includes(keyword)
      );
    });
  }, [tickets, search]);

  const updateStatus = (id: number, status: TicketStatus) => {
    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket))
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Ticket Management
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Frontend demo untuk daftar ticket
            </p>
          </div>

          <Link
            href="/ticket/create"
            className="px-4 py-2 bg-[#3db5ff] text-white rounded hover:bg-[#33a0e0] font-semibold text-center"
          >
            Create New Ticket
          </Link>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ticket..."
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#3db5ff]"
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#3db5ff] text-white">
              <tr>
                <th className="py-3 px-4 border-b text-center whitespace-nowrap">
                  No
                </th>
                <th className="py-3 px-4 border-b text-left whitespace-nowrap">
                  Nama
                </th>
                <th className="py-3 px-4 border-b text-left whitespace-nowrap">
                  Asal Divisi
                </th>
                <th className="py-3 px-4 border-b text-left whitespace-nowrap">
                  Jenis Ticket
                </th>
                <th className="py-3 px-4 border-b text-left whitespace-nowrap">
                  No Ticket
                </th>
                <th className="py-3 px-4 border-b text-left whitespace-nowrap">
                  Deskripsi
                </th>
                <th className="py-3 px-4 border-b text-left whitespace-nowrap">
                  Status
                </th>
                <th className="py-3 px-4 border-b text-left whitespace-nowrap">
                  Tanggal Request
                </th>
                <th className="py-3 px-4 border-b text-center whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-6 text-center text-gray-500">
                    No ticket data found
                  </td>
                </tr>
              ) : (
                filtered.map((t, index) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b text-center">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 border-b">{t.name}</td>
                    <td className="py-3 px-4 border-b">{t.division}</td>
                    <td className="py-3 px-4 border-b">{t.category}</td>
                    <td className="py-3 px-4 border-b">{t.ticketNumber}</td>
                    <td className="py-3 px-4 border-b max-w-[320px]">
                      <span className="block truncate">{t.description}</span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(
                          t.status
                        )}`}
                      >
                        {statusLabel(t.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">{t.created_at}</td>
                    <td className="py-3 px-4 border-b text-center">
                      <ActionDropdown>
                        <DropdownItem
                          onClick={() => updateStatus(t.id, "diproses")}
                        >
                          Diproses
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => updateStatus(t.id, "ditolak")}
                          className="text-red-500"
                        >
                          Ditolak
                        </DropdownItem>
                      </ActionDropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function TicketCreateForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: "",
    division: "",
    jenisTicket: "",
    deskripsi: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Ticket berhasil dibuat (frontend only)");

    router.push("/ticket");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Create New | Tambah Ticket
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Nama */}
          <div>
            <label className="block font-semibold mb-2">
              Nama
            </label>

            <input
              type="text"
              required
              value={form.nama}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama: e.target.value,
                })
              }
              className="w-full border rounded p-3"
              placeholder="Masukkan nama"
            />
          </div>

          {/* Divisi */}
          <div>
            <label className="block font-semibold mb-2">
              Asal Divisi
            </label>

            <select
              required
              value={form.division}
              onChange={(e) =>
                setForm({
                  ...form,
                  division: e.target.value,
                })
              }
              className="w-full border rounded p-3"
            >
              <option value="">
                -- Pilih Divisi --
              </option>

              <option>Board of Directors</option>
              <option>Operational</option>
              <option>Technology</option>
              <option>Business Development</option>
              <option>Finance, Accounting, Tax</option>
              <option>Human Resource General Affairs</option>
              <option>Legal</option>
            </select>
          </div>

          {/* Jenis Ticket */}
          <div>
            <label className="block font-semibold mb-2">
              Jenis Ticket
            </label>

            <select
              required
              value={form.jenisTicket}
              onChange={(e) =>
                setForm({
                  ...form,
                  jenisTicket: e.target.value,
                })
              }
              className="w-full border rounded p-3"
            >
              <option value="">
                Pilih Jenis Ticket
              </option>

              <option>Addendum</option>
              <option>Berita Acara</option>
              <option>Job Order</option>
              <option>PKK</option>
              <option>Perjanjian Kerja Sama</option>
              <option>Kwitansi/Penagihan</option>
              <option>Memorandum of Understandings</option>
              <option>Memorandum of Agreement</option>
              <option>Minutes of Meeting</option>
              <option>Nota Dinas</option>
              <option>Pemberitahuan</option>
              <option>Permohonan</option>
              <option>Perjanjian Kerahasiaan</option>
              <option>Penawaran</option>
              <option>Purchase Order</option>
              <option>Surat Keputusan</option>
              <option>Surat Rekomendasi</option>
              <option>Surat Tugas</option>
              <option>Standard Operational Procedure</option>
              <option>Surat Kuasa</option>
              <option>Perjanjian Jual Beli</option>
              <option>Surat Pengajuan</option>
              <option>Surat Keterangan</option>
              <option>Delivery Order</option>
              <option>Surat Peringatan</option>
            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block font-semibold mb-2">
              Deskripsi
            </label>

            <textarea
              required
              rows={5}
              value={form.deskripsi}
              onChange={(e) =>
                setForm({
                  ...form,
                  deskripsi: e.target.value,
                })
              }
              className="w-full border rounded p-3"
              placeholder="Masukkan deskripsi ticket"
            />
          </div>

          {/* Button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/ticket")}
              className="flex-1 py-3 border border-gray-300 rounded font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 bg-[#3db5ff] text-white rounded font-semibold hover:bg-[#33a0e0]"
            >
              Submit Ticket
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}