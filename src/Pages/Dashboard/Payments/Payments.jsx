import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import useCart from "../../../hooks/useCart";

// TODO Provide Pk Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payments = () => {
  const [cart] = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total);

  return (
    <div className="mt-10">
      <Helmet>
        <title>Bistro Boss | Payments</title>
      </Helmet>
      <SectionTitle
        subHeading="Please Process"
        heading="Payment"
      ></SectionTitle>
      <div className="w-1/2 mx-auto mt-20">
        <Elements stripe={stripePromise}>
          <CheckOutForm price={price} />
        </Elements>
      </div>
    </div>
  );
};

export default Payments;
