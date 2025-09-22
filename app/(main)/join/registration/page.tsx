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
  const [isInitializing, setIsInitializing] = useState(true);

  // Step configuration with canSkip functions
  const stepConfigs: Record<RegistrationStep, StepConfig> = {
    IdentityStep: {
      name: "IdentityStep",
      title: "Verify Identity",
      description: "Confirm your identity",
      canSkip: (formData) => {
        return !!formData.identityVerified;
      },
      nextStep: "AccountStep",
    },
    AccountStep: {
      name: "AccountStep",
      title: "Create Account",
      description: "Set up your free Explorer account",
      canSkip: (formData) => !!formData.joinedAt,
      nextStep: "ConfirmMembershipStep",
      previousStep: "IdentityStep",
    },
    ConfirmMembershipStep: {
      name: "ConfirmMembershipStep",
      title: "Welcome Explorer",
      description: "Your free account is ready",
      canSkip: (formData) => false, // Always required - shows welcome and benefits
      nextStep: "SubscribeStep",
      previousStep: "AccountStep",
    },
    SubscribeStep: {
      name: "SubscribeStep",
      title: "Level Up",
      description: "Choose a paid subscription",
      canSkip: (formData) =>
        formData.membershipLevel === "explorer" ||
        !!formData.subscriptionStatus,
      nextStep: "ConfirmSubscriptionStep",
      previousStep: "ConfirmMembershipStep",
    },
    ConfirmSubscriptionStep: {
      name: "ConfirmSubscriptionStep",
      title: "Complete",
      description: "Finish your registration",
      canSkip: (formData) => formData.membershipLevel === "explorer", // Skip if staying as Explorer
      previousStep: "SubscribeStep",
    },
  };

  // Initialize form data state
  const [formData, setFormData] = useState<RegistrationData>({
    alias: "",
    email: "",
    termsAcceptedAt: undefined,
    turnstileToken: "",
    membershipLevel: undefined,
    accountId: undefined,
    identityVerified: false,
    subscriptionStatus: undefined,
  });

  // Determine initial step based on loaded registration state
  const getInitialStep = (
    loadedFormData: RegistrationData
  ): RegistrationStep => {
    // Always start with Identity verification first
    if (loadedFormData.identityVerified) {
      // User has verified identity, check if they have an account
      if (loadedFormData.accountId) {
        // User has account, can go to subscription selection
        return "SubscribeStep";
      }
      // User has identity but no account yet
      return "AccountStep";
    }
    // Start with identity verification
    return "IdentityStep";
  };

  const [stepFlow, setStepFlow] = useState<StepFlow>({
    currentStep: "IdentityStep", // Default, will be updated after loading
    completedSteps: [],
    availableSteps: [
      "IdentityStep",
      "AccountStep",
      "ConfirmMembershipStep",
      "SubscribeStep",
      "ConfirmSubscriptionStep",
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load registration state on mount
  useEffect(() => {
    const loadRegistrationState = async () => {
      try {
        // Try to load existing registration state from backend
        const response = await fetch("/api/registration/state", {
          method: "GET",
          credentials: "include",
        });

        let loadedData: RegistrationData = {
          alias: "",
          email: "",
          termsAcceptedAt: undefined,
          turnstileToken: "",
          membershipLevel: undefined,
          accountId: undefined,
          identityVerified: false,
          subscriptionStatus: undefined,
        };

        if (response.ok) {
          const stateData =
            (await response.json()) as Partial<RegistrationData>;
          loadedData = { ...loadedData, ...stateData };
        }

        // Prepopulate alias from query parameter if not already set
        const requestedAlias = searchParams.get("requested-alias");
        if (requestedAlias && !loadedData.alias) {
          loadedData.alias = requestedAlias;
        }

        // Update form data with loaded state
        setFormData(loadedData);

        // Determine and set the appropriate initial step
        const initialStep = getInitialStep(loadedData);
        setStepFlow((prev) => ({
          ...prev,
          currentStep: initialStep,
        }));
      } catch (error) {
        console.error("Failed to load registration state:", error);
        // Fall back to default state if loading fails
        const requestedAlias = searchParams.get("requested-alias");
        if (requestedAlias) {
          setFormData((prev) => ({ ...prev, alias: requestedAlias }));
        }
      } finally {
        setIsInitializing(false);
      }
    };

    loadRegistrationState();
  }, [searchParams]);

  // Save registration state to backend
  const saveRegistrationState = async (data: RegistrationData) => {
    try {
      await fetch("/api/registration/state", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Failed to save registration state:", error);
      // Don't throw - this shouldn't block the user flow
    }
  };

  const handleNext = () => {
    const currentConfig = stepConfigs[stepFlow.currentStep];
    if (currentConfig.nextStep) {
      // Save current state before moving to next step
      saveRegistrationState(formData);

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
    if (currentConfig.canSkip(formData) && currentConfig.nextStep) {
      // Save current state before skipping
      saveRegistrationState(formData);

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

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="card">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  Loading registration state...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
