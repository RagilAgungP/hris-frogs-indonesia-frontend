"use client";

import {
  BriefcaseIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  TicketIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    label: "Total Karyawan",
    value: "47",
    icon: UserGroupIcon,
    tone: "bg-blue-50 text-blue-600",
  },
  {
    label: "Karyawan Aktif",
    value: "43",
    icon: CheckCircleIcon,
    tone: "bg-green-50 text-green-600",
  },
  {
    label: "PKWT Aktif",
    value: "18",
    icon: DocumentTextIcon,
    tone: "bg-yellow-50 text-yellow-600",
  },
  {
    label: "PKWT Hampir Expired",
    value: "5",
    icon: ExclamationTriangleIcon,
    tone: "bg-red-50 text-red-600",
  },
  {
    label: "Ticket Open",
    value: "7",
    icon: TicketIcon,
    tone: "bg-purple-50 text-purple-600",
  },
  {
    label: "Karyawan FSI",
    value: "28",
    icon: BriefcaseIcon,
    tone: "bg-sky-50 text-sky-600",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Ringkasan HRIS Frogs Indonesia
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-2xl p-3 ${item.tone}`}>
                  <Icon className="h-6 w-6" />
                </div>

                <div>
                  <div className="text-sm text-slate-500">{item.label}</div>
                  <div className="mt-1 text-3xl font-bold text-slate-800">
                    {item.value}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {/* PKWT AKAN SEGERA BERAKHIR */}
<div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
  <div className="flex items-center justify-between p-5 border-b border-slate-200">
    <div>
      <h2 className="text-lg font-semibold text-slate-800">
        PKWT Akan Segera Berakhir
      </h2>
      <p className="text-sm text-slate-500">
        Monitoring kontrak karyawan yang mendekati masa berakhir
      </p>
    </div>

    <button className="px-4 py-2 text-sm font-medium text-[#3db5ff] border border-[#3db5ff] rounded-lg hover:bg-[#3db5ff] hover:text-white transition">
      Lihat Semua
    </button>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
            No PKWT
          </th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
            Nama
          </th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
            Posisi
          </th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
            Tanggal Akhir
          </th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
            Sisa Hari
          </th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
            Status
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-t border-slate-100 hover:bg-slate-50">
          <td className="px-5 py-4">PKWT/FSI/2024/001</td>
          <td className="px-5 py-4 font-medium">Budi Santoso</td>
          <td className="px-5 py-4">HRGA Staff</td>
          <td className="px-5 py-4">15 Jun 2026</td>
          <td className="px-5 py-4 text-amber-600 font-semibold">
            11 Hari
          </td>
          <td className="px-5 py-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
              Almost Expired
            </span>
          </td>
        </tr>

        <tr className="border-t border-slate-100 hover:bg-slate-50">
          <td className="px-5 py-4">PKWT/FSI/2024/002</td>
          <td className="px-5 py-4 font-medium">Dewi Rahayu</td>
          <td className="px-5 py-4">IT Engineer Staff</td>
          <td className="px-5 py-4">20 Jun 2026</td>
          <td className="px-5 py-4 text-amber-600 font-semibold">
            16 Hari
          </td>
          <td className="px-5 py-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
              Almost Expired
            </span>
          </td>
        </tr>

        <tr className="border-t border-slate-100 hover:bg-slate-50">
          <td className="px-5 py-4">PKWT/ISTI/2024/001</td>
          <td className="px-5 py-4 font-medium">Ahmad Fauzi</td>
          <td className="px-5 py-4">Head of Operation</td>
          <td className="px-5 py-4">01 Jun 2026</td>
          <td className="px-5 py-4 text-red-600 font-semibold">
            Expired
          </td>
          <td className="px-5 py-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
              Expired
            </span>
          </td>
        </tr>

        <tr className="border-t border-slate-100 hover:bg-slate-50">
          <td className="px-5 py-4">PKWT/FSI/2024/003</td>
          <td className="px-5 py-4 font-medium">Siti Nurhaliza</td>
          <td className="px-5 py-4">Finance Staff</td>
          <td className="px-5 py-4">25 Jun 2026</td>
          <td className="px-5 py-4 text-amber-600 font-semibold">
            21 Hari
          </td>
          <td className="px-5 py-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
              Almost Expired
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
    </main>
  );


  
}