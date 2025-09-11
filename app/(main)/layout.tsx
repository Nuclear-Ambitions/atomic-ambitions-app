import { ThemeToggle } from "../components/theme-toggle";
import { AccountWidget } from "../components/account-widget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <ThemeToggle />

      {/* Header */}
      <header className="py-8 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            <div className="text-center">
              <h1 className="text-4xl md:text-7xl font-bold tracking-wider">
                Atomic Ambitions
              </h1>
            </div>
            <div className="flex-1 flex justify-end">
              <AccountWidget />
            </div>
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
