import "./Subscribe.css";
import { ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

const Subscribe = () => {
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
          toast.success("Thanks for subscribing.");
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
        />
        <button type="submit">
          Subscribe <ArrowRight size={17} />
        </button>
      </form>
    </section>
  );
};

export default Subscribe;
