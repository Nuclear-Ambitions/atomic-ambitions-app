"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../lib/stores/auth-store";

interface NavigationItem {
  href: string;
  label: string;
  description?: string;
}

// Base navigation items that are always visible
const baseNavigationItems: NavigationItem[] = [
  { href: "/", label: "Home", description: "Main page" },
  {
    href: "/adventure",
    label: "Adventure",
    description: "Explore and discover",
  },
  { href: "/flux", label: "Atomic Flux", description: "Social idea exchange " },
  {
    href: "/learning",
    label: "Atomic Learning",
    description: "Learn about atomic energy",
  },
  { href: "/whos-who", label: "Who's Who", description: "Meet the community" },
  {
    href: "/why-join",
    label: "Why Join",
    description: "Benefits of membership",
  },
  {
    href: "/a-neutron-tale",
    label: "A Neutron's Tale",
    description: "A quickie ",
  },
  {
    href: "/art-gallery",
    label: "Art Gallery",
    description: "Flux-inspired eye candy",
  },
];

// Conditional navigation items based on auth state
const getConditionalNavigationItems = (
  isSignedIn: boolean,
  hasRole: (role: string) => boolean
): NavigationItem[] => {
  const items: NavigationItem[] = [];

  if (isSignedIn) {
    items.push({
      href: "/member-area",
      label: "Member Area",
      description: "Your account and settings",
    });
  }

  if (!isSignedIn) {
    items.push({
      href: "/sign-in",
      label: "Sign In",
      description: "Access your account",
    });
  }

  // Example: Admin-only items
  if (hasRole("admin")) {
    items.push({
      href: "/admin",
      label: "Admin Panel",
      description: "For overlords only",
    });
  }

  if (isSignedIn) {
    items.push({
      href: "/style-review",
      label: "Style Review",
      description: "UI theme test pattern",
    });
  }

  return items;
};

export default function DynamicMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, hasRole } = useAuthStore();

  // Combine base and conditional navigation items
  const navigationItems = [
    ...baseNavigationItems,
    ...getConditionalNavigationItems(isSignedIn, hasRole),
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 rounded-md"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}>
        <span
          className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-popover-foreground mb-4 border-b border-border pb-2">
                Navigation
              </h3>

              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-3 py-2 rounded-md transition-all duration-200 group ${
                        isActive
                          ? "bg-highlight text-highlight-background"
                          : "text-popover-foreground hover:bg-muted hover:text-foreground"
                      }`}>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.label}</span>
                        {item.description && (
                          <span
                            className={`text-sm ${
                              isActive
                                ? "text-highlight-background/80"
                                : "text-muted-foreground group-hover:text-foreground/70"
                            }`}>
                            {item.description}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-muted border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Atomic Ambitions Navigation
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
