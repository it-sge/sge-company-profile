"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="h-screen flex relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-light" />
      
      {/* Decorative floating orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-sky/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* LEFT PANEL - Branding (desktop only) */}
      <div className="hidden lg:flex lg:w-[55%] relative z-10 flex-col justify-between p-10 xl:p-14">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/logo/logo.png"
            alt="Sun Global Energi"
            width={280}
            height={112}
            className="w-48 xl:w-56 h-auto drop-shadow-2xl"
            priority
          />
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center max-w-lg">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-gold" />
              <span className="text-gold font-medium text-sm tracking-[0.2em] uppercase">Admin Portal</span>
            </div>
            <h1 className="text-white font-heading font-bold text-3xl xl:text-5xl leading-tight">
              Powering a<br />
              <span className="text-gold">Sustainable</span><br />
              Future
            </h1>
            <p className="text-white/60 text-sm xl:text-base leading-relaxed max-w-sm">
              Manage your solar energy projects, monitor performance, and drive sustainable growth from one dashboard.
            </p>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="flex-shrink-0 flex items-center gap-8 xl:gap-12">
          <div>
            <div className="text-gold font-heading font-bold text-xl xl:text-2xl">EPC</div>
            <div className="text-white/40 text-xs tracking-wider uppercase mt-1">Engineering</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <div className="text-gold font-heading font-bold text-xl xl:text-2xl">O&M</div>
            <div className="text-white/40 text-xs tracking-wider uppercase mt-1">Operations</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <div className="text-gold font-heading font-bold text-xl xl:text-2xl">FIN</div>
            <div className="text-white/40 text-xs tracking-wider uppercase mt-1">Financing</div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Login Form */}
      <div className="w-full lg:w-[45%] relative z-10 flex items-center justify-center px-5 py-6">
        <div className="w-full max-w-[400px]">

          {/* Card - navy-light tone, fits palette */}
          <div className="bg-navy-light/80 border border-white/[0.06] rounded-2xl p-6 sm:p-8 shadow-2xl">
            
            {/* Logo inside card */}
            <div className="flex justify-center mb-5">
              <Image
                src="/logo/logo.png"
                alt="Sun Global Energi"
                width={180}
                height={72}
                className="w-36 sm:w-40 h-auto"
                priority
              />
            </div>

            {/* Header text */}
            <div className="text-center mb-6">
              <h2 className="text-white font-heading font-bold text-xl sm:text-2xl">
                Welcome Back
              </h2>
              <p className="mt-1 text-white/40 text-sm">
                Sign in to your admin dashboard
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2.5 rounded-lg text-sm text-center flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-white/50 text-xs font-medium tracking-wider uppercase mb-1.5">
                  Email Address
                </label>
                <div className={`relative rounded-lg transition-all duration-300 ${
                  focused === 'email' 
                    ? 'ring-2 ring-gold/40' 
                    : ''
                }`}>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Mail className={`w-4 h-4 transition-colors duration-300 ${
                      focused === 'email' ? 'text-gold' : 'text-white/25'
                    }`} />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    required
                    className="w-full bg-navy border border-white/[0.08] rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:bg-navy-dark focus:border-gold/30 transition-all duration-300"
                    placeholder="admin@sunglobal.co.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-white/50 text-xs font-medium tracking-wider uppercase mb-1.5">
                  Password
                </label>
                <div className={`relative rounded-lg transition-all duration-300 ${
                  focused === 'password' 
                    ? 'ring-2 ring-gold/40' 
                    : ''
                }`}>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Lock className={`w-4 h-4 transition-colors duration-300 ${
                      focused === 'password' ? 'text-gold' : 'text-white/25'
                    }`} />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full bg-navy border border-white/[0.08] rounded-lg pl-10 pr-11 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:bg-navy-dark focus:border-gold/30 transition-all duration-300"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/25 hover:text-gold transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="relative w-full mt-1 group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold to-gold-light rounded-lg blur opacity-25 group-hover:opacity-45 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy-dark font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
              <p className="text-white/20 text-xs">
                Protected access · Sun Global Energi © {new Date().getFullYear()}
              </p>
            </div>
          </div>

          {/* Mobile bottom tagline */}
          <div className="lg:hidden mt-4 text-center">
            <p className="text-white/25 text-xs tracking-widest uppercase">
              Innovate a Better Avenir
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
