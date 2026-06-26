import type { ResumeData } from "./types";

export default function Modern({ data }: { data: ResumeData }) {
  return (
    <div className="h-full bg-white font-sans">
      <div className="bg-blue-600 px-10 py-8">
        <h1 className="text-2xl font-bold text-white">{data.name}</h1>
        <div className="flex gap-4 text-[10px] text-blue-200 mt-2">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.address && <span>{data.address}</span>}
        </div>
        {data.website && (
          <p className="text-[10px] text-blue-300 mt-1">{data.website}</p>
        )}
      </div>

      <div className="px-10 py-7">
        <div className="flex gap-8">
          <div className="flex-1">
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
          </div>

          <div className="flex-1">
            {data.skills.some((s) => s.name) && (
              <Section title="Skills">
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.filter((s) => s.name).map((skill) => (
                    <span
                      key={skill.name}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
                    >
                      {skill.name}
                      <span className="text-[9px] text-blue-400 ml-1">({skill.level})</span>
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-2 pb-1 border-b border-gray-200">
        {title}
      </h2>
      {children}
    </div>
  );
}
