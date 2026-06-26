import { useResumeStore } from "../../../stores";
import Field from "./Field";

export default function ExperienceStep() {
  const s = useResumeStore();

  return (
    <div className="space-y-4">
      {s.experience.map((exp, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-[11px] font-medium">#{i + 1}</span>
            {s.experience.length > 1 && (
              <button
                onClick={() => s.removeExperience(i)}
                className="text-gray-500 hover:text-red-400 text-[11px] transition-colors cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Company">
              <input
                value={exp.company}
                onChange={(e) => s.setExperience(i, { company: e.target.value })}
                placeholder="Company"
                className="input"
              />
            </Field>
            <Field label="Position">
              <input
                value={exp.position}
                onChange={(e) => s.setExperience(i, { position: e.target.value })}
                placeholder="Job title"
                className="input"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Start">
              <input
                value={exp.startDate}
                onChange={(e) => s.setExperience(i, { startDate: e.target.value })}
                placeholder="MM/YYYY"
                className="input"
              />
            </Field>
            <Field label="End">
              <input
                value={exp.endDate}
                onChange={(e) => s.setExperience(i, { endDate: e.target.value })}
                placeholder="MM/YYYY or Present"
                className="input"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={exp.description}
              onChange={(e) => s.setExperience(i, { description: e.target.value })}
              rows={2}
              placeholder="Key responsibilities..."
              className="input resize-none"
            />
          </Field>
        </div>
      ))}

      <button
        onClick={s.addExperience}
        className="w-full py-2.5 rounded-xl border border-dashed border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-[11px] transition-all cursor-pointer"
      >
        + Add Experience
      </button>
    </div>
  );
}
