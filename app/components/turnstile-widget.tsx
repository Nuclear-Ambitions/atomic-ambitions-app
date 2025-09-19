import Turnstile, { useTurnstile } from "react-turnstile";

function TurnstileWidget() {
  const turnstile = useTurnstile();
  return (
    <Turnstile
      sitekey="1x00000000000000000000AA"
      onVerify={(token) => {
        fetch("/login", {
          method: "POST",
          body: JSON.stringify({ token }),
        }).then((response) => {
          if (!response.ok) turnstile.reset();
        });
      }}
    />
  );
}
