import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { NavbarProps } from "../interface/NavbarProps";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Home, Sun, Moon, Search } from "lucide-react";

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // When user presses enter, navigate and clear the search box
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      //setSearch(""); // Clear the search box
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-4xl mx-auto flex h-16 items-center justify-center gap-2">
        {/* Home Icon Button */}
        <Link
          to="/"
          aria-label="Home"
          onClick={() => setSearch("")}
          tabIndex={0}
        >
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)] dark:hover:bg-[var(--muted-foreground)] dark:hover:text-[var(--background)]"
            onClick={() => setSearch("")}
            aria-label="Home"
          >
            <Home className="h-5 w-5" aria-hidden="true" focusable="false" />
          </Button>
        </Link>
        {/* Search Bar */}
        <form
          className="flex items-center gap-2 w-full max-w-xs"
          onSubmit={handleSearch}
          role="search"
          aria-label="Job search"
        >
          <div className="relative w-full">
            <Input
              type="text"
              className="w-full pl-9"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search jobs"
              aria-describedby="search-jobs-desc"
              autoComplete="off"
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Search
                className="h-4 w-4"
                aria-hidden="true"
                focusable="false"
              />
            </span>
          </div>
          <span id="search-jobs-desc" className="sr-only">
            Type to search for remote jobs
          </span>
        </form>
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="cursor-pointer transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)] dark:hover:bg-[var(--muted-foreground)] dark:hover:text-[var(--background)]"
          tabIndex={0}
        >
          {darkMode ? (
            <Sun className="h-5 w-5" aria-hidden="true" focusable="false" />
          ) : (
            <Moon className="h-5 w-5" aria-hidden="true" focusable="false" />
          )}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
