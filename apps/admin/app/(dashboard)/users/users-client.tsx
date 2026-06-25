"use client";

import React, { useState } from "react";
import { createAdmin, deleteAdmin, revokeAdminSession } from "../../actions";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Card, CardContent } from "@workspace/ui/components/card";
import { ChevronDown, ChevronRight, Monitor, Globe } from "lucide-react";

export function UsersClient({ initialUsers, currentUserId }: { initialUsers: any[], currentUserId: string }) {
  const [users, setUsers] = useState(initialUsers);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    
    try {
      await createAdmin(formData);
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to create admin");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this admin?")) return;
    try {
      await deleteAdmin(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRevokeSession = async (userId: string, sessionId: string) => {
    if (!confirm("Are you sure you want to revoke this session?")) return;
    try {
      await revokeAdminSession(sessionId);
      setUsers(users.map(u => {
        if (u.id === userId) {
          return { ...u, sessions: u.sessions.filter((s: any) => s.id !== sessionId) };
        }
        return u;
      }));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const toggleRow = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Create New Admin</h3>
          <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="john@syon.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select 
                id="role" 
                name="role" 
                className="flex h-10 w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Admin"}
            </Button>
          </form>
          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
          <p className="text-xs text-neutral-500 mt-3">New admins are assigned the default password "password" and must change it on first login.</p>
        </CardContent>
      </Card>

      <div className="rounded-md border border-neutral-200 overflow-hidden bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
            <tr>
              <th className="px-6 py-3 font-medium w-8"></th>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <tr 
                  className={`hover:bg-neutral-50/50 cursor-pointer transition-colors ${expandedUserId === user.id ? 'bg-neutral-50/80' : ''}`}
                  onClick={() => toggleRow(user.id)}
                >
                  <td className="px-6 py-4">
                    {expandedUserId === user.id ? (
                      <ChevronDown className="w-4 h-4 text-neutral-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-neutral-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-900">{user.name}</td>
                  <td className="px-6 py-4 text-neutral-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${user.role === 'SUPER_ADMIN' ? 'bg-violet-100 text-violet-700' : 'bg-neutral-100 text-neutral-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.forcePasswordChange ? (
                      <span className="text-amber-600 text-xs font-medium">Pending Setup</span>
                    ) : (
                      <span className="text-emerald-600 text-xs font-medium">Active</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.id !== currentUserId && (
                      <button 
                        onClick={(e) => handleDelete(user.id, e)}
                        className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
                {expandedUserId === user.id && (
                  <tr className="bg-neutral-50/50 border-t-0">
                    <td colSpan={6} className="px-6 py-4 pt-0">
                      <div className="pl-8 py-4 border-l-2 border-neutral-200 ml-4">
                        <h4 className="text-sm font-semibold text-neutral-900 mb-3">Active Sessions ({user.sessions?.length || 0})</h4>
                        {user.sessions?.length > 0 ? (
                          <div className="grid gap-3">
                            {user.sessions.map((session: any) => (
                              <div key={session.id} className="flex items-center justify-between bg-white p-3 rounded-md border border-neutral-200 shadow-sm">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-sm text-neutral-900 font-medium">
                                    <Monitor className="w-4 h-4 text-neutral-400" />
                                    {session.userAgent ? session.userAgent.split(' ')[0] : 'Unknown Device'}
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                                    <Globe className="w-3 h-3" />
                                    {session.ipAddress || 'Unknown IP'} • Started {new Date(session.createdAt).toLocaleDateString()}
                                  </div>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleRevokeSession(user.id, session.id)}
                                >
                                  Revoke
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-neutral-500">No active sessions for this user.</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
