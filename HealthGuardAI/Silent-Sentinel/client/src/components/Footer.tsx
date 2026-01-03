import { useSystemStatus } from "@/hooks/use-prediction";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function Footer() {
  const { data: status, isLoading, isError } = useSystemStatus();

  return (
    <footer className="w-full border-t border-border/50 bg-slate-50 mt-auto py-8">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} HealthGuard AI. All data is processed securely.
          </p>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />
                <span className="text-xs font-medium text-slate-500">Connecting to engine...</span>
              </>
            ) : isError ? (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs font-medium text-red-600">System Offline</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-slate-700">
                  {status?.message || "System Operational"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
