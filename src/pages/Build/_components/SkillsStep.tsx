import { useState } from "react";
import { useResumeStore } from "../../../stores";
import type { Skill } from "../../../templates/types";
import Select from "../../../components/ui/Select";

const levelOptions = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];

export default function SkillsStep() {
  const s = useResumeStore();
  const [name, setName] = useState("");
  const [level, setLevel] = useState<Skill["level"]>("Intermediate");

  const filled = s.skills.filter((sk) => sk.name);

  const handleAdd = () => {
    if (!name.trim()) return;
    const lastIdx = s.skills.length - 1;
    s.setSkill(lastIdx, { name: name.trim(), level });
    s.addSkill();
    setName("");
    setLevel("Intermediate");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-500 text-[11px]">
        Add skills and set your proficiency level.
      </p>

      <div className="space-y-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Skill name"
          className="input"
        />

        <div className="flex items-center gap-2">
          <Select
            options={levelOptions}
            value={level}
            onChange={(v) => setLevel(v as Skill["level"])}
            className="flex-1"
          />

          <button
            onClick={handleAdd}
            disabled={!name.trim()}
            className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] font-medium cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
          >
            Add
          </button>
        </div>
      </div>

      {filled.length > 0 && (
        <div className="space-y-1.5">
          {filled.map((skill) => {
            const realIndex = s.skills.findIndex((sk) => sk === skill);
            return (
              <div
                key={realIndex}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-white">{skill.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                    skill.level === "Advanced" ? "bg-blue-500/20 text-blue-400" :
                    skill.level === "Intermediate" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-gray-500/20 text-gray-400"
                  }`}>
                    {skill.level}
                  </span>
                </div>
                <button
                  onClick={() => s.removeSkill(realIndex)}
                  className="text-gray-600 hover:text-red-400 text-xs cursor-pointer"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
