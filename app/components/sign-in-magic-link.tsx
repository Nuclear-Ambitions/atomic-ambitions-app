"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Turnstile } from "@marsidev/react-turnstile";
import TurnstileWidget from "./turnstile-widget";
import { z } from "zod";

// Zod schema for email validation
const emailSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  turnstileToken: z.string().min(1, "We are trying to verify your humanity"),
});

export default function MagicLinkSignIn() {
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate email address and turnstile token with Zod
      const validatedData = emailSchema.parse({ email, turnstileToken });

      // Verify Turnstile token
      const response = await fetch("/api/auth/turnstile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: validatedData.turnstileToken }),
      });

      if (!response.ok) {
        setError("We are sorry, no bots allowed.");
        setIsLoading(false);
        return;
      }
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
            We have sent a magic link to <strong>{email}</strong>
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
      <h4 className="text-center">Sign in with a magic link.</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mt-4">
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

        <div className="flex justify-center">
          {turnstileSiteKey ? (
            <Turnstile
              siteKey={turnstileSiteKey}
              options={{
                size: "flexible",
              }}
              onSuccess={handleTurnstileSuccess}
            />
          ) : (
            <div>Cannot check for bots</div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !email.trim() || !turnstileToken}
          className="btn btn-primary w-full">
          {isLoading ? "Sending..." : "Send Magic Link"}
        </button>
      </form>
    </div>
  );
}
