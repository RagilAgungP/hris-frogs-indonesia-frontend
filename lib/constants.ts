export const BRAND = "#3db5ff";

export const DEPARTMENTS = [
  "Operational ISTI",
  "Operational FSI",
  "Sales & Marketing",
  "Finance, Accounting, and Tax",
  "Technology",
  "Management",
  "Chief",
  "Business Development",
  "HRGA",
];

export const POSITIONS = [
  "Chief Operating Officer",
  "Chief Sales & Marketing",
  "Head of Operation",
  "HRGA Staff",
  "IT Engineer Staff",
  "Sales Staff",
  "Quality Assurance Engineer Staff",
  "Warehouse & Admin Staff",
  "Office Boy",
];

export const BRANCHES = [
  "PT Frogs Solusi Indonesia",
  "PT Inovasi Solusi Transportasi Indonesia",
];

export const DEPARTMENT_SLUGS = [
  { slug: "operasional", label: "Operasional" },
  { slug: "fi", label: "FI" },
  { slug: "fsi", label: "FSI" },
  { slug: "technology", label: "Technology" },
  { slug: "business-development", label: "Business Development" },
  { slug: "finance", label: "Finance" },
  { slug: "hrga", label: "HRGA" },
] as const;

export type DepartmentSlug = (typeof DEPARTMENT_SLUGS)[number]["slug"];

export const COMPANIES: Record<string, string> = {
  FSI: "PT Frogs Solusi Indonesia",
  ISTI: "PT Inovasi Solusi Transportasi Indonesia",
};
