"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Turnstile from "react-turnstile";
import FeatureCard from "../../../components/feature-card";
import Image from "next/image";

interface RegistrationData {
  alias: string;
  email: string;
  termsAccepted: boolean;
  turnstileToken: string;
  membershipLevel: "explorer" | "supporter";
}

const RegistrationPage = () => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    alias: "",
    email: "",
    termsAccepted: false,
    turnstileToken: "",
    membershipLevel: "explorer",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prepopulate alias from query parameter
  useEffect(() => {
    const requestedAlias = searchParams.get("requested-alias");
    if (requestedAlias) {
      setFormData((prev) => ({ ...prev, alias: requestedAlias }));
    }
  }, [searchParams]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.alias.trim()) {
      newErrors.alias = "Please enter an alias";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.termsAccepted) {
      newErrors.terms = "You must accept the Terms of Use to continue";
    }

    if (!formData.turnstileToken) {
      newErrors.turnstile = "Please complete the verification";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep1()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send data to backend API
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
        // Cookie will be set by the backend
        setCurrentStep(2);
      } else {
        const errorData = (await response.json()) as { message?: string };
        setErrors({ submit: errorData.message || "Registration failed" });
      }
    } catch (error) {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep2Submit = () => {
    setCurrentStep(3);
  };

  const handlePaymentComplete = () => {
    // This would be called after successful payment processing
    // For now, just show the completion message
  };

  const renderStep1 = () => (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Join Atomic Ambitions
        </h2>
        <p className="text-muted-foreground mb-6 text-center">
          Let's get you started with your membership
        </p>

        <form onSubmit={handleStep1Submit} className="space-y-4">
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
              checked={formData.termsAccepted}
              onChange={(e) =>
                setFormData({ ...formData, termsAccepted: e.target.checked })
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
              sitekey="0x4AAAAAAAYourSiteKeyHere" // Replace with your actual site key
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
            {isSubmitting ? "Creating Account..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Choose Your Membership Level
        </h2>
        <p className="text-muted-foreground text-lg">
          Select the membership that best fits your needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Explorer Membership */}
        <div
          className={`card cursor-pointer transition-all ${
            formData.membershipLevel === "explorer"
              ? "ring-2 ring-primary bg-primary/5"
              : "hover:shadow-lg"
          }`}
          onClick={() =>
            setFormData({ ...formData, membershipLevel: "explorer" })
          }>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary mb-2">Explorer</h3>
            <div className="text-4xl font-bold text-primary mb-2">Free</div>
            <p className="text-muted-foreground">Perfect for getting started</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">Access to public forums</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">
                Basic educational resources
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">Member directory access</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-muted-foreground">✗</span>
              <span className="text-muted-foreground">Premium content</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-muted-foreground">✗</span>
              <span className="text-muted-foreground">Exclusive events</span>
            </div>
          </div>

          <div className="flex items-center justify-center mb-4">
            <input
              type="radio"
              name="membership"
              value="explorer"
              checked={formData.membershipLevel === "explorer"}
              onChange={() =>
                setFormData({ ...formData, membershipLevel: "explorer" })
              }
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Supporter Membership */}
        <div
          className={`card cursor-pointer transition-all ${
            formData.membershipLevel === "supporter"
              ? "ring-2 ring-primary bg-primary/5"
              : "hover:shadow-lg"
          }`}
          onClick={() =>
            setFormData({ ...formData, membershipLevel: "supporter" })
          }>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary mb-2">Supporter</h3>
            <div className="text-4xl font-bold text-primary mb-2">$11</div>
            <p className="text-muted-foreground">per month</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">Everything in Explorer</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">Premium research papers</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">Exclusive webinars</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">Early job access</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">Priority support</span>
            </div>
          </div>

          <div className="flex items-center justify-center mb-4">
            <input
              type="radio"
              name="membership"
              value="supporter"
              checked={formData.membershipLevel === "supporter"}
              onChange={() =>
                setFormData({ ...formData, membershipLevel: "supporter" })
              }
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button onClick={handleStep2Submit} className="btn btn-primary px-8">
          Continue
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => {
    if (formData.membershipLevel === "explorer") {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-32 h-32 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-6xl">🎉</span>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Welcome to Atomic Ambitions!
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Thank you for joining our community as an Explorer member.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
              <p className="text-foreground">
                <strong>Next steps:</strong> Please check your email and verify
                your account. Once verified, you can set up your profile and
                start exploring our community!
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">
              Choose Your First Adventure
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                title="Adventures"
                description="Explore interactive learning experiences"
                icon="🚀"
                href="/adventures"
              />
              <FeatureCard
                title="Lessons"
                description="Learn from expert-led educational content"
                icon="📚"
                href="/lessons"
              />
              <FeatureCard
                title="Lab"
                description="Hands-on experiments and simulations"
                icon="🧪"
                href="/lab"
              />
              <FeatureCard
                title="Flux"
                description="Stay updated with the latest news"
                icon="⚡"
                href="/flux"
              />
              <FeatureCard
                title="Who's Who"
                description="Connect with other community members"
                icon="👥"
                href="/whos-who"
              />
              <FeatureCard
                title="Clubroom"
                description="Join discussions and share ideas"
                icon="💬"
                href="/clubroom"
              />
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              Remember, you can always upgrade to Supporter membership later to
              unlock premium features!
            </p>
          </div>
        </div>
      );
    } else {
      // Supporter path - payment processing
      return (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Complete Your Supporter Membership
            </h2>
            <p className="text-muted-foreground text-lg">
              You're almost there! Complete your payment to unlock all premium
              features.
            </p>
          </div>

          <div className="card mb-8">
            <h3 className="text-xl font-bold text-primary mb-4">
              Payment Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Supporter Membership</span>
                <span className="font-bold">$11/month</span>
              </div>
              <div className="flex justify-between">
                <span>Billing cycle</span>
                <span>Monthly</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>$11.00/month</span>
              </div>
            </div>
          </div>

          <div className="card mb-8">
            <h3 className="text-xl font-bold text-primary mb-4">
              Payment Method
            </h3>
            <div className="bg-muted p-8 rounded-lg text-center">
              <p className="text-muted-foreground mb-4">
                Payment processing integration will be implemented here
              </p>
              <p className="text-sm text-muted-foreground">
                This would typically include Stripe, PayPal, or other payment
                processor
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() =>
                setFormData({ ...formData, membershipLevel: "explorer" })
              }
              className="btn btn-outline flex-1">
              Choose Explorer Instead
            </button>
            <button
              onClick={handlePaymentComplete}
              className="btn btn-primary flex-1">
              Complete Payment
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              30-day money-back guarantee • Cancel anytime
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        {/* Progress indicator */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center ${
                currentStep >= 1 ? "text-primary" : "text-muted-foreground"
              }`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-primary text-white" : "bg-muted"
                }`}>
                1
              </div>
              <span className="ml-2 font-medium">Account</span>
            </div>
            <div
              className={`flex-1 h-1 mx-4 ${
                currentStep >= 2 ? "bg-primary" : "bg-muted"
              }`}></div>
            <div
              className={`flex items-center ${
                currentStep >= 2 ? "text-primary" : "text-muted-foreground"
              }`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-primary text-white" : "bg-muted"
                }`}>
                2
              </div>
              <span className="ml-2 font-medium">Membership</span>
            </div>
            <div
              className={`flex-1 h-1 mx-4 ${
                currentStep >= 3 ? "bg-primary" : "bg-muted"
              }`}></div>
            <div
              className={`flex items-center ${
                currentStep >= 3 ? "text-primary" : "text-muted-foreground"
              }`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? "bg-primary text-white" : "bg-muted"
                }`}>
                3
              </div>
              <span className="ml-2 font-medium">Complete</span>
            </div>
          </div>
        </div>

        {/* Step content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default RegistrationPage;
