import { useResumeStore } from "../../../stores";

export default function SummaryStep() {
  const s = useResumeStore();

  return (
    <div className="space-y-3">
      <p className="text-gray-500 text-[11px]">
        Write a brief summary about yourself.
      </p>

      <textarea
        value={s.summary}
        onChange={(e) => s.setSummary(e.target.value)}
        rows={5}
        placeholder="Experienced software engineer with 5+ years of expertise..."
        className="input resize-none"
      />

      <p className="text-gray-600 text-[10px]">
        {s.summary.length} / 500
      </p>
    </div>
  );
}
