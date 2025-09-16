"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../lib/stores/auth-store";
import { sampleUserZanzibar } from "../lib/data/sample";

interface AccountWidgetProps {
  className?: string;
}

// Mock sign in function for demonstration - replace with real auth
const useMockAuth = () => {
  const { signIn: authSignIn, signOut: authSignOut } = useAuthStore();

  const signIn = () => {
    // Mock user data - replace with real authentication
    const mockUser = sampleUserZanzibar;
    authSignIn(mockUser);
  };

  const signOut = () => {
    authSignOut();
  };

  return { signIn, signOut };
};

export function AccountWidget({ className = "" }: AccountWidgetProps) {
  const { isSignedIn, user } = useAuthStore();
  const { signIn, signOut } = useMockAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isSignedIn) {
    return (
      <div className={`flex items-center ${className}`}>
        <button
          onClick={signIn}
          className="btn btn-primary px-6 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Sign in to your account">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center ${className}`}
      ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-cherenkov to-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-2 border-transparent hover:border-cherenkov/30"
        aria-label="Open account menu"
        aria-expanded={isDropdownOpen}>
        {user?.profile?.avatarUrl ? (
          <img
            src={user.profile?.avatarUrl}
            alt={user.name || user.profile?.alias || "Unknown"}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-sm font-bold">
            {user?.name
              ? getInitials(user.name)
              : user?.profile?.alias
              ? getInitials(user.profile?.alias)
              : "U"}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-12 w-56 bg-popover border border-border rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-popover-foreground">
              {user?.name || user?.profile?.alias || "Unknown"}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <a
              href="/account"
              className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150"
              onClick={() => setIsDropdownOpen(false)}>
              <svg
                className="w-4 h-4 mr-3 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Account
            </a>

            <a
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150"
              onClick={() => setIsDropdownOpen(false)}>
              <svg
                className="w-4 h-4 mr-3 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </a>

            <a
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150"
              onClick={() => setIsDropdownOpen(false)}>
              <svg
                className="w-4 h-4 mr-3 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Profile
            </a>

            <div className="border-t border-border my-1"></div>

            <button
              onClick={() => {
                signOut();
                setIsDropdownOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors duration-150"
              aria-label="Sign out of your account">
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
