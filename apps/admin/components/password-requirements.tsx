import { Check, X } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface PasswordRequirementsProps {
  password?: string;
}

export function PasswordRequirements({ password = "" }: PasswordRequirementsProps) {
  const requirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "At least one uppercase letter", met: /[A-Z]/.test(password) },
    { label: "At least one lowercase letter", met: /[a-z]/.test(password) },
    { label: "At least one number", met: /\d/.test(password) },
    { label: "At least one special character (@$!%*?&)", met: /[@$!%*?&]/.test(password) },
  ];

  if (!password) return null; // Only show when user starts typing

  return (
    <div className="space-y-2 mt-2 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
      <p className="text-xs font-medium text-neutral-700">Password requirements:</p>
      <ul className="space-y-1.5">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
            )}
            <span className={cn(
              "transition-colors",
              req.met ? "text-emerald-600 line-through decoration-emerald-300" : "text-neutral-500"
            )}>
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
