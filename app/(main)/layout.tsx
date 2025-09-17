import { ThemeToggle } from "../components/theme-toggle";
import { AccountWidget } from "../components/account-widget";
import DynamicMenu from "../components/dynamic-menu";
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
      <header className="border-b-2 border-border">
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
            <div className="flex items-center space-x-4">
              <DynamicMenu />
              <AccountWidget />
            </div>
          </div>
        </div>
      </header>

      {children}
      {/* Footer */}
      <footer className="py-8 border-t-2 border-border">
        <div className="container mx-auto flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <Image
              src="/atomic-ambitions-logo-bdr.png"
              alt="Atomic Ambitions Logo"
              width={226}
              height={70}
              className="min-w-16 min-h-16"
            />
            <p className="text-sm text-muted-foreground md:ml-4">
              ©2025 Nuclear Ambitions LLC
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
