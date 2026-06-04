import type { MenuAccessUser, SettingItem } from "@/lib/types";

export const initialMenuAccessUsers: MenuAccessUser[] = [
  { id: 1, name: "Admin", email: "admin@gmail.com", role: "Administrator", status: "Approved" },
  { id: 2, name: "Thofa Hesa Alfauzi", email: "thofahesa@gmail.com", role: "Technologi", status: "Approved" },
  { id: 3, name: "Adnan Silvan Erusani", email: "adnansilvan@gmail.com", role: "FI", status: "Approved" },
  { id: 4, name: "Ragil Agung Pamungkas", email: "ragilagung@gmail.com", role: "FSI", status: "Not Approved" },
];

export const initialBranches: SettingItem[] = [
  { id: 1, name: "PT Frogs Solusi Indonesia" },
];

export const initialDepartments: SettingItem[] = [
  { id: 1, name: "Oprational ISTI" },
  { id: 2, name: "Oprational FSI" },
  { id: 3, name: "Sales & Marketing" },
  { id: 4, name: "Finance, Accounting, and Tax" },
  { id: 5, name: "Technology" },
  { id: 6, name: "Management" },
  { id: 7, name: "Chief" },
  { id: 8, name: "Business Development" },
  { id: 9, name: "HRGA" },
];

export const initialPositions: SettingItem[] = [
  { id: 1, name: "Chief Operating Officer" },
  { id: 2, name: "Chief Sales & Marketing" },
  { id: 3, name: "Head of Operation" },
  { id: 4, name: "HRGA Staff" },
  { id: 5, name: "IT Engineer Staff" },
];
