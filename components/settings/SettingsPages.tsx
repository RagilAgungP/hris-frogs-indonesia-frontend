"use client";

import { useState } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { ActionDropdown, DropdownItem } from "@/components/ui/ActionDropdown";

export function CompanyDivisionPage() {
  const { branches, departments, positions, addSetting, deleteSetting } = useSettingsStore();
  const [type, setType] = useState<"branch" | "department" | "position">("branch");
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    addSetting(type, name.trim());
    setName("");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">General Setting</h2>
      <div className="bg-white shadow rounded-lg p-4 w-fit mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <select className="border border-gray-300 rounded px-3 py-2 w-44" value={type} onChange={(e) => setType(e.target.value as typeof type)}>
            <option value="branch">Branch</option>
            <option value="department">Department</option>
            <option value="position">Position</option>
          </select>
          <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-56 focus:ring-2 focus:ring-[#3db5ff]" />
          <button type="button" onClick={handleAdd} className="px-4 py-2 bg-[#3db5ff] text-white rounded hover:bg-[#33a0e0] font-semibold">Add</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <SettingColumn title="Branch" items={branches} onDelete={(id) => deleteSetting("branch", id)} />
        <SettingColumn title="Department" items={departments} onDelete={(id) => deleteSetting("department", id)} />
        <SettingColumn title="Position" items={positions} onDelete={(id) => deleteSetting("position", id)} />
      </div>
    </div>
  );
}

function SettingColumn({ title, items, onDelete }: { title: string; items: { id: number; name: string }[]; onDelete: (id: number) => void }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="bg-[#3db5ff] text-white font-semibold text-lg px-4 py-2 rounded mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <span>{item.name}</span>
            <ActionDropdown label="&#8942;">
              <DropdownItem href="#">Edit</DropdownItem>
              <DropdownItem onClick={() => onDelete(item.id)} className="text-red-500">Delete</DropdownItem>
            </ActionDropdown>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MenuAccessPage() {
  const { menuAccessUsers, deleteMenuUser } = useSettingsStore();

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Menu Access Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded">
            <thead className="bg-[#3db5ff] text-white">
              <tr>
                <th className="py-2 px-4 border-b text-center">#</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Role</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuAccessUsers.map((user, i) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">{i + 1}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    {user.status === "Approved" ? (
                      <span className="px-2 py-1 rounded bg-green-500 text-white text-sm">Approved</span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-red-500 text-white text-sm">Not Approved</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <ActionDropdown label="&#8942;">
                      <DropdownItem href="#">Edit</DropdownItem>
                      <DropdownItem onClick={() => deleteMenuUser(user.id)} className="text-red-500">Delete</DropdownItem>
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
