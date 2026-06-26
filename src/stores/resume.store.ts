import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Experience, Education, Skill } from "../templates/types";
import { emptyExperience, emptyEducation, emptySkill } from "../templates/types";

interface ResumeStore {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setPhone: (v: string) => void;
  setAddress: (v: string) => void;
  setWebsite: (v: string) => void;
  setSummary: (v: string) => void;
  setExperience: (i: number, v: Partial<Experience>) => void;
  addExperience: () => void;
  removeExperience: (i: number) => void;
  setEducation: (i: number, v: Partial<Education>) => void;
  addEducation: () => void;
  removeEducation: (i: number) => void;
  setSkill: (i: number, v: Partial<Skill>) => void;
  addSkill: () => void;
  removeSkill: (i: number) => void;
  reset: () => void;
}

const initial = {
  name: "",
  email: "",
  phone: "",
  address: "",
  website: "",
  summary: "",
  experience: [{ ...emptyExperience }],
  education: [{ ...emptyEducation }],
  skills: [{ ...emptySkill }],
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      ...initial,
      setName: (v) => set({ name: v }),
      setEmail: (v) => set({ email: v }),
      setPhone: (v) => set({ phone: v }),
      setAddress: (v) => set({ address: v }),
      setWebsite: (v) => set({ website: v }),
      setSummary: (v) => set({ summary: v }),
      setExperience: (i, v) =>
        set((s) => ({
          experience: s.experience.map((x, j) => (j === i ? { ...x, ...v } : x)),
        })),
      addExperience: () =>
        set((s) => ({ experience: [...s.experience, { ...emptyExperience }] })),
      removeExperience: (i) =>
        set((s) => ({ experience: s.experience.filter((_, j) => j !== i) })),
      setEducation: (i, v) =>
        set((s) => ({
          education: s.education.map((x, j) => (j === i ? { ...x, ...v } : x)),
        })),
      addEducation: () =>
        set((s) => ({ education: [...s.education, { ...emptyEducation }] })),
      removeEducation: (i) =>
        set((s) => ({ education: s.education.filter((_, j) => j !== i) })),
      setSkill: (i, v) =>
        set((s) => ({
          skills: s.skills.map((x, j) => (j === i ? { ...x, ...v } : x)),
        })),
      addSkill: () => set((s) => ({ skills: [...s.skills, { ...emptySkill }] })),
      removeSkill: (i) =>
        set((s) => ({ skills: s.skills.filter((_, j) => j !== i) })),
      reset: () => set(initial),
    }),
    {
      name: "resume-data",
      merge: (persisted: unknown, current) => {
        const old = persisted as Record<string, unknown>;
        const rawSkills = old?.skills;
        const skills = Array.isArray(rawSkills)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? rawSkills.map((s: any) =>
              typeof s === "string"
                ? { name: s, level: "Intermediate" as const }
                : { name: s.name || "", level: s.level || "Intermediate" }
            )
          : [{ ...emptySkill }];
        return {
          ...current,
          ...old,
          experience: Array.isArray(old?.experience) ? old.experience : [{ ...emptyExperience }],
          education: Array.isArray(old?.education) ? old.education : [{ ...emptyEducation }],
          skills,
        };
      },
    },
  ),
);
