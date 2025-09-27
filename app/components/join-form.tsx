"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Reusable Join Form Component
export default function JoinForm({
  title = "Join Us",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  const [alias, setAlias] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build URL with query parameter if alias is provided
    const url = alias.trim()
      ? `/join/registration?requested-alias=${encodeURIComponent(alias.trim())}`
      : "/join/registration";

    router.push(url);
  };

  return (
    <div className={`card max-w-md mx-auto ${className}`}>
      <h3 className="text-primary mb-4">{title}</h3>
      <p className="mb-4">
        To get started, pick a name for yourself. Something fun, something
        clever. A way for people to know you.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="alias"
            className="block text-sm font-medium text-foreground mb-2">
            Choose Your Alias (Optional)
          </label>
          <input
            type="text"
            id="alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Your alias"
            className="input w-full"
          />
          <p className="text-xs text-muted-foreground mt-1">
            This is how other members will know you in the community
          </p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full">
          {isSubmitting ? "Starting Registration..." : "Start Registration"}
        </button>
      </form>
    </div>
  );
}
