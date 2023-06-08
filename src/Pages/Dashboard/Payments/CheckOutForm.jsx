import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckOutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionID] = useState("");

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      // console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
    //
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    console.log("card", card);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError("Error: " + error.message);
    } else {
      setError("");
      console.log("payment Method", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
      setError("Error: " + confirmError.message);
      // setError(confirmError.message)
    }

    console.log("Payment info", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionID(paymentIntent.id);
      // TODO Nest Steps
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {error && (
        <div className="mt-5 w-full text-center">
          <span className="text-red-500">{error}</span>
        </div>
      )}
      {transactionId && (
        <div className="mt-5 w-full text-center">
          <span className="text-green-500">
            Transaction Complete with TransactionID: {transactionId}
          </span>
        </div>
      )}
      <div className="w-2/3 mx-auto">
        <button
          className="btn btn-warning text-white w-full mt-5"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default CheckOutForm;
