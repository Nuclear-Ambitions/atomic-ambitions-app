import Link from "next/link";

// Reusable Join Form Component
export default function JoinForm({
  title = "Join Us",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  return (
    <div className={`card max-w-md mx-auto ${className}`}>
      <h3 className="text-primary mb-4">{title}</h3>
      <p className="mb-4">
        Ready to join the Atomic Ambitions community? Start your registration
        process and choose your membership level.
      </p>
      <div className="space-y-4">
        <Link href="/join/registration" className="btn btn-primary w-full">
          Start Registration
        </Link>
        <p className="text-sm text-muted-foreground text-center">
          Free Explorer membership available
        </p>
      </div>
    </div>
  );
}
