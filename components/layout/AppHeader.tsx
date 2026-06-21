"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// <AppHeader /> — Global navigation header
export default function AppHeader() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Mapa", icon: "⬡" },
    { href: "/tutoria", label: "Praticar", icon: "✦" },
    { href: "/exame", label: "Exame", icon: "◈" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/60 bg-[#0F172A]/90 backdrop-blur-md">
      {/* Progress bar at top */}
      <div className="h-0.5 bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-700"
          style={{ width: "37%" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
              <span className="text-sm font-bold text-white">Σ</span>
            </div>
            <span className="font-bold text-slate-100 tracking-tight">
              Numera<span className="text-gradient">Tutor</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <span className="text-xs">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-medium text-slate-300">Joaremio</span>
              <span className="text-[10px] text-slate-500">Módulo 2 de 4</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-xs font-bold shadow-md">
              J
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
