import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, ArrowLeft, LogIn } from "lucide-react";

interface LoginProps {
  onBack?: () => void;
  onLoginSuccess: () => void;
}

const Login = ({ onBack, onLoginSuccess }: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Replace with actual authentication
    if (username === 'admin' && password === 'admin') {
      onLoginSuccess();
    } else {
      alert('Invalid credentials. Use admin/admin for demo.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-xl backdrop-blur-md">
          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Portfolio
            </button>
          )}

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-400 text-sm">
              Sign in to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-400 transition-all"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-slate-800/60 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-400 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button (centered) */}
            <div className="flex justify-center pt-4">
              <motion.button
                type="submit"
                className="w-36 text-white bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Sign In
                <LogIn className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
