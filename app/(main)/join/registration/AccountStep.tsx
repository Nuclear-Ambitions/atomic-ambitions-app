"use client";

import React from "react";
import Turnstile from "react-turnstile";
import { MembershipLevel, StepProps } from "./types";

const AccountStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
  isSubmitting,
  setIsSubmitting,
  onNext,
}) => {
  const validateAccountStep = () => {
    const newErrors: Record<string, string> = {};

    if (!formData?.alias?.trim()) {
      newErrors.alias = "Please enter an alias";
    }

    if (!formData?.email?.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData?.termsAcceptedAt) {
      newErrors.terms = "You must accept the Terms of Use to get an account";
    }

    if (!formData?.turnstileToken) {
      newErrors.turnstile = "Having trouble verifying your humanity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAccountStep()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send data to backend API to create account
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alias: formData.alias,
          email: formData.email,
          turnstileToken: formData.turnstileToken,
        }),
      });

      if (response.ok) {
        const result = (await response.json()) as { accountId: string };
        // Update form data with account ID
        setFormData((prev) => ({
          ...prev,
          accountId: result.accountId,
          membershipLevel: MembershipLevel.Explorer,
        }));
        onNext();
      } else {
        const errorData = (await response.json()) as { message?: string };
        setErrors({ submit: errorData.message || "Account creation failed" });
      }
    } catch (error) {
      console.error("Account creation error:", error);
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Create Your Account
        </h2>
        <p className="text-muted-foreground mb-6 text-center">
          Let's get you started with a free Explorer account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="alias"
              className="block text-sm font-medium text-foreground mb-2">
              Choose Your Alias
            </label>
            <input
              type="text"
              id="alias"
              value={formData.alias}
              onChange={(e) =>
                setFormData({ ...formData, alias: e.target.value })
              }
              placeholder="Enter your alias"
              className="input w-full"
            />
            {errors.alias && (
              <p className="text-red-500 text-sm mt-1">{errors.alias}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              className="input w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={!!formData.termsAcceptedAt}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  termsAcceptedAt: e.target.checked ? new Date() : undefined,
                })
              }
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms}</p>
          )}

          <div className="flex justify-center">
            <Turnstile
              sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
              onSuccess={(token) =>
                setFormData({ ...formData, turnstileToken: token })
              }
              onError={() => setFormData({ ...formData, turnstileToken: "" })}
              onExpire={() => setFormData({ ...formData, turnstileToken: "" })}
            />
          </div>
          {errors.turnstile && (
            <p className="text-red-500 text-sm text-center">
              {errors.turnstile}
            </p>
          )}

          {errors.submit && (
            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full">
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountStep;
