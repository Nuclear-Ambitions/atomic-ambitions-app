"use client";

import React from "react";
import { StepProps } from "./types";

const IdentityStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
  isSubmitting,
  setIsSubmitting,
  onNext,
  onSkip,
}) => {
  const handleOAuthLogin = async (provider: string) => {
    setIsSubmitting(true);
    setErrors({});

    try {
      // Redirect to OAuth provider
      const response = await fetch(`/api/auth/${provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: formData.accountId,
          email: formData.email,
        }),
      });

      // FIXME: what's going on here?
      if (response.ok) {
        const { authUrl } = (await response.json()) as { authUrl: string };
        window.location.href = authUrl;
      } else {
        const errorData = (await response.json()) as { message?: string };
        setErrors({ submit: errorData.message || "Authentication failed" });
      }
    } catch (error) {
      console.error("OAuth error:", error);
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMagicLink = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          accountId: formData.accountId,
        }),
      });

      if (response.ok) {
        setErrors({});
        // Show success message
        alert(
          "Magic link sent! Check your email and click the link to verify your identity."
        );
      } else {
        const errorData = (await response.json()) as { message?: string };
        setErrors({ submit: errorData.message || "Failed to send magic link" });
      }
    } catch (error) {
      console.error("Magic link error:", error);
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Verify Your Identity
        </h2>
        <p className="text-muted-foreground mb-6 text-center">
          Choose how you'd like to verify your identity. This helps us keep the
          community secure.
        </p>

        <div className="space-y-4">
          {/* OAuth Options */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuthLogin("google")}
              disabled={isSubmitting}
              className="btn btn-outline w-full flex items-center justify-center space-x-2">
              <span>🔍</span>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => handleOAuthLogin("github")}
              disabled={isSubmitting}
              className="btn btn-outline w-full flex items-center justify-center space-x-2">
              <span>🐙</span>
              <span>Continue with GitHub</span>
            </button>

            <button
              onClick={() => handleOAuthLogin("discord")}
              disabled={isSubmitting}
              className="btn btn-outline w-full flex items-center justify-center space-x-2">
              <span>🎮</span>
              <span>Continue with Discord</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          {/* Magic Link Option */}
          <button
            onClick={handleMagicLink}
            disabled={isSubmitting}
            className="btn btn-outline w-full flex items-center justify-center space-x-2">
            <span>📧</span>
            <span>Send Magic Link to {formData.email}</span>
          </button>

          {errors.submit && (
            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
          )}

          {/* Skip Option */}
          <div className="text-center">
            <button
              onClick={handleSkip}
              disabled={isSubmitting}
              className="text-sm text-muted-foreground hover:text-foreground underline">
              Skip for now
            </button>
            <p className="text-xs text-muted-foreground mt-1">
              You can verify your identity later
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityStep;
