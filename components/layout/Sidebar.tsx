"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  TicketIcon,
  ClipboardDocumentIcon,
  BookOpenIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  ChartPieIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  BriefcaseIcon,
  BanknotesIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

const menuRoutes: Record<string, string> = {
  Dashboard: "dashboard",
  OKR: "okr",
  Employee: "employee",
  PKWT: "pkwt",
  Surat: "surat",
  Ticket: "ticket",
  Form: "form",
  SOP: "sop",
  Memo: "memo",
  "General Settings": "settings",
};

const subEmployee = ["FSI", "ISTI"];
const subDepartment = [
  "Operasional",
  "FI",
  "FSI",
  "Technology",
  "Business Development",
  "Finance",
  "HRGA",
];
const subSettings = ["Company Division", "Menu Access"];

const deptSlugMap: Record<string, string> = {
  Operasional: "operasional",
  FI: "fi",
  FSI: "fsi",
  Technology: "technology",
  "Business Development": "business-development",
  Finance: "finance",
  HRGA: "hrga",
};

const submenuIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Operasional: WrenchScrewdriverIcon,
  FI: ChartPieIcon,
  FSI: ShieldCheckIcon,
  Technology: CpuChipIcon,
  "Business Development": BriefcaseIcon,
  Finance: BanknotesIcon,
  HRGA: UsersIcon,
};

const menu = {
  DASHBOARD: [{ icon: HomeIcon, label: "Dashboard", dropdown: false as const }],
  PERFORMANCE: [{ icon: ChartBarIcon, label: "OKR", dropdown: subDepartment }],
  EMPLOYEE: [
    { icon: UsersIcon, label: "Employee", dropdown: subEmployee },
    { icon: DocumentTextIcon, label: "PKWT", dropdown: subEmployee },
  ],
  COMPLIANCE: [
    { icon: EnvelopeIcon, label: "Surat", dropdown: false as const },
    { icon: TicketIcon, label: "Ticket", dropdown: false as const },
    { icon: ClipboardDocumentIcon, label: "Form", dropdown: subDepartment },
    { icon: BookOpenIcon, label: "SOP", dropdown: subDepartment },
    { icon: DocumentDuplicateIcon, label: "Memo", dropdown: subDepartment },
  ],
  SETTINGS: [{ icon: Cog6ToothIcon, label: "General Settings", dropdown: subSettings }],
};

function getSubUrl(label: string, sub: string): string {
  const route = menuRoutes[label];
  if (label === "PKWT") return `/pkwt/${sub.toLowerCase()}`;
  if (label === "Employee") return `/employee/${sub.toLowerCase()}`;
  if (label === "General Settings") {
    return sub === "Company Division"
      ? "/settings/company-division"
      : "/settings/menu-access";
  }
  const slug = deptSlugMap[sub] ?? sub.toLowerCase().replace(/ /g, "-");
  return `/${route}/${slug}`;
}

function MenuItem({
  icon: Icon,
  label,
  dropdown,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  dropdown: false | string[];
}) {
  const pathname = usePathname();
  const route = menuRoutes[label] ?? "#";
  const isActive = pathname === `/${route}` || pathname.startsWith(`/${route}/`);
  const [open, setOpen] = useState(isActive && !!dropdown);

  const baseBtn = cn(
    "flex items-center w-full px-3 py-2 rounded-full mb-1 transition",
    isActive
      ? "bg-[#3db5ff] text-white font-semibold shadow"
      : "text-gray-700 hover:bg-[#3db5ff] hover:text-white"
  );

  if (!dropdown) {
    return (
      <Link href={`/${route}`} className={baseBtn}>
        <Icon className="w-5 h-5 mr-2" />
        <span className="flex-1 text-left">{label}</span>
      </Link>
    );
  }

  return (
    <div>
      <button type="button" onClick={() => setOpen(!open)} className={baseBtn}>
        <Icon className="w-5 h-5 mr-2" />
        <span className="flex-1 text-left">{label}</span>
        <ChevronDownIcon className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="ml-6 mb-2">
          {dropdown.map((sub) => {
            const url = getSubUrl(label, sub);
            const isSubActive = pathname === url;
            const SubIcon =
              label === "Employee" || label === "PKWT"
                ? BuildingOfficeIcon
                : label === "General Settings"
                  ? sub === "Company Division"
                    ? BuildingOfficeIcon
                    : LockClosedIcon
                  : submenuIcons[sub] ?? BuildingOfficeIcon;

            return (
              <Link
                key={sub}
                href={url}
                className={cn(
                  "flex items-center w-full px-3 py-2 rounded-full mb-1 transition",
                  isSubActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                )}
              >
                <SubIcon className="w-4 h-4 mr-2" />
                <span>{sub}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-white shadow-lg rounded-r-3xl border-r border-blue-200 flex flex-col justify-between overflow-hidden z-40">
      <div className="px-4 pt-6">
        <div className="flex items-center mb-4">
          <img
            src="https://randomuser.me/api/portraits/men/15.jpg"
            alt="Profile"
            className="w-12 h-12 rounded-full border shadow-sm"
          />
          <div className="ml-3">
            <h2 className="font-semibold text-gray-800 text-sm">{user?.name ?? "John Doe"}</h2>
            <p className="text-xs font-bold text-blue-600 flex items-center">
              <span className="flex-grow border-b border-gray-300" />
              <span className="px-1">{user?.role?.toUpperCase() ?? "ADMINISTRATOR"}</span>
              <span className="flex-grow border-b border-gray-300" />
            </p>
          </div>
        </div>
      </div>

      <div className="text-sm px-2 flex-1 overflow-y-auto">
        {Object.entries(menu).map(([section, items]) => (
          <div key={section}>
            <div className="flex items-center my-2">
              <span className="flex-grow border-b border-gray-300" />
              <span className="text-gray-500 text-xs font-bold px-2">{section}</span>
              <span className="flex-grow border-b border-gray-300" />
            </div>
            {items.map((item) => (
              <MenuItem key={item.label} {...item} />
            ))}
          </div>
        ))}

        <div className="flex items-center mt-4 mb-2">
          <span className="flex-grow border-b border-gray-300" />
          <span className="text-gray-500 text-xs font-bold px-2">LOGOUT</span>
          <span className="flex-grow border-b border-gray-300" />
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center px-3 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold w-56 mb-4"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
}
