"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { usePkwtStore } from "@/store/usePkwtStore";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import type { Pkwt } from "@/lib/types";

export function PkwtEditModal({ pkwt, onClose }: { pkwt: Pkwt; onClose: () => void }) {
  const updatePkwt = usePkwtStore((s) => s.updatePkwt);
  const employees = useEmployeeStore((s) => s.employees);

  const [form, setForm] = useState({
    employee_id: pkwt.employee_id,
    contract_number: pkwt.contract_number,
    start_date: pkwt.start_date,
    end_date: pkwt.end_date,
    company: pkwt.company,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === form.employee_id);
    updatePkwt(pkwt.id, {
      ...form,
      employee_name: emp?.name ?? pkwt.employee_name,
      employee_department: emp?.department ?? pkwt.employee_department,
      employee_position: emp?.position ?? pkwt.employee_position,
    });
    onClose();
  };

  return (
    <Modal open title="Edit PKWT" subtitle="Update employee contract information" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold text-sm mb-1">Employee</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={form.employee_id}
            onChange={(e) => setForm({ ...form, employee_id: parseInt(e.target.value) })}
          >
            {employees.filter((e) => e.branch === pkwt.branch).map((e) => (
              <option key={e.id} value={e.id}>{e.name} ({e.employee_id})</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-sm mb-1">Contract Number</label>
            <input className="w-full border border-gray-300 rounded-lg px-4 py-2" value={form.contract_number} onChange={(e) => setForm({ ...form, contract_number: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">Company</label>
            <input className="w-full border border-gray-300 rounded-lg px-4 py-2" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">Start Date</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">End Date</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-[#3db5ff] text-white rounded-lg hover:bg-[#33a0e0]">Save Changes</button>
        </div>
      </form>
    </Modal>
  );
}
