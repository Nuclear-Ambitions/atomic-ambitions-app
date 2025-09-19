import Link from "next/link";

export default function JoinCta({
  title = "Join Us",
  rationale = "To get started, click the button. We will take you through a few simple steps.",
  buttonText = "Yes, sign me up!",
  className = "",
}: {
  title?: string;
  rationale?: string;
  buttonText?: string;
  className?: string;
}) {
  return (
    <div className={`card max-w-md mx-auto text-center ${className}`}>
      <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
      <p className="text-foreground my-6">{rationale}</p>
      <Link href="/join" className="btn btn-primary m-4">
        {buttonText}
      </Link>
    </div>
  );
}
