import { useState, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Eye, EyeOff, X } from "lucide-react";
import { getTemplate } from "../../templates";
import { useResumeStore } from "../../stores";
import TemplatePreview from "../../components/TemplatePreview";
import GridBackground from "../../components/GridBackground";
import Button from "../../components/ui/Button";
import PersonalInfo from "./_components/PersonalInfo";
import ExperienceStep from "./_components/ExperienceStep";
import EducationStep from "./_components/EducationStep";
import SkillsStep from "./_components/SkillsStep";
import SummaryStep from "./_components/SummaryStep";
import StepProgress from "./_components/StepProgress";
import StepTitle from "./_components/StepTitle";
import { useDownload } from "../../hooks/useDownload";

const steps = [
  { label: "STEP 01", title: "Personal", highlight: "Info", component: PersonalInfo },
  { label: "STEP 02", title: "Work", highlight: "Experience", component: ExperienceStep },
  { label: "STEP 03", title: "Your", highlight: "Education", component: EducationStep },
  { label: "STEP 04", title: "Key", highlight: "Skills", component: SkillsStep },
  { label: "STEP 05", title: "Professional", highlight: "Summary", component: SummaryStep },
];

export default function Build() {
  const { template } = useParams();
  const tmpl = getTemplate(template ?? "");
  const resume = useResumeStore();
  const [current, setCurrent] = useState(0);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const previewRef = useRef<HTMLDivElement>(null);

  const data = {
    name: resume.name || "Your Name",
    email: resume.email || "email@example.com",
    phone: resume.phone || "+1 234 567 890",
    address: resume.address,
    website: resume.website,
    summary: resume.summary,
    experience:
      Array.isArray(resume.experience) && resume.experience.length
        ? resume.experience
        : [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
    education:
      Array.isArray(resume.education) && resume.education.length
        ? resume.education
        : [{ school: "", degree: "", field: "", startDate: "", endDate: "" }],
    skills:
      Array.isArray(resume.skills) && resume.skills.length
        ? resume.skills
        : [{ name: "", level: "Intermediate" as const }],
  };

  const { download } = useDownload(tmpl, data);

  const Step = steps[current].component;
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  const handlePrev = () => (isFirst ? window.history.back() : setCurrent((p) => p - 1));
  const handleNext = () => (isLast ? download() : setCurrent((p) => p + 1));
  const toggleMobilePreview = () => setIsMobilePreview((p) => !p);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!previewRef.current) return;
      const rect = previewRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      if (zoomed) setOrigin((prevOrigin) => prevOrigin);
      else setOrigin({ x, y });
      setZoomed((z) => !z);
    },
    [zoomed],
  );

  if (!tmpl) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">Template not found.</p>
          <Link to="/templates" className="text-blue-400 text-sm hover:underline">
            Browse templates
          </Link>
        </div>
      </div>
    );
  }

  const TemplateComponent = tmpl.component;

  return (
    <div className="relative h-dvh w-full p-6 flex lg:items-center justify-center overflow-hidden">
      <GridBackground />

      <div className="flex flex-col items-center lg:flex-row gap-8 w-full max-w-5xl">
        {/* Form */}
        <div className="flex-1 w-full h-full max-w-md mx-auto lg:mx-0 flex flex-col gap-8 justify-between">
          <div className="flex flex-col min-h-0">
            <div className="flex flex-col gap-6">
              <StepProgress steps={steps} current={current} onChange={setCurrent} />
              <StepTitle
                label={steps[current].label}
                title={steps[current].title}
                highlight={steps[current].highlight}
              />
            </div>

            <div className="flex-1 min-h-0 lg:flex-none lg:h-85 overflow-y-auto lg:pr-2">
              <Step />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button onClick={handlePrev} variant="ghost">
              <ArrowLeft size={16} />
              {isFirst ? "Home" : "Back"}
            </Button>
            <div className="flex items-center gap-2">
              <Button onClick={toggleMobilePreview} className="block lg:hidden" size="icon-md">
                {isMobilePreview ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
              {isLast ? (
                <>
                  <Button onClick={download} variant="outline">
                    <Download size="16" />
                    Download
                  </Button>
                  <Button to="/">Go Home</Button>
                </>
              ) : (
                <Button onClick={handleNext}>Continue</Button>
              )}
            </div>
          </div>
        </div>

        {/* Preview - Desktop */}
        <div className="hidden lg:flex flex-1 items-center justify-center overflow-hidden">
          <div className="w-full max-w-95">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-gray-500 font-medium tracking-[0.2em] uppercase">
                {tmpl.name}
              </span>
            </div>

            <div
              ref={previewRef}
              className={`rounded-2xl border-2 border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden bg-white ${
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={handleClick}
            >
              <div
                className="aspect-210/297 select-none"
                style={{
                  transform: zoomed ? "scale(2)" : "scale(1)",
                  transformOrigin: `${origin.x}% ${origin.y}%`,
                  transition: "transform 0.3s ease",
                }}
              >
                <TemplatePreview component={TemplateComponent} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Preview Overlay */}
      {isMobilePreview && (
        <div
          onClick={() => setIsMobilePreview(false)}
          className="lg:hidden fixed inset-0 z-50 bg-[#050510] flex flex-col items-center justify-center p-6"
        >
          <button
            onClick={() => setIsMobilePreview(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={22} />
          </button>

          <div className="text-[10px] text-gray-500 mb-4 font-medium tracking-[0.2em] uppercase">
            {tmpl.name}
          </div>

          <div className="rounded-2xl border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden bg-white w-full max-w-[320px]">
            <div className="aspect-210/297">
              <TemplatePreview component={TemplateComponent} data={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
