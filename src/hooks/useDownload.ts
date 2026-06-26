import { useCallback, createElement } from "react";
import { downloadResume } from "../libs/download";
import type { ResumeData, TemplateConfig } from "../templates";

export function useDownload(template: TemplateConfig | undefined, data: ResumeData) {
  const download = useCallback(async () => {
    if (!template) return;
    const PDFComponent = template.pdf;
    await downloadResume(createElement(PDFComponent, { data }), `${template.slug}-resume.pdf`);
  }, [template, data]);

  return { download };
}
