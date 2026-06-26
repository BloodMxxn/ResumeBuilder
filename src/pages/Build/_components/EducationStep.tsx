import { useResumeStore } from "../../../stores";
import Field from "./Field";

export default function EducationStep() {
  const s = useResumeStore();

  return (
    <div className="space-y-4">
      {s.education.map((edu, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-[11px] font-medium">#{i + 1}</span>
            {s.education.length > 1 && (
              <button
                onClick={() => s.removeEducation(i)}
                className="text-gray-500 hover:text-red-400 text-[11px] transition-colors cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="School">
              <input
                value={edu.school}
                onChange={(e) => s.setEducation(i, { school: e.target.value })}
                placeholder="University"
                className="input"
              />
            </Field>
            <Field label="Degree">
              <input
                value={edu.degree}
                onChange={(e) => s.setEducation(i, { degree: e.target.value })}
                placeholder="Bachelor's"
                className="input"
              />
            </Field>
          </div>

          <Field label="Field of Study">
            <input
              value={edu.field}
              onChange={(e) => s.setEducation(i, { field: e.target.value })}
              placeholder="Computer Science"
              className="input"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Start">
              <input
                value={edu.startDate}
                onChange={(e) => s.setEducation(i, { startDate: e.target.value })}
                placeholder="2020"
                className="input"
              />
            </Field>
            <Field label="End">
              <input
                value={edu.endDate}
                onChange={(e) => s.setEducation(i, { endDate: e.target.value })}
                placeholder="2024"
                className="input"
              />
            </Field>
          </div>
        </div>
      ))}

      <button
        onClick={s.addEducation}
        className="w-full py-2.5 rounded-xl border border-dashed border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-[11px] transition-all cursor-pointer"
      >
        + Add Education
      </button>
    </div>
  );
}
