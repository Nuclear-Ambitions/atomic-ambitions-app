"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";

// Zod schema for email validation
const emailSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

export function MagicLinkSignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate email address with Zod
      const validatedData = emailSchema.parse({ email });

      // Attempt to sign in with magic link
      const result = await signIn("resend", {
        email: validatedData.email,
        redirect: false,
      });

      if (result?.error) {
        setError("Failed to send magic link. Please try again.");
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0]?.message || "Invalid email address");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="card max-w-md mx-auto">
        <div className="text-center">
          <div className="text-success text-2xl mb-4">✓</div>
          <h3 className="text-lg font-semibold mb-2">Check your email</h3>
          <p className="text-muted-foreground">
            We've sent a magic link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Click the link in your email to sign in.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setEmail("");
            }}
            className="btn btn-outline mt-4">
            Try different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="input"
            disabled={isLoading}
            autoComplete="email"
            required
          />
          {error && <p className="text-error text-sm mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="btn btn-primary w-full">
          {isLoading ? "Sending..." : "Send Magic Link"}
        </button>
      </form>
    </div>
  );
}
