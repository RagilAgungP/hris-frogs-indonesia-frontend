import type { Ticket } from "@/lib/types";

export const initialTickets: Ticket[] = [
  {
    id: "TKT-001",
    title: "Laptop tidak bisa connect WiFi",
    category: "IT Support",
    priority: "High",
    status: "Open",
    created_at: "2025-12-01",
  },
  {
    id: "TKT-002",
    title: "Request access folder HR",
    category: "Access",
    priority: "Medium",
    status: "In Progress",
    created_at: "2025-12-03",
  },
  {
    id: "TKT-003",
    title: "Printer lantai 2 error",
    category: "Facility",
    priority: "Low",
    status: "Closed",
    created_at: "2025-11-28",
  },
];
