import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "../types";

const s = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Helvetica" },
  sidebar: { width: "35%", backgroundColor: "#1e293b", padding: 30 },
  main: { width: "65%", padding: 30 },
  name: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  sidebarLabel: { fontSize: 9, fontWeight: "bold", color: "#38bdf8", marginTop: 16, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" },
  sidebarText: { fontSize: 9, color: "#cbd5e1", lineHeight: 1.6 },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 11, fontWeight: "bold", color: "#111827", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 },
  jobHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  jobTitle: { fontSize: 11, fontWeight: "bold", color: "#111827" },
  jobDate: { fontSize: 9, color: "#9ca3af" },
  jobCompany: { fontSize: 9, color: "#6b7280" },
  jobDesc: { fontSize: 9, color: "#374151", marginTop: 4, lineHeight: 1.5 },
  text: { fontSize: 10, color: "#374151", lineHeight: 1.6 },
});

export default function ClassicPDF({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.sidebar}>
          <Text style={s.name}>{data.name}</Text>

          <Text style={s.sidebarLabel}>Contact</Text>
          {data.email ? <Text style={s.sidebarText}>{data.email}</Text> : null}
          {data.phone ? <Text style={s.sidebarText}>{data.phone}</Text> : null}
          {data.address ? <Text style={s.sidebarText}>{data.address}</Text> : null}

          {data.skills.some((sk) => sk.name) ? (
            <>
              <Text style={s.sidebarLabel}>Skills</Text>
              {data.skills.filter((sk) => sk.name).map((skill) => (
                <Text key={skill.name} style={s.sidebarText}>{skill.name} ({skill.level})</Text>
              ))}
            </>
          ) : null}
        </View>

        <View style={s.main}>
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
        </View>
      </Page>
    </Document>
  );
}
