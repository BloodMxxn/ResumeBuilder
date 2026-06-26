import type { ResumeData } from "./types";

export default function Classic({ data }: { data: ResumeData }) {
  return (
    <div className="flex h-full bg-white font-sans">
      <aside className="w-[35%] bg-slate-800 p-7 text-white">
        <h1 className="text-xl font-bold">{data.name}</h1>
        <p className="text-[8px] text-slate-400 mt-1 tracking-[0.2em] uppercase">Resume</p>

        <div className="mt-6">
          <h3 className="text-[9px] font-bold text-sky-400 tracking-wider uppercase mb-2">Contact</h3>
          {data.email && <p className="text-[9px] text-slate-300 leading-relaxed">{data.email}</p>}
          {data.phone && <p className="text-[9px] text-slate-300 leading-relaxed">{data.phone}</p>}
          {data.address && <p className="text-[9px] text-slate-300 leading-relaxed">{data.address}</p>}
          {data.website && <p className="text-[9px] text-sky-300 leading-relaxed">{data.website}</p>}
        </div>

        {data.skills.some((s) => s) && (
          <div className="mt-5">
            <h3 className="text-[9px] font-bold text-sky-400 tracking-wider uppercase mb-2">Skills</h3>
            {data.skills.filter((s) => s.name).map((skill) => (
              <p key={skill.name} className="text-[9px] text-slate-300 leading-relaxed">
                {skill.name}
                <span className="text-[8px] text-slate-500 ml-1">({skill.level})</span>
              </p>
            ))}
          </div>
        )}
      </aside>

      <main className="flex-1 p-7">
        {data.summary && (
          <Section title="Summary">
            <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>
          </Section>
        )}

        {data.experience.some((e) => e.company || e.position) && (
          <Section title="Experience">
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-semibold text-gray-800">{exp.position}</p>
                  <p className="text-[10px] text-gray-400">
                    {exp.startDate} – {exp.endDate}
                  </p>
                </div>
                <p className="text-xs text-gray-500">{exp.company}</p>
                {exp.description && (
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </Section>
        )}

        {data.education.some((e) => e.school || e.degree) && (
          <Section title="Education">
            {data.education.map((edu, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-semibold text-gray-800">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {edu.startDate} – {edu.endDate}
                  </p>
                </div>
                <p className="text-xs text-gray-500">{edu.school}</p>
              </div>
            ))}
          </Section>
        )}
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-2">{title}</h2>
      {children}
    </div>
  );
}
