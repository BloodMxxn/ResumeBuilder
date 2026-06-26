import type { ResumeData } from "../templates";
import type { ComponentType } from "react";

interface TemplatePreviewProps {
  component: ComponentType<{ data: ResumeData }>;
  data: ResumeData;
  className?: string;
}

export default function TemplatePreview({
  component: Template,
  data,
  className,
}: TemplatePreviewProps) {
  return (
    <div className={`w-full h-full overflow-hidden ${className ?? ""}`}>
      <div
        className="origin-top-left"
        style={{ width: "222%", height: "222%", transform: "scale(0.45)" }}
      >
        <Template data={data} />
      </div>
    </div>
  );
}
