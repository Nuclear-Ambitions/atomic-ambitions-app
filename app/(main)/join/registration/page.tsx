"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { RegistrationData } from "./types";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const RegistrationContent = () => {
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

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const stepProps = {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    onNext: handleNext,
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
              <span className="ml-2 font-medium">Register</span>
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
              <span className="ml-2 font-medium">Level Up</span>
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

        {currentStep === 1 && <Step1 {...stepProps} />}
        {currentStep === 2 && <Step2 {...stepProps} />}
        {currentStep === 3 && <Step3 {...stepProps} />}
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
