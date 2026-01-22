"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const isAdmin = localStorage.getItem("rentalke_admin");
    if (isAdmin === "true") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple password check (for MVP - will improve later)
    // Change this password to whatever you want
    const ADMIN_PASSWORD = "rentalke2026";

    // Simulate async operation
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem("rentalke_admin", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect password");
        setPassword("");
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-md mx-auto">
              <div className="bg-white border border-border-gray rounded-button p-8">
                <h1 className="text-3xl font-semibold mb-2 text-center">
                  Admin Login
                </h1>
                <p className="text-text-secondary text-center mb-8">
                  Enter password to access admin panel
                </p>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className="input-field"
                      placeholder="Enter admin password"
                      autoFocus
                    />
                    {error && (
                      <p className="text-status-occupied text-sm mt-2">
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" color="white" />
                        <span>Logging in...</span>
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-border-gray">
                  <p className="text-sm text-text-secondary text-center">
                    Default password: <code className="bg-bg-light px-2 py-1 rounded">rentalke2026</code>
                  </p>
                  <p className="text-xs text-text-secondary text-center mt-2">
                    Change this in the code later for security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
