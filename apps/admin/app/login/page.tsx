import { LoginForm } from "./login-form";
import Silk from "@workspace/ui/components/Silk";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col lg:flex-row bg-[#fafafa]">
      {/* Left side: Silk Background */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 z-0">
          <Silk color="#e11d48" speed={3} scale={1.2} />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/80 to-transparent flex flex-col justify-end p-16">
          <h2 className="text-4xl font-bold text-white mb-3">Syon Admin Portal</h2>
          <p className="text-lg text-neutral-300 max-w-md leading-relaxed">
            Securely access your control panel to manage devices, users, and comprehensive system settings.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 lg:p-12 relative z-10 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-rose-50 rounded-full blur-3xl opacity-60 pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-slate-50 rounded-full blur-3xl opacity-60 pointer-events-none z-0" />

        {/* Main Form Container */}
        <div className="w-full max-w-[400px] flex flex-col gap-8 relative z-10 mt-[-5vh]">
          <LoginForm />
        </div>

        {/* Minimal Footer */}
        <div className="absolute bottom-8 left-0 w-full text-center px-6 text-sm text-neutral-400 font-medium">
          &copy; {new Date().getFullYear()} Syon Controls. All rights reserved.
        </div>
      </div>
    </div>
  );
}
