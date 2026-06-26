import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "../types";

const s = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica" },
  header: { marginBottom: 20, borderBottom: "1pt solid #e5e7eb", paddingBottom: 10 },
  name: { fontSize: 24, fontWeight: "bold", color: "#111827" },
  contact: { flexDirection: "row", gap: 10, fontSize: 9, color: "#9ca3af", marginTop: 4 },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 10, fontWeight: "bold", color: "#2563eb", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" },
  text: { fontSize: 10, color: "#374151", lineHeight: 1.6 },
  jobHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  jobTitle: { fontSize: 11, fontWeight: "bold", color: "#111827" },
  jobDate: { fontSize: 9, color: "#9ca3af" },
  jobCompany: { fontSize: 9, color: "#6b7280" },
  jobDesc: { fontSize: 9, color: "#374151", marginTop: 4, lineHeight: 1.5 },
  skillRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  skill: { fontSize: 9, color: "#374151", backgroundColor: "#f3f4f6", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 },
});

export default function MinimalPDF({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{data.name}</Text>
          <View style={s.contact}>
            {data.email ? <Text>{data.email}</Text> : null}
            {data.phone ? <Text>{data.phone}</Text> : null}
            {data.address ? <Text>{data.address}</Text> : null}
          </View>
        </View>

        {data.summary ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Summary</Text>
            <Text style={s.text}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience.some((e) => e.company || e.position) ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <View style={s.jobHeader}>
                  <Text style={s.jobTitle}>{exp.position}</Text>
                  <Text style={s.jobDate}>{exp.startDate} – {exp.endDate}</Text>
                </View>
                <Text style={s.jobCompany}>{exp.company}</Text>
                {exp.description ? <Text style={s.jobDesc}>{exp.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.education.some((e) => e.school || e.degree) ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <View style={s.jobHeader}>
                  <Text style={s.jobTitle}>{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</Text>
                  <Text style={s.jobDate}>{edu.startDate} – {edu.endDate}</Text>
                </View>
                <Text style={s.jobCompany}>{edu.school}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.skills.some((sk) => sk.name) ? (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Skills</Text>
            <View style={s.skillRow}>
              {data.skills.filter((sk) => sk.name).map((skill) => (
                <Text key={skill.name} style={s.skill}>{skill.name} ({skill.level})</Text>
              ))}
            </View>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
