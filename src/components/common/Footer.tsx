import { Origami } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Origami size={18} className="text-blue-400" />
          <span className="text-gray-400 text-sm">Resume Builder</span>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            Privacy
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            Terms
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            Contact
          </a>
        </div>

        <p className="text-gray-600 text-xs">
          © 2026 Resume Builder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
