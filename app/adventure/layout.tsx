import { ReactNode } from "react";
import { AccountWidget } from "../components/account-widget";

interface AdventureLayoutProps {
  children: ReactNode;
}

export default function AdventureLayout({ children }: AdventureLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo placeholder */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  A
                </span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Adventure</h1>
            </div>

            {/* Account Widget */}
            <AccountWidget />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-3">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Atomic Ambitions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
