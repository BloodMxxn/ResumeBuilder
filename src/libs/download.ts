import { pdf } from "@react-pdf/renderer";
import type { ReactElement } from "react";

export async function downloadResume(element: ReactElement, filename = "resume.pdf") {
  // @ts-expect-error - pdf() accepts Document elements but our type inference is stricter
  const blob = await pdf(element).toBlob();
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement("a");
  a.href = url;
  a.download = filename;
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
