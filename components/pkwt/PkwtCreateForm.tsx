"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePkwtStore } from "@/store/usePkwtStore";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { COMPANIES } from "@/lib/constants";
import type { Branch } from "@/lib/types";

export function PkwtCreateForm() {
  const router = useRouter();
  const addPkwt = usePkwtStore((s) => s.addPkwt);
  const employees = useEmployeeStore((s) => s.employees);

  const [form, setForm] = useState({
    employee_id: employees[0]?.id ?? 1,
    branch: "FSI" as Branch,
    contract_number: "",
    start_date: "",
    end_date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === form.employee_id);
    if (!emp) return;
    addPkwt({
      employee_id: form.employee_id,
      employee_name: emp.name,
      employee_department: emp.department,
      employee_position: emp.position,
      contract_number: form.contract_number,
      start_date: form.start_date,
      end_date: form.end_date,
      company: COMPANIES[form.branch],
      branch: form.branch,
      file_name: `contract-${emp.employee_id}.pdf`,
    });
    router.push(`/pkwt/${form.branch.toLowerCase()}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Add New PKWT</h1>
          <Link href="/pkwt/fsi" className="px-4 py-2 bg-[#3db5ff] text-white rounded-lg">← Back</Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold">Branch</label>
            <select className="w-full border rounded-lg p-3 mt-1" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value as Branch })}>
              <option value="FSI">FSI</option>
              <option value="ISTI">ISTI</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Employee</label>
            <select className="w-full border rounded-lg p-3 mt-1" value={form.employee_id} onChange={(e) => setForm({ ...form, employee_id: parseInt(e.target.value) })}>
              {employees.filter((e) => e.branch === form.branch).map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold">Contract Number</label>
            <input required className="w-full border rounded-lg p-3 mt-1" value={form.contract_number} onChange={(e) => setForm({ ...form, contract_number: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Start Date</label>
              <input required type="date" className="w-full border rounded-lg p-3 mt-1" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
            </div>
            <div>
              <label className="font-semibold">End Date</label>
              <input required type="date" className="w-full border rounded-lg p-3 mt-1" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-[#3db5ff] text-white rounded-lg font-semibold hover:bg-[#33a0e0]">Save PKWT</button>
        </form>
      </div>
    </div>
  );
}
