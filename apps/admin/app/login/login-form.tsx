"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Eye, EyeOff, ArrowRight, User } from "lucide-react";
import logo from "../../public/logo.png";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "An error occurred during login.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      <div className="flex flex-col mb-8">
        <img src={logo.src} alt="Syon Controls Logo" className="h-15 w-auto object-contain mb-8 self-start" />
        <div className="flex flex-col space-y-1.5">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Welcome back!</h1>
          <p className="text-base text-neutral-500">Please log in to your dashboard to continue.</p>
        </div>
      </div>

      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-700 font-medium">User ID</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@syon.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-transparent bg-[#f0f4f8] hover:bg-[#e2e8f0] focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-xl px-4"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                  <User className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-700 font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="••••••••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-12 border-transparent bg-[#f0f4f8] hover:bg-[#e2e8f0] focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-xl px-4"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 mt-4 text-base font-medium transition-all active:scale-[0.98] bg-[#0f172a] hover:bg-black text-white rounded-xl" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  <span>Logging in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Log In <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
        </form>
      </div>
    </div>
  );
}
