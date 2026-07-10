import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import type { ToastState } from "@/types";

interface ToastProps {
  toast: ToastState;
  onClose: () => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(t);
  }, [toast.id, onClose]);

  const icons = { success: CheckCircle, error: XCircle, info: Info };
  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };
  const iconColors = { success: "text-green-500", error: "text-red-500", info: "text-blue-500" };

  const Icon = icons[toast.type];

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${colors[toast.type]}`}>
        <Icon className={`w-5 h-5 ${iconColors[toast.type]}`} />
        <span className="text-sm font-medium">{toast.message}</span>
        <button onClick={() => { setShow(false); setTimeout(onClose, 300); }} className="ml-2 hover:opacity-70">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
