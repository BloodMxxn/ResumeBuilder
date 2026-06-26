import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "react-router-dom";

const buttonVariants = cva(
  "font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.97]",
  {
    variants: {
      variant: {
        outline: "text-blue-400 border border-white/10 hover:bg-white/5 hover:border-white/20",
        fill: "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_2px_15px_-3px_rgba(59,130,246,0.4)] hover:shadow-[0_4px_25px_-5px_rgba(59,130,246,0.5)]",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5",
        muted: "text-gray-300 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white",
        badge: "text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15",
      },
      size: {
        sm: "px-2.5 py-1.5 text-xs",
        md: "px-4 py-2 text-xs sm:text-sm",
        lg: "px-6 py-3 text-xs sm:text-sm md:text-base",
        "icon-sm": "size-7 p-1",
        "icon-md": "size-8 p-2 sm:size-9",
        "icon-lg": "size-12 p-2",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      active: {
        true: "text-blue-500!",
      },
    },

    defaultVariants: {
      size: "md",
      variant: "fill",
      rounded: "full",
      fullWidth: false,
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  className?: string;
  to?: string;
  active?: boolean;
}

const Button = ({
  children,
  className,
  size,
  variant,
  rounded,
  active,
  to,
  ...props
}: ButtonProps) => {
  const styles = buttonVariants({ size, variant, rounded, active, className });

  if (to) {
    return (
      <Link className={styles} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;
