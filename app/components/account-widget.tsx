"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../lib/stores/auth-store";
import { sampleUserZanzibar } from "../lib/data/sample";
import Icon from "./icon";
import Image from "next/image";

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
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cherenkov to-primary text-primary-foreground font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-2 border-transparent hover:border-cherenkov/30"
        aria-label="Open account menu"
        aria-expanded={isDropdownOpen}>
        {user?.profile?.avatarUrl ? (
          <Image
            src={user.profile?.avatarUrl}
            width={60}
            height={60}
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
              <Icon
                name="User"
                size={16}
                weight="duotone"
                className="mr-3 text-muted-foreground"
              />
              Account
            </a>

            <a
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150"
              onClick={() => setIsDropdownOpen(false)}>
              <Icon
                name="Gear"
                size={16}
                weight="duotone"
                className="mr-3 text-muted-foreground"
              />
              Settings
            </a>

            <a
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150"
              onClick={() => setIsDropdownOpen(false)}>
              <Icon
                name="UserCircle"
                size={16}
                weight="duotone"
                className="mr-3 text-muted-foreground"
              />
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
              <Icon
                name="SignOut"
                size={16}
                weight="duotone"
                className="mr-3"
              />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
