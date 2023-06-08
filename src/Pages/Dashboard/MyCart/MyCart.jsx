import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import MyCartRow from "./MyCartRow";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart] = useCart();
  const total = cart.reduce((sum, item) => item.price + sum, 0).toFixed(2);
  return (
    <div className="mt-12 mb-3">
      <Helmet>
        <title>Bistro Boss | My Cart</title>
      </Helmet>
      <SectionTitle
        className="w-1/2"
        subHeading="My Cart"
        heading="Wanna Add More?"
      ></SectionTitle>
      <div className="uppercase flex justify-evenly items-center mt-10 mb-5">
        <h2 className="text-2xl font-bold">Total Items: {cart.length}</h2>
        <h2 className="text-2xl font-bold">Total Price: ${total}</h2>
        <Link to="/dashboard/payments">
          <button className="btn btn-warning btn-sm font-bold">Pay</button>
        </Link>
      </div>

      {/* cart data in table view */}

      <div className="overflow-x-auto w-full px-3">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg">#</th>
              <th className="text-lg">Image</th>
              <th className="text-lg">Item Name</th>
              <th className="text-lg text-end">Price</th>
              <th className="text-lg text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <MyCartRow key={item._id} item={item} index={index}></MyCartRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
