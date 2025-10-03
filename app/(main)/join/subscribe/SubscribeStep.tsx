"use client";

import React from "react";
import { MembershipLevel } from "../registration/types";
import { RegistrationData } from "../registration/types";

interface StepProps {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  onNext: () => void;
  onPrevious?: () => void;
}

const SubscribeStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  onNext,
  onPrevious,
}) => {
  const handleSubmit = () => {
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Choose Your Membership Plan
        </h2>
        <p className="text-muted-foreground text-lg">
          Upgrade from your free Explorer membership to unlock premium features
          and support the community
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Supporter Membership */}
        <div
          className={`card cursor-pointer transition-all ${
            formData.level === "supporter"
              ? "ring-2 ring-primary bg-primary/5"
              : "hover:shadow-lg"
          }`}
          onClick={() =>
            setFormData({
              ...formData,
              level: MembershipLevel.Supporter,
            })
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
              <span className="text-foreground">Premium content access</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">Advanced features</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">Priority support</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">
                30-day money-back guarantee
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center mb-4">
            <input
              type="radio"
              name="membership"
              value="supporter"
              checked={formData.level === "supporter"}
              onChange={() =>
                setFormData({
                  ...formData,
                  level: MembershipLevel.Supporter,
                })
              }
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Charter Membership */}
        <div
          className={`card cursor-pointer transition-all ${
            formData.level === "charter"
              ? "ring-2 ring-primary bg-primary/5"
              : "hover:shadow-lg"
          }`}
          onClick={() =>
            setFormData({
              ...formData,
              level: MembershipLevel.Charter,
            })
          }>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary mb-2">Charter</h3>
            <div className="text-4xl font-bold text-primary mb-2">$111</div>
            <p className="text-muted-foreground">per year</p>
            <div className="text-sm text-green-600 font-semibold mt-2">
              Save 15% vs monthly!
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">Everything in Supporter</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">15% annual discount</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">
                Exclusive Charter member badge
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">
                Early access to new features
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-foreground">
                30-day money-back guarantee
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center mb-4">
            <input
              type="radio"
              name="membership"
              value="charter"
              checked={formData.level === "charter"}
              onChange={() =>
                setFormData({
                  ...formData,
                  level: MembershipLevel.Charter,
                })
              }
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>

      {/* Payment Method Preview */}
      {formData.level !== "explorer" && (
        <div className="card mb-8">
          <h3 className="text-xl font-bold text-primary mb-4">
            Payment Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>
                {formData.level === "supporter"
                  ? "Supporter Membership"
                  : "Charter Membership"}
              </span>
              <span className="font-bold">
                {formData.level === "supporter" ? "$11/month" : "$111/year"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Billing cycle</span>
              <span>
                {formData.level === "supporter" ? "Monthly" : "Annual"}
              </span>
            </div>
            {formData.level === "charter" && (
              <div className="flex justify-between text-green-600">
                <span>Annual discount</span>
                <span>-15%</span>
              </div>
            )}
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                {formData.level === "supporter"
                  ? "$11.00/month"
                  : "$111.00/year"}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        {onPrevious && (
          <button onClick={onPrevious} className="btn btn-outline px-8">
            Back to Explorer
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="btn btn-primary px-8"
          disabled={
            !formData.level || formData.level === "explorer" || isSubmitting
          }>
          {!formData.level || formData.level === "explorer"
            ? "Select a Membership Level"
            : isSubmitting
            ? "Processing..."
            : "Continue to Payment"}
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          30-day money-back guarantee • Cancel anytime • Secure payment
          processing
        </p>
      </div>
    </div>
  );
};

export default SubscribeStep;
