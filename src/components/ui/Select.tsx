import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Select({ options, value, onChange, className = "" }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
  }, []);

  useEffect(() => {
    if (open) updatePosition();
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current && !containerRef.current.contains(e.target as Node) &&
        !(e.target as Element)?.closest("[data-select-dropdown]")
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 input cursor-pointer"
      >
        <span className={selected ? "text-white" : "text-gray-500"}>
          {selected?.label || "Select..."}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && createPortal(
        <div
          data-select-dropdown
          className="fixed rounded-xl border border-white/10 bg-[#0f0f18] shadow-2xl z-[9999] overflow-hidden"
          style={{ top: position.top, left: position.left, width: position.width }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 text-xs transition-colors cursor-pointer ${
                option.value === value
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>,
        document.body,
      )}
    </div>
  );
}
