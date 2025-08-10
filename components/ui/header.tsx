"use client";

import React, { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { id: "stories", label: "Real Stories" },
  { id: "youre-not-crazy", label: "You’re Not Crazy" },
  { id: "mnemonics", label: "Mnemonics" },
  { id: "resources", label: "Resources" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach((link) => {
      const el = document.getElementById(link.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(link.id);
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLink = (link: { id: string; label: string }) => (
    <a
      key={link.id}
      href={`#${link.id}`}
      onClick={() => setOpen(false)}
      className={`hover:underline ${active === link.id ? "text-primary font-medium" : ""}`}
    >
      {link.label}
    </a>
  );

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled ? "backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6" />
          <span className="font-semibold">Healing After Narcissists</span>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-sm">
          {links.map(navLink)}
        </nav>
        <Button className="ml-4 hidden md:inline-flex" asChild>
          <a href="#resources">Get Support</a>
        </Button>
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="absolute top-3 right-4">
            <button
              onClick={() => setOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="mt-16 flex flex-col items-center gap-6 text-lg">
            {links.map(navLink)}
            <Button asChild>
              <a href="#resources" onClick={() => setOpen(false)}>
                Get Support
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
