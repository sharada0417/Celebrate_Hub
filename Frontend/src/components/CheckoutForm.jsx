import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CheckoutForm = ({ bookingId }) => {
  const { getToken } = useAuth();

  const fetchClientSecret = useCallback(
    async () => {
      const token = await getToken();
      // Add timeout to fetch to prevent infinite hang
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      try {
        const res = await fetch(`${BACKEND_URL}/api/payments/create-checkout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingId }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          const text = await res.text();
          throw new Error("Failed to create checkout session: " + text);
        }

        const data = await res.json();
        return data.client_secret; // Changed to match new backend response format
      } catch (err) {
        clearTimeout(timeoutId);
        throw err;
      }
    },
    [bookingId, getToken] // include bookingId and getToken
  );

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;