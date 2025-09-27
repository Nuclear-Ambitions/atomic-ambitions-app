export enum MembershipLevel {
  Explorer = "explorer",
  Supporter = "supporter",
  Charter = "charter",
  LifetimeCharter = "lifetime_charter",
}

export enum AccountStatus {
  Pending = "pending",
  Active = "active",
  Suspended = "suspended",
  Cancelled = "cancelled",
  Terminated = "terminated",
}

export enum SubscriptionStatus {
  Pending = "pending",
  Active = "active",
  Cancelled = "cancelled",  // user initiated
  Terminated = "terminated",  // service initiated
}

export enum Role {
  Member = "member",
  Contributor = "contributor",
  Moderator = "moderator",
  Editor = "editor",
  Admin = "admin",
}

export interface RegistrationData {
  userId?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  alias?: string | null;
  membershipId?: number | null;
  agreedToTerms?: Date | null;
  privacyPolicyOk?: Date | null;
  status?: string | null;
  subscriptionStatus?: string | null;
  level?: string | null;
  joinedAt?: Date | null;
}

export type RegistrationStep =
  | "IdentityStep"
  | "MembershipStep"
  | "ConfirmMembershipStep";

// TODO: keep these steps for later
export type SubscriptionStep =
  | "SubscriptionStep"
  | "ConfirmSubscriptionStep";

export interface StepFlow {
  currentStep: RegistrationStep;
  completedSteps: RegistrationStep[];
  availableSteps: RegistrationStep[];
}

export interface StepProps {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  onNext: () => void;
  onPrevious?: () => void;
  onSkip?: () => void;
  refreshRegistrationData?: () => Promise<RegistrationData | null>;
}

export interface StepConfig {
  name: string;
  title: string;
  description: string;
  canSkip: (formData: RegistrationData) => boolean;
  nextStep?: RegistrationStep;
  previousStep?: RegistrationStep;
}
