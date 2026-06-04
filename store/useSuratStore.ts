"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialSurat } from "@/data/dummy/surat";
import type { Surat } from "@/lib/types";

type SuratInput = Omit<Surat, "id">;

interface SuratState {
  surat: Surat[];
  addSurat: (data: SuratInput) => void;
  deleteSurat: (id: string) => void;
}

export const useSuratStore = create<SuratState>()(
  persist(
    (set, get) => ({
      surat: initialSurat,
      addSurat: (data) => {
        const items = get().surat;
        const num = Math.max(0, ...items.map((s) => parseInt(s.id))) + 1;
        set({ surat: [...items, { ...data, id: String(num).padStart(3, "0") }] });
      },
      deleteSurat: (id) =>
        set({ surat: get().surat.filter((s) => s.id !== id) }),
    }),
    { name: "frogs-surat" }
  )
);
