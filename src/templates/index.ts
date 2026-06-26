import type { TemplateConfig } from "./types";
import Minimal from "./Minimal";
import Classic from "./Classic";
import Modern from "./Modern";
import MinimalPDF from "./pdf/MinimalPDF";
import ClassicPDF from "./pdf/ClassicPDF";
import ModernPDF from "./pdf/ModernPDF";

export const templates: TemplateConfig[] = [
  { slug: "minimal", name: "Minimal", component: Minimal, pdf: MinimalPDF },
  { slug: "classic", name: "Classic", component: Classic, pdf: ClassicPDF },
  { slug: "modern", name: "Modern", component: Modern, pdf: ModernPDF },
];

export function getTemplate(slug: string) {
  return templates.find((t) => t.slug === slug);
}

export type { ResumeData, TemplateConfig } from "./types";
export { defaultData } from "./types";
