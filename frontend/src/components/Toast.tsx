import { CheckCircle2 } from "lucide-react";
import { useToastStore } from "@/store/toastStore";

const Toast = () => {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-fade-in-up flex items-center gap-2 rounded-lg bg-text px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
