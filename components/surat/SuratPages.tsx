"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSuratStore } from "@/store/useSuratStore";
import { ActionDropdown, DropdownItem } from "@/components/ui/ActionDropdown";

export function SuratListPage() {
  const surat = useSuratStore((s) => s.surat);
  const deleteSurat = useSuratStore((s) => s.deleteSurat);
  const [search, setSearch] = useState("");
  const [division, setDivision] = useState("");
  const [jenis, setJenis] = useState("");

  const filtered = surat.filter((s) => {
    const matchSearch = search === "" || s.perihal.toLowerCase().includes(search.toLowerCase());
    const matchDiv = division === "" || s.division.toLowerCase() === division.toLowerCase();
    const matchJenis = jenis === "" || s.jenis.toLowerCase() === jenis.toLowerCase();
    return matchSearch && matchDiv && matchJenis;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-semibold text-gray-800">SURAT FROGS INDONESIA</h2>
          <Link href="/surat/create" className="px-4 py-2 bg-[#3db5ff] text-white rounded hover:bg-[#33a0e0] font-semibold text-center">
            Create New Surat
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-4 md:space-y-0">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search surat..." className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3" />
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <select value={division} onChange={(e) => setDivision(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
              <option value="">All Division</option>
              <option>Operational</option>
              <option>Legal</option>
              <option>Finance</option>
            </select>
            <select value={jenis} onChange={(e) => setJenis(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
              <option value="">All Jenis Surat</option>
              <option>Job Order</option>
              <option>Perjanjian Kerja Sama</option>
              <option>Kwitansi/Penagihan</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded">
            <thead className="bg-[#3db5ff] text-white">
              <tr>
                <th className="py-2 px-4 border-b text-center">ID</th>
                <th className="py-2 px-4 border-b">Perihal</th>
                <th className="py-2 px-4 border-b">Kepada</th>
                <th className="py-2 px-4 border-b">Division</th>
                <th className="py-2 px-4 border-b">Jenis Surat</th>
                <th className="py-2 px-4 border-b">No Surat Panjang</th>
                <th className="py-2 px-4 border-b">Tanggal Surat</th>
                <th className="py-2 px-4 border-b">Berkas Surat</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td className="py-2 px-4 border-b text-center">{s.id}</td>
                  <td className="py-2 px-4 border-b">{s.perihal}</td>
                  <td className="py-2 px-4 border-b">{s.kepada}</td>
                  <td className="py-2 px-4 border-b">{s.division}</td>
                  <td className="py-2 px-4 border-b">{s.jenis}</td>
                  <td className="py-2 px-4 border-b">{s.no_surat}</td>
                  <td className="py-2 px-4 border-b">{s.tanggal}</td>
                  <td className="py-2 px-4 border-b"><a href="#" className="text-blue-500 hover:underline">Download</a></td>
                  <td className="py-2 px-4 border-b">
                    <ActionDropdown label="Actions">
                      <DropdownItem href="#">Edit</DropdownItem>
                      <DropdownItem onClick={() => { if (confirm("Delete?")) deleteSurat(s.id); }} className="text-red-500">Delete</DropdownItem>
                    </ActionDropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function SuratCreateForm() {
  const router = useRouter();

  const addSurat = useSuratStore((s) => s.addSurat);

  const [form, setForm] = useState({
    nomorMethod: "auto",
    perihal: "",
    kepada: "",
    instansi: "",
    division: "",
    jenis: "",
    no_surat: "",
    tanggal: "",
    file: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addSurat({
      perihal: form.perihal,
      kepada: form.kepada,
      division: form.division,
      jenis: form.jenis,
      no_surat:
        form.nomorMethod === "auto"
          ? "AUTO-GENERATED"
          : form.no_surat,
      tanggal: form.tanggal,
    });

    router.push("/surat");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Create New Surat
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Metode Nomor Surat */}
          <div>
            <label className="block font-semibold mb-2">
              Nomor Surat
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={form.nomorMethod === "manual"}
                  onChange={() =>
                    setForm({
                      ...form,
                      nomorMethod: "manual",
                    })
                  }
                />
                Manual
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={form.nomorMethod === "auto"}
                  onChange={() =>
                    setForm({
                      ...form,
                      nomorMethod: "auto",
                    })
                  }
                />
                Otomatis
              </label>
            </div>
          </div>

          {/* Perihal */}
          <div>
            <label className="font-semibold">
              Perihal
            </label>

            <input
              type="text"
              required
              value={form.perihal}
              onChange={(e) =>
                setForm({
                  ...form,
                  perihal: e.target.value,
                })
              }
              className="w-full border rounded p-3 mt-1"
            />
          </div>

          {/* Kepada */}
          <div>
            <label className="font-semibold">
              Kepada
            </label>

            <input
              type="text"
              required
              value={form.kepada}
              onChange={(e) =>
                setForm({
                  ...form,
                  kepada: e.target.value,
                })
              }
              className="w-full border rounded p-3 mt-1"
            />
          </div>

          {/* Instansi */}
          <div>
            <label className="font-semibold">
              Instansi
            </label>

            <select
              required
              value={form.instansi}
              onChange={(e) =>
                setForm({
                  ...form,
                  instansi: e.target.value,
                })
              }
              className="w-full border rounded p-3 mt-1"
            >
              <option value="">
                Pilih Instansi
              </option>

              <option value="FSI">
                FSI
              </option>

              <option value="ISTI">
                ISTI
              </option>
            </select>
          </div>

          {/* Divisi */}
          <div>
            <label className="font-semibold">
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
              className="w-full border rounded p-3 mt-1"
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

          {/* Jenis Surat */}
          <div>
            <label className="font-semibold">
              Jenis Surat
            </label>

            <select
              required
              value={form.jenis}
              onChange={(e) =>
                setForm({
                  ...form,
                  jenis: e.target.value,
                })
              }
              className="w-full border rounded p-3 mt-1"
            >
              <option value="">
                Pilih Jenis Surat
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

          {/* No Surat */}
          <div>
            <label className="font-semibold">
              No Surat
            </label>

            <input
              type="text"
              disabled={form.nomorMethod === "auto"}
              required={form.nomorMethod === "manual"}
              value={form.no_surat}
              onChange={(e) =>
                setForm({
                  ...form,
                  no_surat: e.target.value,
                })
              }
              placeholder={
                form.nomorMethod === "auto"
                  ? "Generated otomatis"
                  : "Masukkan nomor surat"
              }
              className="w-full border rounded p-3 mt-1 disabled:bg-gray-100"
            />
          </div>

          {/* Tanggal Surat */}
          <div>
            <label className="font-semibold">
              Tanggal Surat
            </label>

            <input
              type="date"
              required
              value={form.tanggal}
              onChange={(e) =>
                setForm({
                  ...form,
                  tanggal: e.target.value,
                })
              }
              className="w-full border rounded p-3 mt-1"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="font-semibold">
              Berkas Surat
            </label>

            <input
              type="file"
              className="w-full border rounded p-3 mt-1"
              onChange={(e) =>
                setForm({
                  ...form,
                  file: e.target.files?.[0] || null,
                })
              }
            />

            <p className="text-sm text-gray-500 mt-1">
              Maximum upload size 50.00 MB
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/surat")}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 bg-[#3db5ff] text-white rounded font-semibold hover:bg-[#33a0e0]"
            >
              Save Surat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}