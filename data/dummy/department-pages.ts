import type { DepartmentRow } from "@/lib/types";

export const okrDummyRows: DepartmentRow[] = [
  {
    id: 1,
    objective: "Increase operational efficiency",
    keyResult: "Reduce downtime by 20%",
    owner: "Ops Team",
    weight: 30,
    target: 100,
    actual: 75,
    progress: 75,
  },
  {
    id: 2,
    objective: "Improve customer satisfaction",
    keyResult: "CSAT score >= 4.5",
    owner: "Service Lead",
    weight: 25,
    target: 100,
    actual: 80,
    progress: 80,
  },
  {
    id: 3,
    objective: "Cost optimization",
    keyResult: "Reduce cost 10%",
    owner: "Finance",
    weight: 20,
    target: 100,
    actual: 60,
    progress: 60,
  },
  {
    id: 4,
    objective: "Strengthen internal collaboration",
    keyResult: "Cross-team project delivery on time",
    owner: "HRGA Team",
    weight: 25,
    target: 100,
    actual: 90,
    progress: 90,
  },
];

export const formDummyRows: DepartmentRow[] = [
  {
    id: 1,
    title: "Leave Request Form",
    documentNumber: "FRM-HRGA-001",
    revision: "01",
    isoScope: "ISO 9001:2015 Clause 7.1",
    file: "/files/forms/leave-request-form.pdf",
  },
  {
    id: 2,
    title: "Overtime Form",
    documentNumber: "FRM-OPS-002",
    revision: "02",
    isoScope: "ISO 9001:2015 Clause 8.1",
    file: "/files/forms/overtime-form.pdf",
  },
  {
    id: 3,
    title: "Reimbursement Form",
    documentNumber: "FRM-FIN-003",
    revision: "01",
    isoScope: "ISO 9001:2015 Clause 7.5",
    file: "/files/forms/reimbursement-form.pdf",
  },
  {
    id: 4,
    title: "Employee Data Update Form",
    documentNumber: "FRM-HRGA-004",
    revision: "03",
    isoScope: "ISO 9001:2015 Clause 6.2",
    file: "/files/forms/employee-data-update-form.pdf",
  },
];

export const sopDummyRows: DepartmentRow[] = [
  {
    id: 1,
    title: "SOP Operational Standard",
    documentNumber: "SOP-OPS-001",
    revision: "03",
    isoScope: "ISO 9001:2015 Clause 8.5",
    file: "/files/sop/operational-standard.pdf",
  },
  {
    id: 2,
    title: "SOP Safety Protocol",
    documentNumber: "SOP-HSE-002",
    revision: "01",
    isoScope: "ISO 45001:2018 Clause 8.1",
    file: "/files/sop/safety-protocol.pdf",
  },
  {
    id: 3,
    title: "SOP Document Control",
    documentNumber: "SOP-QA-003",
    revision: "02",
    isoScope: "ISO 9001:2015 Clause 7.5",
    file: "/files/sop/document-control.pdf",
  },
  {
    id: 4,
    title: "SOP Internal Audit",
    documentNumber: "SOP-QA-004",
    revision: "01",
    isoScope: "ISO 9001:2015 Clause 9.2",
    file: "/files/sop/internal-audit.pdf",
  },
];

export const memoDummyRows: DepartmentRow[] = [
  {
    id: 1,
    title: "Internal Memo Q4",
    documentNumber: "MEMO-BOD-001",
    revision: "01",
    isoScope: "ISO 9001:2015 Clause 9.3",
    file: "/files/memo/internal-memo-q4.pdf",
  },
  {
    id: 2,
    title: "Policy Update Memo",
    documentNumber: "MEMO-HR-002",
    revision: "02",
    isoScope: "ISO 9001:2015 Clause 7.2",
    file: "/files/memo/policy-update-memo.pdf",
  },
  {
    id: 3,
    title: "Budget Review Memo",
    documentNumber: "MEMO-FIN-003",
    revision: "01",
    isoScope: "ISO 9001:2015 Clause 8.4",
    file: "/files/memo/budget-review-memo.pdf",
  },
  {
    id: 4,
    title: "Project Announcement Memo",
    documentNumber: "MEMO-BD-004",
    revision: "03",
    isoScope: "ISO 9001:2015 Clause 5.1",
    file: "/files/memo/project-announcement-memo.pdf",
  },
];