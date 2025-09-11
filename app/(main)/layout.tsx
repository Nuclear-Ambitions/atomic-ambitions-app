import { ThemeToggle } from "../components/theme-toggle";
import { AccountWidget } from "../components/account-widget";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <ThemeToggle />

      {/* Header */}
      <header className="bg-header-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg flex">
                <Image
                  src="/atomic-ambitions-logo-sq.png"
                  alt="Atomic Ambitions Logo"
                  width={75}
                  height={75}
                  className="min-w-16 min-h-16"
                />
              </div>
              <h1 className="text-2xl font-bold text-highlight">
                Atomic Ambitions
              </h1>
            </div>
            <AccountWidget />
          </div>
        </div>
      </header>

      {children}
      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg">©2025 Nuclear Ambitions LLC</p>
        </div>
      </footer>
    </div>
  );
}
