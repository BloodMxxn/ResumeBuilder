interface Step {
  label: string;
  title: string;
  highlight: string;
}

interface StepProgressProps {
  steps: Step[];
  current: number;
  onChange: (index: number) => void;
}

export default function StepProgress({ steps, current, onChange }: StepProgressProps) {
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`h-1 flex-1 rounded-full transition-all duration-300 cursor-pointer ${
            i <= current ? "bg-blue-500" : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}
