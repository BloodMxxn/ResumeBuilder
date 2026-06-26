interface StepTitleProps {
  label: string;
  title: string;
  highlight: string;
  className?: string;
}

export default function StepTitle({ label, title, highlight, className = "" }: StepTitleProps) {
  return (
    <div className={`${className}`}>
      <span className="text-blue-400 text-xs font-medium tracking-[0.2em] uppercase mb-2 block">
        {label}
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
        {title}{" "}
        <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {highlight}
        </span>
      </h1>
    </div>
  );
}
