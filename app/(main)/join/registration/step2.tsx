"use client";

import React from "react";
import { StepProps } from "./types";

const Step2: React.FC<StepProps> = ({ formData, setFormData, onNext }) => {
  const handleSubmit = () => {
    onNext();
  };

  return (
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
        <button onClick={handleSubmit} className="btn btn-primary px-8">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step2;
