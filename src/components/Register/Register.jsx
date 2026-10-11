import "./Register.css";
import { Check, X } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Register = ({ setRegister, onAuthenticate }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim() || "User";
    const email = String(form.get("email") || "").trim();
    onAuthenticate({ name, email, provider: "Email" });
  };

  const continueWith = (provider) => {
    onAuthenticate({
      name: provider === "Google" ? "Google User" : "Apple User",
      email:
        provider === "Google"
          ? "google.user@example.com"
          : "apple.user@example.com",
      provider,
    });
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
              <div className="tag">
                <span>
                  <Check size={20} />
                </span>
                <h5>Verified Sellers</h5>
              </div>
              <div className="tag">
                <span>
                  <Check size={20} />
                </span>
                <h5>Secure Chat</h5>
              </div>
              <div className="tag">
                <span>
                  <Check size={20} />
                </span>
                <h5>Smart AI Search</h5>
              </div>
            </div>
          </div>
          <div className="register-right">
            <div className="right-text">
              <h1 id="register-heading">Create Account</h1>
              <p>Join DubaiZA to buy and sell across the UAE</p>
            </div>
            <div className="social-btn">
              <button
                className="google"
                type="button"
                onClick={() => continueWith("Google")}
              >
                <FcGoogle size={20} aria-hidden="true" />
                Continue with Google
              </button>
              <button
                className="apple"
                type="button"
                onClick={() => continueWith("Apple")}
              >
                <FaApple size={20} aria-hidden="true" />
                Continue with Apple
              </button>
            </div>
            <h5>
              <span>Or continue with</span>
            </h5>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <div className="input-box">
                  <label htmlFor="register-name">Full name</label>
                  <input
                    id="register-name"
                    name="name"
                    type="text"
                    placeholder="Enter any name"
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="register-email">Email</label>
                  <input
                    id="register-email"
                    name="email"
                    type="text"
                    placeholder="Enter anything"
                  />
                </div>
              </div>
              <button className="auth-submit" type="submit">
                Create account
              </button>
              <p className="auth-demo-note">
                Demo registration · No account details are saved
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
