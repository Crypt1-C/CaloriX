import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { api, setAuthToken } from "../api/http";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (isSignUp) {
        await api<{ message: string }>("/api/auth/register", {
          method: "POST",
          body: { name, email, password },
        });
        // After signup, log in automatically
      }
      const res = await api<{ token: string; message: string }>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      if (res?.token) setAuthToken(res.token);
      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err?.message || "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6" onClick={onClose}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl p-8 shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-[var(--muted-foreground)] hover:text-[var(--beige)] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl text-[var(--beige)] mb-2" style={{ fontWeight: 700 }}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-[var(--muted-foreground)] mb-8">
                {isSignUp ? 'Start your culinary journey' : 'Sign in to access your recipes'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {isSignUp && (
                  <div>
                    <label className="block text-sm text-[var(--beige)] mb-2">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-[rgba(26,58,46,0.3)] border border-[var(--glass-border)] rounded-xl text-[var(--beige)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--orange)] transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm text-[var(--beige)] mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[rgba(26,58,46,0.3)] border border-[var(--glass-border)] rounded-xl text-[var(--beige)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--orange)] transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[var(--beige)] mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[rgba(26,58,46,0.3)] border border-[var(--glass-border)] rounded-xl text-[var(--beige)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--orange)] transition-all"
                    placeholder="Enter your password"
                  />
                </div>

                {error && (
                  <div className="text-sm text-[var(--orange)]">
                    {error}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[var(--orange)] text-[var(--black)] rounded-xl hover:shadow-xl hover:shadow-[rgba(255,107,53,0.3)] transition-all"
                  style={{ fontWeight: 600 }}
                >
                  {submitting ? 'Please wait…' : isSignUp ? 'Create Account' : 'Sign In'}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError(null);
                  }}
                  className="text-[var(--muted-foreground)] hover:text-[var(--orange)] transition-colors"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
