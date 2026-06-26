import { cva } from "class-variance-authority";

interface AuraProps {
  pulse?: boolean;
  color?: "blue" | "cyan";
}

export default function Aura({ pulse, color }: AuraProps) {
  const auraVariants = cva(
    "size-52 md:size-96 -z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]",
    {
      variants: {
        color: {
          blue: "bg-blue-500/20 sm:bg-blue-500/12",
          cyan: "bg-cyan-500/20 sm:bg-cyan-500/12",
        },
        pulse: {
          true: "animate-pulse",
        },
      },
      compoundVariants: [
        { pulse: true, color: "blue", class: "bg-blue-500/50 sm:bg-blue-500/20" },
        { pulse: true, color: "cyan", class: "bg-cyan-500/50 sm:bg-cyan-500/20" },
      ],
      defaultVariants: {
        pulse: false,
        color: "blue",
      },
    },
  );

  const style = auraVariants({ pulse, color });

  return <div className={style}></div>;
}
