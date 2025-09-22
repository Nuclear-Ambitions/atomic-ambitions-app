"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  RegistrationData,
  RegistrationStep,
  StepFlow,
  StepConfig,
} from "./types";
import AccountStep from "./AccountStep";
import IdentityStep from "./IdentityStep";
import ConfirmMembershipStep from "./ConfirmMembershipStep";
import SubscribeStep from "./SubscribeStep";
import ConfirmSubscriptionStep from "./ConfirmSubscriptionStep";
import { useAuthStore } from "@/lib/stores/auth-store";

const RegistrationContent = () => {
  const searchParams = useSearchParams();
  const { isSignedIn, user } = useAuthStore();

  // Step configuration
  const stepConfigs: Record<RegistrationStep, StepConfig> = {
    IdentityStep: {
      name: "IdentityStep",
      title: "Verify Identity",
      description: "Confirm your identity",
      isRequired: true,
      nextStep: "AccountStep",
    },
    AccountStep: {
      name: "AccountStep",
      title: "Create Account",
      description: "Set up your free Explorer account",
      isRequired: true,
      nextStep: "ConfirmMembershipStep",
      previousStep: "IdentityStep",
    },
    ConfirmMembershipStep: {
      name: "ConfirmMembershipStep",
      title: "Welcome Explorer",
      description: "Your free account is ready",
      isRequired: true,
      nextStep: "SubscribeStep",
      previousStep: "IdentityStep",
    },
    SubscribeStep: {
      name: "SubscribeStep",
      title: "Level Up",
      description: "Choose a paid subscription",
      isRequired: false,
      nextStep: "ConfirmSubscriptionStep",
      previousStep: "ConfirmMembershipStep",
    },
    ConfirmSubscriptionStep: {
      name: "ConfirmSubscriptionStep",
      title: "Complete",
      description: "Finish your registration",
      isRequired: false,
      previousStep: "SubscribeStep",
    },
  };

  // Determine initial step based on user state
  const getInitialStep = (): RegistrationStep => {
    if (isSignedIn && user?.id) {
      // User has account, check if they need identity verification
      if (!user.name && !formData.identityVerified) {
        return "IdentityStep";
      }
      // User is verified, check if they want to subscribe
      return "SubscribeStep";
    }
    // No account, start from beginning
    return "AccountStep";
  };

  const [stepFlow, setStepFlow] = useState<StepFlow>({
    currentStep: getInitialStep(),
    completedSteps: [],
    availableSteps: [
      "IdentityStep",
      "AccountStep",
      "ConfirmMembershipStep",
      "SubscribeStep",
      "ConfirmSubscriptionStep",
    ],
  });

  const [formData, setFormData] = useState<RegistrationData>({
    alias: "",
    email: "",
    termsAcceptedAt: undefined,
    turnstileToken: "",
    membershipLevel: undefined,
    accountId: user?.id,
    identityVerified: isSignedIn && !!user?.name,
    subscriptionStatus: undefined,
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

  const handleNext = () => {
    const currentConfig = stepConfigs[stepFlow.currentStep];
    if (currentConfig.nextStep) {
      setStepFlow((prev) => ({
        ...prev,
        currentStep: currentConfig.nextStep!,
        completedSteps: [...prev.completedSteps, prev.currentStep],
      }));
    }
  };

  const handlePrevious = () => {
    const currentConfig = stepConfigs[stepFlow.currentStep];
    if (currentConfig.previousStep) {
      setStepFlow((prev) => ({
        ...prev,
        currentStep: currentConfig.previousStep!,
      }));
    }
  };

  const handleSkip = () => {
    const currentConfig = stepConfigs[stepFlow.currentStep];
    if (!currentConfig.isRequired && currentConfig.nextStep) {
      setStepFlow((prev) => ({
        ...prev,
        currentStep: currentConfig.nextStep!,
        completedSteps: [...prev.completedSteps, prev.currentStep],
      }));
    }
  };

  const stepProps = {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    onNext: handleNext,
    onPrevious: handlePrevious,
    onSkip: handleSkip,
  };

  // Get step components mapping
  const stepComponents = {
    AccountStep: AccountStep,
    IdentityStep: IdentityStep,
    ConfirmMembershipStep: ConfirmMembershipStep,
    SubscribeStep: SubscribeStep,
    ConfirmSubscriptionStep: ConfirmSubscriptionStep,
  };

  const CurrentStepComponent = stepComponents[stepFlow.currentStep];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        {/* Progress indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {stepFlow.availableSteps.map((stepName, index) => {
              const config = stepConfigs[stepName];
              const isCompleted = stepFlow.completedSteps.includes(stepName);
              const isCurrent = stepFlow.currentStep === stepName;
              const isActive = isCurrent || isCompleted;

              return (
                <React.Fragment key={stepName}>
                  <div
                    className={`flex items-center ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive ? "bg-primary text-white" : "bg-muted"
                      }`}>
                      {isCompleted ? "✓" : index + 1}
                    </div>
                    <span className="ml-2 font-medium hidden sm:block">
                      {config.title}
                    </span>
                  </div>
                  {index < stepFlow.availableSteps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        isCompleted ? "bg-primary" : "bg-muted"
                      }`}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <CurrentStepComponent {...stepProps} />
      </div>
    </div>
  );
};

const RegistrationPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-md mx-auto">
              <div className="card">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">
                    Loading registration form...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }>
      <RegistrationContent />
    </Suspense>
  );
};

export default RegistrationPage;
