import { useState } from "react";
import "../AuthModal.css";
import { Check, X } from "lucide-react";
import { apiRequest } from "../../lib/api";
import { toast } from "react-hot-toast";

const Register = ({ setRegister, setLogin }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setIsSubmitting(true);
    try {
      await apiRequest("/auth/register", {
        method: "POST",
        body: {
          fullName: String(form.get("name") || "").trim(),
          email: String(form.get("email") || "").trim(),
          password: String(form.get("password") || ""),
        },
      });
      toast.success("Account created. Please log in.");
      setRegister(false);
      setLogin(true);
    } catch (registerError) {
      toast.error(registerError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div
        className="modal-overlay"
        onMouseDown={(event) =>
          event.target === event.currentTarget && setRegister(false)
        }
      >
        <div
          className="modal-box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="register-heading"
        >
          <button
            className="cross-icon"
            type="button"
            aria-label="Close registration"
            onClick={() => setRegister(false)}
          >
            <X size={24} />
          </button>
          <div className="auth-mobile-header" aria-hidden="true">
            <span className="auth-mobile-logo">D</span>
            <span className="auth-mobile-brand">DubaiZA</span>
          </div>
          <div className="register-left">
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
          <div className="register-right">
            <div className="right-text">
              <h1 id="register-heading">Create Account</h1>
              <p>Join DubaiZA to buy and sell across the UAE</p>
            </div>
            <h5>
              <span>Register with email</span>
            </h5>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <div className="input-box">
                <label htmlFor="register-name">Full name</label>
                <input
                  autoComplete="name"
                  id="register-name"
                  maxLength={80}
                  minLength={2}
                  name="name"
                  required
                  type="text"
                  placeholder="Your full name"
                />
                </div>
                <div className="input-box">
                <label htmlFor="register-email">Email</label>
                <input
                  autoComplete="email"
                  id="register-email"
                  name="email"
                  required
                  type="email"
                  placeholder="you@example.com"
                />
                </div>
                <div className="input-box">
                <label htmlFor="register-password">Password</label>
                <input
                  autoComplete="new-password"
                  id="register-password"
                  maxLength={72}
                  minLength={8}
                  name="password"
                  required
                  type="password"
                  placeholder="At least 8 characters"
                />
                </div>
              </div>
              <button
                className="auth-submit"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
              <p className="auth-demo-note">
                Your password is encrypted before it is stored.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
