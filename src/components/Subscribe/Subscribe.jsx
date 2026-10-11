import { useState } from "react";
import "./Subscribe.css";
import { ArrowRight, Check } from "lucide-react";

const Subscribe = () => {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="newsletter-band">
      <div className="newsletter-copy">
        <span>DubaiZA updates</span>
        <h2>Subscribe to our Newsletter</h2>
        <p>The latest deals, news, and updates sent straight to your inbox.</p>
      </div>
      <form
        className="newsletter-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubscribed(true);
        }}
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Your email address"
          required
          onChange={() => setSubscribed(false)}
        />
        <button type="submit">
          {subscribed ? (
            <>
              Subscribed <Check size={17} />
            </>
          ) : (
            <>
              Subscribe <ArrowRight size={17} />
            </>
          )}
        </button>
        {subscribed && (
          <p className="newsletter-status" role="status">
            Thanks for subscribing.
          </p>
        )}
      </form>
    </section>
  );
};

export default Subscribe;
