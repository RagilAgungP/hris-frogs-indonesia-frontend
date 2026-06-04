"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  initialBranches,
  initialDepartments,
  initialMenuAccessUsers,
  initialPositions,
} from "@/data/dummy/settings";
import type { MenuAccessUser, SettingItem } from "@/lib/types";

interface SettingsState {
  branches: SettingItem[];
  departments: SettingItem[];
  positions: SettingItem[];
  menuAccessUsers: MenuAccessUser[];
  addSetting: (type: "branch" | "department" | "position", name: string) => void;
  deleteSetting: (type: "branch" | "department" | "position", id: number) => void;
  deleteMenuUser: (id: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      branches: initialBranches,
      departments: initialDepartments,
      positions: initialPositions,
      menuAccessUsers: initialMenuAccessUsers,
      addSetting: (type, name) => {
        const key =
          type === "branch"
            ? "branches"
            : type === "department"
              ? "departments"
              : "positions";
        const list = get()[key];
        const id = Math.max(0, ...list.map((i) => i.id)) + 1;
        set({ [key]: [...list, { id, name }] });
      },
      deleteSetting: (type, id) => {
        const key =
          type === "branch"
            ? "branches"
            : type === "department"
              ? "departments"
              : "positions";
        set({ [key]: get()[key].filter((i) => i.id !== id) });
      },
      deleteMenuUser: (id) =>
        set({
          menuAccessUsers: get().menuAccessUsers.filter((u) => u.id !== id),
        }),
    }),
    { name: "frogs-settings" }
  )
);
