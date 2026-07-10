import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { useAppContext } from "@/context/AppContext";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  color?: "blue" | "violet";
}

export function Header({ title, showBack = true, color = "blue" }: HeaderProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { totalProgress } = useAppContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 h-14">
      <div className="h-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!isHome && showBack && (
            <Link to="/" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className={`w-6 h-6 ${color === "violet" ? "text-violet-500" : "text-primary-500"}`} />
            <span className="text-sm font-bold text-slate-700">
              {title || "WorkBuddy & CodeBuddy 入门指南"}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {!isHome && (
            <div className="w-40">
              <ProgressBar value={totalProgress} color={color} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
