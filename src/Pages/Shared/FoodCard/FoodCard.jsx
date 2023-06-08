import React, { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { image, price, recipe, name, _id } = item;
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (item) => {
    if (user && user.email) {
      const cartItem = {
        foodId: _id,
        name,
        image,
        price,
        email: user.email,
      };

      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${name} added to cart`,
              showConfirmButton: false,
              timer: 1600,
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      Swal.fire({
        title: "Please Login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto rounded-none">
      <figure>
        <img src={image} alt="Food Image" />
      </figure>
      <p className="bg-slate-950 text-white absolute right-0 mt-5 mr-5 px-3 rounded">
        ${price}
      </p>
      <div className="card-body ">
        <h2 className="text-2xl font-semibold text-center">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-center">
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-outline btn-warning bg-gray-100 border-0 border-b-2 mt-5"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
