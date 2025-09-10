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
      <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
      <form className="space-y-4">
        <input type="email" placeholder="Enter your email" className="input" />
        <button type="submit" className="btn btn-primary w-full">
          Join
        </button>
      </form>
    </div>
  );
}
