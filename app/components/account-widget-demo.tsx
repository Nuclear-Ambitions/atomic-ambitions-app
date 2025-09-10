"use client";

import { useState } from "react";
import { AccountWidget } from "./account-widget";

export function AccountWidgetDemo() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Account Widget Demo</h2>
        <p className="text-muted-foreground mb-6">
          This demonstrates the account widget in both signed-in and signed-out
          states.
        </p>

        <button
          onClick={() => setShowDemo(!showDemo)}
          className="btn btn-primary mb-8">
          {showDemo ? "Hide Demo" : "Show Demo"}
        </button>
      </div>

      {showDemo && (
        <div className="space-y-8">
          {/* Header simulation */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Atomic Ambitions</h3>
                <p className="text-sm text-muted-foreground">
                  Header with Account Widget
                </p>
              </div>
              <AccountWidget />
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-muted/20 border border-border rounded-lg p-6">
            <h4 className="font-semibold mb-2">How to test:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Click "Sign In" to see the authenticated state</li>
              <li>• Click the avatar to open the dropdown menu</li>
              <li>• Click "Sign Out" to return to the unauthenticated state</li>
              <li>• The widget automatically handles state transitions</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
