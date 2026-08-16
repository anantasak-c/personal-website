import { NavLink, Link } from "react-router-dom";

const links = [
  { to: "/work", label: "Work" },
  { to: "/notes", label: "Notes" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fbfbf9]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.18em] text-[#1d1d1f]" aria-label="ANAN home">
          <span className="h-2 w-2 rounded-full bg-[#2997ff] transition-transform group-hover:scale-125" /> ANAN<span className="text-[#0066cc]">_</span>
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm transition-[background-color,color] ${
                  isActive ? "bg-black/[0.055] font-medium text-[#1d1d1f]" : "text-[#6e6e73] hover:bg-black/[0.035] hover:text-[#1d1d1f]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
