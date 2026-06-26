import type { ComponentType } from "react";

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

export interface TemplateConfig {
  slug: string;
  name: string;
  component: ComponentType<{ data: ResumeData }>;
  pdf: ComponentType<{ data: ResumeData }>;
}

export const emptyExperience: Experience = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
};

export const emptyEducation: Education = {
  school: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
};

export const emptySkill: Skill = {
  name: "",
  level: "Intermediate",
};

export const defaultData: ResumeData = {
  name: "Your Name",
  email: "email@example.com",
  phone: "+1 234 567 890",
  address: "",
  website: "",
  summary: "",
  experience: [{ ...emptyExperience }],
  education: [{ ...emptyEducation }],
  skills: [{ ...emptySkill }],
};
