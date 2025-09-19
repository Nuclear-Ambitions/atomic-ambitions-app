"use client";

import React from "react";
import FeatureCard from "@/components/feature-card";
import { StepProps } from "./types";

const Step3: React.FC<StepProps> = ({ formData, setFormData }) => {
  const handlePaymentComplete = () => {
    // This would be called after successful payment processing
    // For now, just show the completion message
  };

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
              your account. Once verified, you can set up your profile and start
              exploring our community!
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
            One more step! Complete your payment to unlock total access.
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

export default Step3;
