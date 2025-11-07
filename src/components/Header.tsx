import { useState } from "react";

interface HeaderProps {
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

const Header = ({ onFilterChange, activeFilter }: HeaderProps) => {
  const filters = [
    "[ // ALL ASSETS ]",
    "[ // OPTICS (K-SEC) ]",
    "[ // CHASSIS (M-SPEC) ]",
    "[ // NEURAL (BANNED) ]"
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/30">
      {/* Warning Banner */}
      <div className="bg-accent/20 border-b border-accent/50 py-2 px-4">
        <p className="text-accent text-center text-xs md:text-sm font-terminal flicker tracking-wider">
          // WARNING: UNAUTHORIZED ACCESS DETECTED. ZETATECH DYNAMICS - INTERNAL USE ONLY //
        </p>
      </div>

      {/* Main Header */}
      <div className="bg-background/95 backdrop-blur-sm py-4 px-4 md:px-8">
        <h1 className="text-primary text-xl md:text-2xl font-terminal tracking-wider mb-4 text-glitch">
          [Z//D] ZETATECH DYNAMICS // ASSET CATALOG 7.3.4 (LEAKED)
        </h1>

        {/* Navigation/Filter Bar */}
        <nav className="flex flex-wrap gap-2">
          {filters.map((filter, index) => {
            const filterValue = index === 0 ? "ALL" : filter.match(/\/\/ (.+) \]/)?.[1] || filter;
            const isActive = activeFilter === filterValue;
            
            return (
              <button
                key={filter}
                onClick={() => onFilterChange(filterValue)}
                className={`font-terminal text-xs md:text-sm px-3 py-2 border transition-all glitch-hover ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-primary border-primary/50 hover:border-primary"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
