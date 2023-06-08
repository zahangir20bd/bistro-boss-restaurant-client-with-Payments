import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItemsRow = ({ item, index }) => {
  const { _id, image, price, name } = item;
  const [, , refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once you delete, you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire(
              "Deleted!",
              "Your item has been deleted from Menu.",
              "success"
            );
          }
        });
        // fetch(`http://localhost:5000/carts/${id}`, {
        //   method: "DELETE",
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     refetch();
        //     if (data.deletedCount > 0) {
        //       Swal.fire(
        //         "Deleted!",
        //         "Your item has been deleted from cart.",
        //         "success"
        //       );
        //     }
        //   });
      }
    });
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div
              style={{ borderRadius: "0 200px 200px 200px" }}
              className="mask w-20 h-14"
            >
              <img src={image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td>
        <h4>{name}</h4>
      </td>
      <td className="text-end">${price.toFixed(2)}</td>
      <td className="text-center">
        <button onClick="" className="btn btn-warning text-white text-lg">
          <FaEdit />
        </button>
      </td>
      <td className="text-center">
        <button
          onClick={() => handleDelete(_id)}
          className="btn text-lg bg-red-600 border-none hover:bg-red-700"
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
};

export default ManageItemsRow;
