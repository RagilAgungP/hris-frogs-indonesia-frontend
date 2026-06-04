import type { Pkwt } from "@/lib/types";
import { initialEmployees } from "./employees";

function pkwtStatus(endDate: string): Pkwt["status"] {
  const end = new Date(endDate);
  const now = new Date();
  const diff = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (diff < 0) return "expired";
  if (diff < 30) return "almost expired";
  return "active";
}

export function generateInitialPkwt(): Pkwt[] {
  const records: Pkwt[] = [];
  let id = 1;
  for (const branch of ["FSI", "ISTI"] as const) {
    const emps = initialEmployees.filter((e) => e.branch === branch).slice(0, 10);
    emps.forEach((emp, idx) => {
      const start = new Date(2024, idx, 1);
      const end = new Date(2026, idx + 3, 28);
      const endStr = end.toISOString().split("T")[0];
      records.push({
        id: id++,
        employee_id: emp.id,
        employee_name: emp.name,
        employee_department: emp.department,
        employee_position: emp.position,
        contract_number: `PKWT-${branch}-${String(idx + 1).padStart(4, "0")}`,
        start_date: start.toISOString().split("T")[0],
        end_date: endStr,
        company: emp.company,
        branch,
        status: pkwtStatus(endStr),
        file_name: `contract-${emp.employee_id}.pdf`,
      });
    });
  }
  return records;
}

export const initialPkwt = generateInitialPkwt();
