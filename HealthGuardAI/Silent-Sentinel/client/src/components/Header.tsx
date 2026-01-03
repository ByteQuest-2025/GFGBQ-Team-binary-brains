import { Activity, ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="w-full border-b border-border/40 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight text-slate-900">
              HealthGuard<span className="text-primary">AI</span>
            </h1>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Early Detection Engine</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            HIPAA Compliant
          </span>
          <span className="text-slate-300">|</span>
          <span>Version 1.0</span>
        </div>
      </div>
    </header>
  );
}
