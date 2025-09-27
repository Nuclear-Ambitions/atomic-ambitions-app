"use client";

import React from "react";
import { StepProps } from "./types";

const ConfirmSubscriptionStep: React.FC<StepProps> = ({
  formData,
  onPrevious,
}) => {
  const handlePaymentComplete = () => {
    // This would be called after successful payment processing
    // For now, just show the completion message
  };

  const handleReturnLater = () => {
    // Redirect to dashboard or home page
    window.location.href = "/";
  };

  const isPaymentPending = formData.subscriptionStatus === "pending";
  const isPaymentCancelled = formData.subscriptionStatus === "cancelled";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
          {isPaymentPending ? (
            <span className="text-4xl">⏳</span>
          ) : isPaymentCancelled ? (
            <span className="text-4xl">💳</span>
          ) : (
            <span className="text-4xl">🎉</span>
          )}
        </div>

        {isPaymentPending ? (
          <>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Payment Processing
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Your payment is being processed. You will receive a confirmation
              email shortly.
            </p>
          </>
        ) : isPaymentCancelled ? (
          <>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Payment Cancelled
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              No worries! You can complete your subscription anytime.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Subscription Complete!
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Welcome to{" "}
              {formData.membershipLevel === "supporter"
                ? "Supporter"
                : "Charter"}{" "}
              membership!
            </p>
          </>
        )}
      </div>

      <div className="card mb-8">
        <h3 className="text-xl font-bold text-primary mb-4">
          Subscription Details
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Membership Level</span>
            <span className="font-bold capitalize">
              {formData.membershipLevel}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Account</span>
            <span>
              {formData.alias} ({formData.email})
            </span>
          </div>
          <div className="flex justify-between">
            <span>Billing</span>
            <span>
              {formData.membershipLevel === "supporter"
                ? "$11/month"
                : "$111/year"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Status</span>
            <span
              className={`font-semibold ${
                formData.subscriptionStatus === "active"
                  ? "text-green-600"
                  : formData.subscriptionStatus === "pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}>
              {formData.subscriptionStatus === "active"
                ? "Active"
                : formData.subscriptionStatus === "pending"
                ? "Pending"
                : "Cancelled"}
            </span>
          </div>
        </div>
      </div>

      {!isPaymentCancelled && (
        <div className="card mb-8">
          <h3 className="text-xl font-bold text-primary mb-4">
            {formData.membershipLevel === "supporter" ? "Supporter" : "Charter"}{" "}
            Benefits Unlocked
          </h3>
          <div className="space-y-3">
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
            {formData.membershipLevel === "charter" && (
              <>
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
              </>
            )}
          </div>
        </div>
      )}

      {/* Payment Processing Section */}
      {formData.membershipLevel !== "explorer" && (
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
      )}

      <div className="flex gap-4">
        {onPrevious && !isPaymentCancelled && (
          <button onClick={onPrevious} className="btn btn-outline flex-1">
            Back to Membership Selection
          </button>
        )}

        {isPaymentCancelled ? (
          <button
            onClick={handleReturnLater}
            className="btn btn-primary flex-1">
            Return Later
          </button>
        ) : isPaymentPending ? (
          <button
            onClick={handleReturnLater}
            className="btn btn-primary flex-1">
            Check Status Later
          </button>
        ) : (
          <button
            onClick={handlePaymentComplete}
            className="btn btn-primary flex-1">
            Complete Registration
          </button>
        )}
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          30-day money-back guarantee • Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default ConfirmSubscriptionStep;
