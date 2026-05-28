import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotState, setForgotState] = useState<"idle" | "sending" | "sent">("idle");

  const handleForgot = async () => {
    setForgotState("sending");
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { method: "POST" });
      setForgotState("sent");
      setTimeout(() => setForgotState("idle"), 4000);
    } catch {
      setForgotState("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      navigate("/admin");
    } catch {
      setError("Could not reach server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-[#555] hover:text-white transition-colors mb-10"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          Back to portfolio
        </button>

        {/* Card */}
        <div className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#7B5CF6]/10 flex items-center justify-center mb-5">
              <Lock className="w-5 h-5 text-[#7B5CF6]" />
            </div>
            <p className="text-xs font-semibold tracking-widest text-[#555] uppercase mb-1">
              Admin
            </p>
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-sm text-[#555] mt-1">Access the blog editor</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-xs text-[#555] uppercase tracking-wider block mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  placeholder="your username"
                  className="w-full bg-[#141414] border border-white/[0.07] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#7B5CF6]/50 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-[#555] uppercase tracking-wider block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-[#141414] border border-white/[0.07] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#7B5CF6]/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#888] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#7B5CF6] hover:bg-[#6B4EF0] disabled:opacity-60 text-white font-medium py-3 rounded-xl transition-all duration-200 group mt-2"
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
            </button>

            {/* Forgot password */}
            <button
              type="button"
              onClick={handleForgot}
              disabled={forgotState !== "idle"}
              className="w-full text-xs text-[#444] hover:text-[#888] disabled:opacity-60 transition-colors py-1"
            >
              {forgotState === "sending"
                ? "Sending..."
                : forgotState === "sent"
                ? "✓ Credentials sent to itsmustafashafique@gmail.com"
                : "Forgot password? Send credentials to email"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
