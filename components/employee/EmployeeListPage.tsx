"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { SuccessAlert } from "@/components/ui/SuccessAlert";
import { ActionDropdown, DropdownItem } from "@/components/ui/ActionDropdown";
import { formatDate } from "@/lib/utils";
import type { Branch, Employee } from "@/lib/types";

export function EmployeeListPage({ branch }: { branch: Branch }) {
  const router = useRouter();
  const employees = useEmployeeStore((s) => s.employees);
  const successMessage = useEmployeeStore((s) => s.successMessage);
  const setSuccessMessage = useEmployeeStore((s) => s.setSuccessMessage);
  const resignEmployee = useEmployeeStore((s) => s.resignEmployee);
  const deleteEmployee = useEmployeeStore((s) => s.deleteEmployee);

  const [currentTab, setCurrentTab] = useState<"active" | "resigned">("active");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const branchEmployees = useMemo(
    () => employees.filter((e) => e.branch === branch),
    [employees, branch]
  );

  const departments = useMemo(
    () => Array.from(new Set(branchEmployees.map((e) => e.department))).filter(Boolean),
    [branchEmployees]
  );
  const positions = useMemo(
    () => Array.from(new Set(branchEmployees.map((e) => e.position))).filter(Boolean),
    [branchEmployees]
  );

  const filtered = useMemo(() => {
    return branchEmployees.filter((e) => {
      const status = e.employee_condition.toLowerCase();
      const matchTab = status === currentTab;
      const matchSearch =
        search === "" ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.employee_id.toLowerCase().includes(search.toLowerCase());
      const matchDept =
        department === "" || e.department.toLowerCase() === department.toLowerCase();
      const matchPos =
        position === "" || e.position.toLowerCase() === position.toLowerCase();
      return matchTab && matchSearch && matchDept && matchPos;
    });
  }, [branchEmployees, currentTab, search, department, position]);

  const tabClass = (tab: "active" | "resigned") =>
    currentTab === tab
      ? "px-4 py-2 font-semibold transition border-b-4 border-[#3db5ff] text-[#3db5ff] -mb-1"
      : "px-4 py-2 font-semibold transition border-b-4 border-transparent text-gray-700 -mb-1";

  const handleResign = (emp: Employee) => {
    if (confirm("Employee will be resigned?")) {
      resignEmployee(emp.id);
    }
  };

  const handleDelete = (emp: Employee) => {
    if (confirm("Delete this employee?")) {
      deleteEmployee(emp.id);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-2 border-b border-gray-200">
            <button type="button" className={tabClass("active")} onClick={() => setCurrentTab("active")}>
              Active
            </button>
            <button type="button" className={tabClass("resigned")} onClick={() => setCurrentTab("resigned")}>
              Resigned
            </button>
          </div>
          <Link
            href={`/employee/create?branch=${branch}`}
            className="px-4 py-2 bg-[#3db5ff] text-white rounded hover:bg-[#33a0e0] font-semibold text-center"
          >
            Add New Employee
          </Link>
        </div>

        <SuccessAlert message={successMessage} onDismiss={() => setSuccessMessage(null)} />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-4 md:space-y-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee..."
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
          />
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-48 md:w-52"
            >
              <option value="">All Department</option>
              {departments.map((d) => (
                <option key={d} value={d.toLowerCase()}>
                  {d}
                </option>
              ))}
            </select>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-48 md:w-52"
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

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded">
            <thead className="bg-[#3db5ff] text-white">
              <tr>
                <th className="py-3 px-4 border-b text-center">No</th>
                <th className="py-3 px-4 border-b text-left">Employee Name / ID</th>
                <th className="py-3 px-4 border-b text-left">Employment</th>
                <th className="py-3 px-4 border-b text-left">Branch</th>
                <th className="py-3 px-4 border-b text-left">Department</th>
                <th className="py-3 px-4 border-b text-left">Position</th>
                <th className="py-3 px-4 border-b text-left">Join Date</th>
                <th className="py-3 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-500">
                    No employee data found
                  </td>
                </tr>
              ) : (
                filtered.map((employee, idx) => (
                  <tr key={employee.id} className="employee-row">
                    <td className="py-3 px-4 border-b text-center">{idx + 1}</td>
                    <td className="py-3 px-4 border-b">
                      <div className="font-semibold">{employee.name}</div>
                      <div className="text-sm text-gray-500">ID: {employee.employee_id}</div>
                    </td>
                    <td className="py-3 px-4 border-b">
                      {employee.status === "Permanent" ? (
                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">Permanent</span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">Contract</span>
                      )}
                    </td>
                    <td className="py-3 px-4 border-b">{employee.branch}</td>
                    <td className="py-3 px-4 border-b">{employee.department}</td>
                    <td className="py-3 px-4 border-b">{employee.position}</td>
                    <td className="py-3 px-4 border-b">{formatDate(employee.date_of_joining)}</td>
                    <td className="py-3 px-4 border-b text-center">
                      <ActionDropdown>
                        <DropdownItem onClick={() => router.push(`/employees/${employee.id}`)}>
                          See Detail
                        </DropdownItem>
                        {employee.employee_condition === "Active" && (
                          <DropdownItem
                            onClick={() => handleResign(employee)}
                            className="hover:bg-red-100 text-red-600"
                          >
                            Resign
                          </DropdownItem>
                        )}
                        <DropdownItem
                          onClick={() => handleDelete(employee)}
                          className="text-red-500"
                        >
                          Delete
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
