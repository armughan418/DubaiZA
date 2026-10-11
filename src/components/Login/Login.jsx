import "./Login.css";
import { Check, X } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = ({ setLogin, onAuthenticate }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const name = email.split("@")[0] || "User";
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
          <div className="login-right">
            <div className="right-text">
              <h1 id="login-heading">Welcome Back</h1>
              <p>Enter any details to continue</p>
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
                  <label htmlFor="login-email">Email or username</label>
                  <input
                    id="login-email"
                    name="email"
                    type="text"
                    placeholder="Enter anything"
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="Enter anything"
                  />
                </div>
              </div>
              <button className="auth-submit" type="submit">
                Log in
              </button>
              <p className="auth-demo-note">
                Demo sign-in · No account or password check
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
