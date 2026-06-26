export default function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-gray-400 text-xs mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
