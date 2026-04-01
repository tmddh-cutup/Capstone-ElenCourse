"use client";

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Mail, Lock, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  const [gender, setGender] = useState<"male" | "female" | "other" | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 relative overflow-hidden py-10">
      {/* Decorative background blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Centered Panel */}
      <div className="relative z-10 w-full max-w-[480px] bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 sm:p-10 m-4">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Create Account</h1>
          <p className="text-sm text-slate-500 mt-2 text-center">Join ElenCourse and start your personalized learning journey today.</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Nickname</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Elene Kim" 
                className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                placeholder="ellen@example.com" 
                className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                required
              />
            </div>
            <p className="text-xs text-slate-400 mt-1 pl-1">Verification is not required for the demo, but use a real email for future recovery.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                required
                minLength={8}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Age</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="number" 
                  min={5}
                  max={100}
                  placeholder="16" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Gender Widget */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Gender</label>
              <div className="flex bg-slate-50/50 border border-slate-200 rounded-xl p-1 h-[48px]">
                {(["male", "female", "other"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 text-xs font-semibold rounded-lg transition-all mx-0.5 capitalize ${
                        gender === g 
                          ? "bg-white text-primary shadow-sm ring-1 ring-slate-900/5" 
                          : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                      }`}
                  >
                    {g === "other" ? "N/A" : g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full py-6 text-[15px] font-semibold rounded-xl shadow-lg shadow-primary/20 mt-4">
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center text-[15px] text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
