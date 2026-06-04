import { DEPARTMENT_SLUGS } from "@/lib/constants";
import {
  formDummyRows,
  memoDummyRows,
  okrDummyRows,
  sopDummyRows,
} from "@/data/dummy/department-pages";

export const DEPT_SLUGS = DEPARTMENT_SLUGS.map((d) => d.slug);

export function getDeptLabel(slug: string): string {
  return DEPARTMENT_SLUGS.find((d) => d.slug === slug)?.label ?? slug;
}

export function getDeptRows(pageType: "okr" | "form" | "sop" | "memo") {
  switch (pageType) {
    case "okr":
      return okrDummyRows;
    case "form":
      return formDummyRows;
    case "sop":
      return sopDummyRows;
    case "memo":
      return memoDummyRows;
  }
}
