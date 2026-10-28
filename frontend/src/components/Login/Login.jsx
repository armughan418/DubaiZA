import { useState } from "react";
import "../AuthModal.css";
import { Check, X } from "lucide-react";
import { apiRequest } from "../../lib/api";
import { toast } from "react-hot-toast";

const Login = ({ setLogin, onAuthenticate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setIsSubmitting(true);
    try {
      const result = await apiRequest("/auth/login", {
        method: "POST",
        body: {
          email: String(form.get("email") || "").trim(),
          password: String(form.get("password") || ""),
        },
      });
      onAuthenticate(result);
    } catch (loginError) {
      toast.error(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div
        className="modal-overlay"
        onMouseDown={(event) =>
          event.target === event.currentTarget && setLogin(false)
        }
      >
        <div
          className="modal-box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-heading"
        >
          <button
            className="cross-icon"
            type="button"
            aria-label="Close sign in"
            onClick={() => setLogin(false)}
          >
            <X size={24} />
          </button>
          <div className="auth-mobile-header" aria-hidden="true">
            <span className="auth-mobile-logo">D</span>
            <span className="auth-mobile-brand">DubaiZA</span>
          </div>
          <div className="login-left">
            <p>D</p>
            <div className="left-text">
              <h1>
                Welcome to
                <br />
                DubaiZA
              </h1>
              <span>
                The #1 marketplace in the UAE for Cars, Property, Jobs, and
                more.
              </span>
            </div>
            <div className="left-tags">
              {["Verified Sellers", "Secure Chat", "Smart AI Search"].map(
                (label) => (
                  <div className="tag" key={label}>
                    <span>
                      <Check size={20} />
                    </span>
                    <h5>{label}</h5>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="login-right">
            <div className="right-text">
              <h1 id="login-heading">Welcome Back</h1>
              <p>Sign in to manage your DubaiZA account</p>
            </div>
            <h5>
              <span>Continue with email</span>
            </h5>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <div className="input-box">
                  <label htmlFor="login-email">Email</label>
                  <input
                    autoComplete="email"
                    id="login-email"
                    name="email"
                    required
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="login-password">Password</label>
                  <input
                    autoComplete="current-password"
                    id="login-password"
                    minLength={8}
                    name="password"
                    required
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <button className="auth-submit" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Signing in..." : "Log in"}
              </button>
              <p className="auth-demo-note">
                Your account and listings are stored securely.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
