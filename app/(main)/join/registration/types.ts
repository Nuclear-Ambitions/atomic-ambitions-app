export interface RegistrationData {
  alias: string;
  email: string;
  termsAccepted: boolean;
  turnstileToken: string;
  membershipLevel: "explorer" | "supporter" | "charter";
}

export interface StepProps {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  onNext: () => void;
}
