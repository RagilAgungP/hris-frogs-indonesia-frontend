"use client";

import { useParams } from "next/navigation";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { EmployeeDetailPage } from "@/components/employee/EmployeeDetailPage";

export default function EmployeeShowPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const employee = useEmployeeStore((s) => s.employees.find((e) => e.id === id));

  if (!employee) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center text-gray-500">
          Employee not found
        </div>
      </div>
    );
  }

  return <EmployeeDetailPage employee={employee} />;
}
