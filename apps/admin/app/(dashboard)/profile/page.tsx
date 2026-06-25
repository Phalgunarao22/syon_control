"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import { Eye, EyeOff } from "lucide-react";
import { PasswordRequirements } from "@/components/password-requirements";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  
  const [name, setName] = useState(session?.user?.name || "");
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  if (isPending) return <div className="p-8">Loading profile...</div>;

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingName(true);
    setNameSuccess(false);

    try {
      await authClient.updateUser({ name });
      setNameSuccess(true);
      setIsEditingProfile(false); // Switch back to view mode on success
      setTimeout(() => setNameSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingPassword(true);
    setPasswordError("");
    setPasswordSuccess(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      setIsUpdatingPassword(false);
      return;
    }

    try {
      const { error } = await authClient.changePassword({
        newPassword,
        currentPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        setPasswordError(error.message || "Failed to update password");
      } else {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setTimeout(() => setPasswordSuccess(false), 3000);
      }
    } catch (err: any) {
      setPasswordError(err.message || "An error occurred");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="flex-1 p-8 pt-6 space-y-8 max-w-3xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Profile</h2>
        <p className="text-neutral-500 mt-1">Manage your account settings and update your password.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your basic profile information.</CardDescription>
          </div>
          {!isEditingProfile && (
            <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>
              Edit Profile
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {!isEditingProfile ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 border-b border-neutral-100 pb-4">
                <div className="text-sm font-medium text-neutral-500">Display Name</div>
                <div className="col-span-2 text-sm text-neutral-900">{session?.user?.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-neutral-100 pb-4">
                <div className="text-sm font-medium text-neutral-500">Email Address</div>
                <div className="col-span-2 text-sm text-neutral-900">{session?.user?.email}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm font-medium text-neutral-500">Role</div>
                <div className="col-span-2 text-sm text-neutral-900">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${session?.user?.role === 'SUPER_ADMIN' ? 'bg-violet-100 text-violet-700' : 'bg-neutral-100 text-neutral-700'}`}>
                    {session?.user?.role}
                  </span>
                </div>
              </div>
              {nameSuccess && <p className="text-green-600 text-sm mt-4">Profile updated successfully!</p>}
            </div>
          ) : (
            <form onSubmit={handleUpdateName} className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={session?.user?.email || ""} disabled className="bg-neutral-50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  autoFocus
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={isUpdatingName}>
                  {isUpdatingName ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setIsEditingProfile(false);
                  setName(session?.user?.name || ""); // Reset on cancel
                }} disabled={isUpdatingName}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input 
                  id="current-password" 
                  type={showCurrentPassword ? "text" : "password"} 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  required 
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input 
                  id="new-password" 
                  type={showNewPassword ? "text" : "password"} 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <PasswordRequirements password={newPassword} />
            </div>
            {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
            <Button type="submit" disabled={isUpdatingPassword}>
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </Button>
            {passwordSuccess && <p className="text-green-600 text-sm mt-2">Password updated successfully!</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
