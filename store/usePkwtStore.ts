"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialPkwt } from "@/data/dummy/pkwt";
import type { Branch, Pkwt, PkwtStatus } from "@/lib/types";

export type PkwtInput = Omit<Pkwt, "id" | "status">;

function computeStatus(endDate: string): PkwtStatus {
  const diff = (new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  if (diff < 0) return "expired";
  if (diff < 30) return "almost expired";
  return "active";
}

interface PkwtState {
  pkwts: Pkwt[];
  successMessage: string | null;
  addPkwt: (data: PkwtInput) => void;
  updatePkwt: (id: number, data: Partial<PkwtInput>) => void;
  deletePkwt: (id: number) => void;
  setSuccessMessage: (msg: string | null) => void;
  getByBranch: (branch: Branch) => Pkwt[];
  getById: (id: number) => Pkwt | undefined;
}

export const usePkwtStore = create<PkwtState>()(
  persist(
    (set, get) => ({
      pkwts: initialPkwt,
      successMessage: null,
      addPkwt: (data) => {
        const pkwts = get().pkwts;
        const id = Math.max(0, ...pkwts.map((p) => p.id)) + 1;
        set({
          pkwts: [
            ...pkwts,
            { ...data, id, status: computeStatus(data.end_date) },
          ],
          successMessage: "PKWT created successfully!",
        });
      },
      updatePkwt: (id, data) =>
        set({
          pkwts: get().pkwts.map((p) => {
            if (p.id !== id) return p;
            const updated = { ...p, ...data };
            if (data.end_date) updated.status = computeStatus(data.end_date);
            return updated;
          }),
          successMessage: "PKWT updated successfully!",
        }),
      deletePkwt: (id) =>
        set({
          pkwts: get().pkwts.filter((p) => p.id !== id),
          successMessage: "PKWT deleted successfully!",
        }),
      setSuccessMessage: (msg) => set({ successMessage: msg }),
      getByBranch: (branch) => get().pkwts.filter((p) => p.branch === branch),
      getById: (id) => get().pkwts.find((p) => p.id === id),
    }),
    { name: "frogs-pkwt" }
  )
);
