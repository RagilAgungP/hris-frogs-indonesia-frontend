"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialEmployees } from "@/data/dummy/employees";
import type { Employee, Identity, IdentityDetail } from "@/lib/types";

export type EmployeeInput = Omit<Employee, "id">;

interface EmployeeState {
  employees: Employee[];
  successMessage: string | null;
  addEmployee: (data: EmployeeInput) => void;
  updateEmployee: (id: number, data: Partial<Employee>) => void;
  updateIdentity: (id: number, data: Partial<Identity>) => void;
  updateIdentityDetail: (id: number, data: Partial<IdentityDetail>) => void;
  resignEmployee: (id: number) => void;
  deleteEmployee: (id: number) => void;
  setSuccessMessage: (msg: string | null) => void;
  getByBranch: (branch: "FSI" | "ISTI") => Employee[];
  getById: (id: number) => Employee | undefined;
}

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set, get) => ({
      employees: initialEmployees,
      successMessage: null,
      addEmployee: (data) => {
        const employees = get().employees;
        const id = Math.max(0, ...employees.map((e) => e.id)) + 1;
        set({
          employees: [...employees, { ...data, id }],
          successMessage: "Employee created successfully!",
        });
      },
      updateEmployee: (id, data) =>
        set({
          employees: get().employees.map((e) =>
            e.id === id ? { ...e, ...data } : e
          ),
          successMessage: "Employee updated successfully!",
        }),
      updateIdentity: (id, data) =>
        set({
          employees: get().employees.map((e) =>
            e.id === id ? { ...e, identity: { ...e.identity, ...data } } : e
          ),
          successMessage: "Identity updated successfully!",
        }),
      updateIdentityDetail: (id, data) =>
        set({
          employees: get().employees.map((e) =>
            e.id === id
              ? { ...e, identityDetail: { ...e.identityDetail, ...data } }
              : e
          ),
          successMessage: "Payroll updated successfully!",
        }),
      resignEmployee: (id) =>
        set({
          employees: get().employees.map((e) =>
            e.id === id ? { ...e, employee_condition: "Resigned" } : e
          ),
          successMessage: "Employee resigned successfully!",
        }),
      deleteEmployee: (id) =>
        set({
          employees: get().employees.filter((e) => e.id !== id),
          successMessage: "Employee deleted successfully!",
        }),
      setSuccessMessage: (msg) => set({ successMessage: msg }),
      getByBranch: (branch) => get().employees.filter((e) => e.branch === branch),
      getById: (id) => get().employees.find((e) => e.id === id),
    }),
    { name: "frogs-employees" }
  )
);
