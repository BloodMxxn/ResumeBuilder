import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useResumeStore } from "../../stores";
import { templates } from "../../templates";
import type { TemplateConfig } from "../../templates";
import TemplatePreview from "../../components/TemplatePreview";
import Button from "../../components/ui/Button";

export default function Preview() {
  const nav = useNavigate();
  const resume = useResumeStore();
  const [selected, setSelected] = useState<TemplateConfig | null>(null);

  const data = {
    name: resume.name || "Your Name",
    email: resume.email || "email@example.com",
    phone: resume.phone || "+1 234 567 890",
    address: resume.address,
    website: resume.website,
    summary: resume.summary,
    experience: resume.experience.length
      ? resume.experience
      : [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
    education: resume.education.length
      ? resume.education
      : [{ school: "", degree: "", field: "", startDate: "", endDate: "" }],
    skills: resume.skills.length ? resume.skills : [{ name: "Skill 1", level: "Intermediate" as const }],
  };

  return (
    <div className="h-dvh flex flex-col bg-[#050510] overflow-hidden">
      <header className="shrink-0 flex items-center gap-4 px-6 py-3 border-b border-white/5">
        <button
          onClick={() => nav("/build/minimal")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to editor
        </button>
        <span className="text-gray-600">|</span>
        <span className="text-white font-medium text-sm">Choose Template</span>
      </header>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((tmpl) => (
                <button
                  key={tmpl.slug}
                  onClick={() => setSelected(tmpl)}
                  className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer text-left ${
                    selected?.slug === tmpl.slug
                      ? "border-blue-500/50 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                      : "border-white/5 bg-white/[0.02] hover:border-blue-500/30 hover:bg-white/5"
                  }`}
                >
                  <div className="h-64 overflow-hidden bg-white/5">
                    <div
                      className="w-full h-full scale-[0.45] origin-top-left"
                      style={{ width: "222%", height: "222%" }}
                    >
                      <TemplatePreview component={tmpl.component} data={data} />
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <span className="text-gray-400 text-xs font-medium tracking-wider uppercase">
                      {tmpl.name}
                    </span>
                    {selected?.slug === tmpl.slug && (
                      <span className="text-blue-400 text-[10px] font-medium tracking-wider uppercase">
                        Selected
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {selected && (
          <div className="hidden lg:block w-95 shrink-0 border-l border-white/5 overflow-y-auto p-6">
            <div className="sticky top-0">
              <h3 className="text-white font-semibold text-sm mb-1">Preview</h3>
              <p className="text-gray-500 text-xs mb-5">{selected.name} template</p>

              <div className="rounded-xl overflow-hidden border border-white/5 mb-5">
                <div className="h-120 overflow-hidden">
                  <div
                    className="w-full h-full scale-[0.45] origin-top-left"
                    style={{ width: "222%", height: "222%" }}
                  >
                    <TemplatePreview component={selected.component} data={data} />
                  </div>
                </div>
              </div>

              <Button fullWidth size="lg">
                Download Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
