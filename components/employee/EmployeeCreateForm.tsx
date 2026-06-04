"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { COMPANIES, DEPARTMENTS, POSITIONS } from "@/lib/constants";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import type { Branch } from "@/lib/types";

const inputClass =
  "w-full border border-gray-300 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-[#3db5ff] focus:outline-none";
const labelClass = "font-semibold text-gray-700";

export function EmployeeCreateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const branchParam = (searchParams.get("branch") as Branch) || "FSI";
  const addEmployee = useEmployeeStore((s) => s.addEmployee);

  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    date_of_joining: "",
    branch: branchParam,
    department: "",
    position: "",
    status: "Permanent" as "Permanent" | "Contract",
    pendidikan: "",
    nik: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "Laki-laki",
    agama: "Islam",
    status_pernikahan: "Belum Menikah",
    golongan_darah: "O",
    alamat: "",
    no_hp: "",
    no_rekening: "",
    nama_bank: "BCA",
    gaji_pokok: "5000000",
    tunjangan_jabatan: "500000",
    tunjangan_makan: "300000",
    tunjangan_transport: "200000",
  });

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee({
      employee_id: form.employee_id,
      name: form.name,
      email: form.email,
      company: COMPANIES[form.branch],
      branch: form.branch,
      department: form.department,
      position: form.position,
      status: form.status,
      employee_condition: "Active",
      date_of_joining: form.date_of_joining,
      identity: {
        pendidikan: form.pendidikan,
        nik: form.nik,
        tempat_lahir: form.tempat_lahir,
        tanggal_lahir: form.tanggal_lahir,
        jenis_kelamin: form.jenis_kelamin,
        agama: form.agama,
        status_pernikahan: form.status_pernikahan,
        golongan_darah: form.golongan_darah,
      },
      identityDetail: {
        alamat: form.alamat,
        no_hp: form.no_hp,
        no_rekening: form.no_rekening,
        nama_bank: form.nama_bank,
        gaji_pokok: parseInt(form.gaji_pokok) || 0,
        tunjangan_jabatan: parseInt(form.tunjangan_jabatan) || 0,
        tunjangan_makan: parseInt(form.tunjangan_makan) || 0,
        tunjangan_transport: parseInt(form.tunjangan_transport) || 0,
      },
    });
    router.push(form.branch === "FSI" ? "/employee/fsi" : "/employee/isti");
  };

  const backUrl = form.branch === "FSI" ? "/employee/fsi" : "/employee/isti";

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Create New Employee</h2>
            <p className="text-gray-500 mt-1">Complete employee information, identity, and payroll details.</p>
          </div>
          <Link href={backUrl} className="px-5 py-2 bg-[#3db5ff] hover:bg-[#33a0e0] text-white rounded-lg font-semibold transition">
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <Section title="Employee Information" subtitle="Main employee information" color="bg-[#3db5ff]">
            <Field label="Employee ID *">
              <input required className={inputClass} value={form.employee_id} onChange={(e) => set("employee_id", e.target.value)} placeholder="EMP0001" />
            </Field>
            <Field label="Employee Name *">
              <input required className={inputClass} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Full Name" />
            </Field>
            <Field label="Email *">
              <input required type="email" className={inputClass} value={form.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label="Entry Date *">
              <input required type="date" className={inputClass} value={form.date_of_joining} onChange={(e) => set("date_of_joining", e.target.value)} />
            </Field>
            <Field label="Branch *">
              <select required className={inputClass} value={form.branch} onChange={(e) => set("branch", e.target.value)}>
                <option value="FSI">FSI</option>
                <option value="ISTI">ISTI</option>
              </select>
            </Field>
            <Field label="Department *">
              <select required className={inputClass} value={form.department} onChange={(e) => set("department", e.target.value)}>
                <option value="">Select Department</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </Field>
            <Field label="Position *">
              <select required className={inputClass} value={form.position} onChange={(e) => set("position", e.target.value)}>
                <option value="">Select Position</option>
                {POSITIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>
            <Field label="Employee Status *">
              <select required className={inputClass} value={form.status} onChange={(e) => set("status", e.target.value)}>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
              </select>
            </Field>
          </Section>

          <Section title="Identity Information" subtitle="Employee personal identity information" color="bg-green-500">
            <Field label="Pendidikan"><input className={inputClass} value={form.pendidikan} onChange={(e) => set("pendidikan", e.target.value)} /></Field>
            <Field label="NIK"><input className={inputClass} value={form.nik} onChange={(e) => set("nik", e.target.value)} /></Field>
            <Field label="Tempat Lahir"><input className={inputClass} value={form.tempat_lahir} onChange={(e) => set("tempat_lahir", e.target.value)} /></Field>
            <Field label="Tanggal Lahir"><input type="date" className={inputClass} value={form.tanggal_lahir} onChange={(e) => set("tanggal_lahir", e.target.value)} /></Field>
            <Field label="Jenis Kelamin">
              <select className={inputClass} value={form.jenis_kelamin} onChange={(e) => set("jenis_kelamin", e.target.value)}>
                <option>Laki-laki</option>
                <option>Perempuan</option>
              </select>
            </Field>
            <Field label="Agama"><input className={inputClass} value={form.agama} onChange={(e) => set("agama", e.target.value)} /></Field>
          </Section>

          <Section title="Payroll Information" subtitle="Salary and allowance details" color="bg-yellow-500">
            <Field label="Alamat"><input className={inputClass} value={form.alamat} onChange={(e) => set("alamat", e.target.value)} /></Field>
            <Field label="No HP"><input className={inputClass} value={form.no_hp} onChange={(e) => set("no_hp", e.target.value)} /></Field>
            <Field label="No Rekening"><input className={inputClass} value={form.no_rekening} onChange={(e) => set("no_rekening", e.target.value)} /></Field>
            <Field label="Nama Bank"><input className={inputClass} value={form.nama_bank} onChange={(e) => set("nama_bank", e.target.value)} /></Field>
            <Field label="Gaji Pokok"><input className={inputClass} value={form.gaji_pokok} onChange={(e) => set("gaji_pokok", e.target.value)} /></Field>
            <Field label="Tunjangan Jabatan"><input className={inputClass} value={form.tunjangan_jabatan} onChange={(e) => set("tunjangan_jabatan", e.target.value)} /></Field>
            <Field label="Tunjangan Makan"><input className={inputClass} value={form.tunjangan_makan} onChange={(e) => set("tunjangan_makan", e.target.value)} /></Field>
            <Field label="Tunjangan Transport"><input className={inputClass} value={form.tunjangan_transport} onChange={(e) => set("tunjangan_transport", e.target.value)} /></Field>
          </Section>

          <div className="flex justify-end mt-8">
            <button type="submit" className="px-8 py-3 bg-[#3db5ff] text-white rounded-lg font-semibold hover:bg-[#33a0e0]">
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({ title, subtitle, color, children }: { title: string; subtitle: string; color: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-center mb-5">
        <div className={`w-2 h-8 ${color} rounded mr-3`} />
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}
