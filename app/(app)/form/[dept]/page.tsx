import { notFound } from "next/navigation";
import { DepartmentPageTemplate } from "@/components/department/DepartmentPageTemplate";
import { DEPT_SLUGS, getDeptLabel, getDeptRows } from "@/lib/dept-pages";

export default function FormDeptPage({ params }: { params: { dept: string } }) {
  if (!DEPT_SLUGS.includes(params.dept as (typeof DEPT_SLUGS)[number])) {
    notFound();
  }
  return (
    <DepartmentPageTemplate
      pageType="form"
      deptLabel={getDeptLabel(params.dept)}
      rows={getDeptRows("form")}
    />
  );
}
