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
}

export enum SubscriptionStatus {
  Pending = "pending",
  Active = "active",
  Cancelled = "cancelled",
}

export enum Role {
  User = "user",
  Admin = "admin",
  Moderator = "moderator",
  Editor = "editor",
  Contributor = "contributor",
}

export interface AccountData {
  id: string;
  alias: string;
  email: string;
  membershipLevel: MembershipLevel;
  roles: Role[];
  status: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegistrationData {
  accountId?: string;
  identityVerified?: boolean;
  alias?: string;
  email?: string;
  termsAcceptedAt?: Date;
  privacyPolicyAcceptedAt?: Date;
  joinedAt?: Date;
  membershipLevel?: MembershipLevel;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionExpiresAt?: Date;
}

export type RegistrationStep =
  | "MembershipStep"
  | "IdentityStep"
  | "ConfirmMembershipStep";
// | "SubscribeStep"
// | "ConfirmSubscriptionStep";

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
}

export interface StepConfig {
  name: string;
  title: string;
  description: string;
  canSkip: (formData: RegistrationData) => boolean;
  nextStep?: RegistrationStep;
  previousStep?: RegistrationStep;
}
