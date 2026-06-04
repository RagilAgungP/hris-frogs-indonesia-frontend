"use client";

import { useState } from "react";
import Link from "next/link";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { formatDate, formatRupiah } from "@/lib/utils";
import type { Employee } from "@/lib/types";

const fieldClass =
  "w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-[#3db5ff] focus:border-[#3db5ff] disabled:opacity-100";

export function EmployeeDetailPage({ employee }: { employee: Employee }) {
  const updateEmployee = useEmployeeStore((s) => s.updateEmployee);
  const updateIdentity = useEmployeeStore((s) => s.updateIdentity);
  const updateIdentityDetail = useEmployeeStore((s) => s.updateIdentityDetail);

  const [tab, setTab] = useState<"employment" | "personal">("employment");
  const [editMain, setEditMain] = useState(false);
  const [editIdentity, setEditIdentity] = useState(false);
  const [editPayroll, setEditPayroll] = useState(false);

  const [main, setMain] = useState({
    name: employee.name,
    email: employee.email,
    department: employee.department,
    position: employee.position,
    status: employee.status,
  });

  const [identity, setIdentity] = useState({ ...employee.identity });
  const [payroll, setPayroll] = useState({ ...employee.identityDetail });

  const backUrl = employee.branch === "FSI" ? "/employee/fsi" : "/employee/isti";
  const totalSalary =
    payroll.gaji_pokok + payroll.tunjangan_jabatan + payroll.tunjangan_makan + payroll.tunjangan_transport;

  const saveMain = () => {
    updateEmployee(employee.id, main);
    setEditMain(false);
  };

  const saveIdentity = () => {
    updateIdentity(employee.id, identity);
    setEditIdentity(false);
  };

  const savePayroll = () => {
    updateIdentityDetail(employee.id, payroll);
    setEditPayroll(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Detail</h1>
        <Link href={backUrl} className="inline-flex items-center px-4 py-2 bg-[#3db5ff] text-white rounded-lg hover:bg-[#33a0e0] transition">
          ← Back
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-[#3db5ff] px-6 md:px-8 py-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                <span className="text-3xl md:text-4xl font-bold">{employee.name.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{employee.name}</h1>
                <p className="text-blue-100 mt-1">Employee ID: {employee.employee_id}</p>
                <p className="text-blue-100">{employee.branch} • {employee.department} • {employee.position}</p>
              </div>
            </div>
            <div>
              {employee.employee_condition === "Active" ? (
                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">Active</span>
              ) : (
                <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold">Resigned</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex gap-2 border-b border-gray-200 mb-6">
            <button
              type="button"
              onClick={() => setTab("employment")}
              className={tab === "employment" ? "px-4 py-2 font-semibold border-b-4 border-[#3db5ff] text-[#3db5ff] -mb-px" : "px-4 py-2 font-semibold border-b-4 border-transparent text-gray-600 -mb-px"}
            >
              Employment & Salary
            </button>
            <button
              type="button"
              onClick={() => setTab("personal")}
              className={tab === "personal" ? "px-4 py-2 font-semibold border-b-4 border-[#3db5ff] text-[#3db5ff] -mb-px" : "px-4 py-2 font-semibold border-b-4 border-transparent text-gray-600 -mb-px"}
            >
              Personal Info
            </button>
          </div>

          {tab === "employment" && (
            <div className="space-y-6">
              <EditableSection
                title="Employment Info"
                editing={editMain}
                onToggle={() => (editMain ? saveMain() : setEditMain(true))}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  <Field label="Employee ID" value={employee.employee_id} disabled />
                  <InputField label="Full Name" value={main.name} disabled={!editMain} onChange={(v) => setMain({ ...main, name: v })} />
                  <InputField label="Email" value={main.email} disabled={!editMain} onChange={(v) => setMain({ ...main, email: v })} />
                  <Field label="Company" value={employee.company} disabled />
                  <Field label="Branch" value={employee.branch} disabled />
                  <InputField label="Department" value={main.department} disabled={!editMain} onChange={(v) => setMain({ ...main, department: v })} />
                  <InputField label="Position" value={main.position} disabled={!editMain} onChange={(v) => setMain({ ...main, position: v })} />
                  <Field label="Join Date" value={formatDate(employee.date_of_joining)} disabled />
                </div>
              </EditableSection>

              <EditableSection
                title="Payroll Info"
                editing={editPayroll}
                onToggle={() => (editPayroll ? savePayroll() : setEditPayroll(true))}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField label="Gaji Pokok" value={String(payroll.gaji_pokok)} disabled={!editPayroll} onChange={(v) => setPayroll({ ...payroll, gaji_pokok: parseInt(v) || 0 })} />
                  <InputField label="Tunjangan Jabatan" value={String(payroll.tunjangan_jabatan)} disabled={!editPayroll} onChange={(v) => setPayroll({ ...payroll, tunjangan_jabatan: parseInt(v) || 0 })} />
                  <InputField label="Tunjangan Makan" value={String(payroll.tunjangan_makan)} disabled={!editPayroll} onChange={(v) => setPayroll({ ...payroll, tunjangan_makan: parseInt(v) || 0 })} />
                  <InputField label="Tunjangan Transport" value={String(payroll.tunjangan_transport)} disabled={!editPayroll} onChange={(v) => setPayroll({ ...payroll, tunjangan_transport: parseInt(v) || 0 })} />
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Total Salary: </span>
                  <span className="text-[#3db5ff] font-bold">{formatRupiah(totalSalary)}</span>
                </div>
              </EditableSection>
            </div>
          )}

          {tab === "personal" && (
            <EditableSection
              title="Identity Information"
              editing={editIdentity}
              onToggle={() => (editIdentity ? saveIdentity() : setEditIdentity(true))}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Pendidikan" value={identity.pendidikan} disabled={!editIdentity} onChange={(v) => setIdentity({ ...identity, pendidikan: v })} />
                <InputField label="NIK" value={identity.nik} disabled={!editIdentity} onChange={(v) => setIdentity({ ...identity, nik: v })} />
                <InputField label="Tempat Lahir" value={identity.tempat_lahir} disabled={!editIdentity} onChange={(v) => setIdentity({ ...identity, tempat_lahir: v })} />
                <InputField label="Tanggal Lahir" value={identity.tanggal_lahir} disabled={!editIdentity} onChange={(v) => setIdentity({ ...identity, tanggal_lahir: v })} />
                <InputField label="Jenis Kelamin" value={identity.jenis_kelamin} disabled={!editIdentity} onChange={(v) => setIdentity({ ...identity, jenis_kelamin: v })} />
                <InputField label="Agama" value={identity.agama} disabled={!editIdentity} onChange={(v) => setIdentity({ ...identity, agama: v })} />
                <InputField label="Alamat" value={payroll.alamat} disabled={!editIdentity} onChange={(v) => setPayroll({ ...payroll, alamat: v })} />
                <InputField label="No HP" value={payroll.no_hp} disabled={!editIdentity} onChange={(v) => setPayroll({ ...payroll, no_hp: v })} />
              </div>
            </EditableSection>
          )}
        </div>
      </div>
    </div>
  );
}

function EditableSection({ title, editing, onToggle, children }: { title: string; editing: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <button type="button" onClick={onToggle} className="px-4 py-2 rounded-lg bg-[#3db5ff] text-white font-semibold hover:bg-[#33a0e0] transition">
          {editing ? "Save" : "Edit"}
        </button>
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, disabled }: { label: string; value: string; disabled?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input type="text" value={value} disabled={disabled} readOnly className={fieldClass} />
    </div>
  );
}

function InputField({ label, value, disabled, onChange }: { label: string; value: string; disabled?: boolean; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input type="text" value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} className={fieldClass} />
    </div>
  );
}
