"use client";

import React from "react";
import FeatureCard from "@/components/feature-card";
import { StepProps } from "./types";

const ConfirmMembershipStep: React.FC<StepProps> = ({ formData, onNext }) => {
  const handleContinue = () => {
    // Mark identity as verified for Explorer accounts
    onNext();
  };

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
          Your Explorer account has been created successfully.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
          <p className="text-foreground">
            <strong>Account Details:</strong> {formData.alias} ({formData.email}
            )
          </p>
          <p className="text-foreground mt-2">
            <strong>Membership Level:</strong> Explorer (Free)
          </p>
          {formData.identityVerified && (
            <p className="text-green-600 mt-2">
              <strong>✓ Identity Verified</strong>
            </p>
          )}
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-primary mb-6 text-center">
          What's Next?
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Club Atomic"
            description="The best place to start exploring"
            icon="🎉"
            href="/clubroom"
          />
          <FeatureCard
            title="Adventures"
            description="Explore interactive learning experiences"
            icon="🚀"
            href="/adventures"
          />
          <FeatureCard
            title="Atomic Flux"
            description="Stay updated with the latest news"
            icon="⚡"
            href="/flux"
          />
          <FeatureCard
            title="Lessons"
            description="Learn from expert-led educational content"
            icon="📚"
            href="/lessons"
          />
          <FeatureCard
            title="Alchemy Lab"
            description="Hands-on experiments and simulations"
            icon="🧪"
            href="/lab"
          />
          <FeatureCard
            title="Atomic Who"
            description="Connect with other community members"
            icon="👥"
            href="/whos-who"
          />
        </div>
      </div>

      <div className="bg-muted/50 border border-muted rounded-lg p-6 mb-8">
        <h4 className="text-lg font-semibold text-primary mb-3">
          Explorer Benefits Unlocked
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">
                Participate in public forums
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">
                Unlimited access to learning
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">
                Basic listing in member directory
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-muted-foreground">✗</span>
              <span className="text-muted-foreground">Premium content</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-muted-foreground">✗</span>
              <span className="text-muted-foreground">Advanced features</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-muted-foreground">✗</span>
              <span className="text-muted-foreground">Priority support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={handleContinue} className="btn btn-outline px-8">
          Continue as Explorer
        </button>
        <button onClick={handleContinue} className="btn btn-primary px-8">
          Level Up to Supporter
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          You can upgrade to Supporter membership anytime to unlock premium
          features!
        </p>
      </div>
    </div>
  );
};

export default ConfirmMembershipStep;
