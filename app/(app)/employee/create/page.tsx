import { Suspense } from "react";
import { EmployeeCreateForm } from "@/components/employee/EmployeeCreateForm";

export default function EmployeeCreatePage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <EmployeeCreateForm />
    </Suspense>
  );
}
