import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}>
      <button className="btn btn-primary mt-6" type="submit">
        Sign in with Google
      </button>
    </form>
  );
}
