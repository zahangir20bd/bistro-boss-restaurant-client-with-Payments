import { useQuery } from "@tanstack/react-query";
import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const updateRole = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update the user Role?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: `User Role has been Changed`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  return (
    <div className="mt-5">
      <Helmet>
        <title>Bistro Boss || All Users</title>
      </Helmet>
      <SectionTitle subHeading="view users" heading="All Users"></SectionTitle>
      <div className="p-2">
        <h2 className="text-2xl font-bold uppercase">
          Total Users: {users.length}
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th className="text-center">ROLE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text-center">
                    <button
                      onClick={() => updateRole(user)}
                      className="btn btn-warning text-2xl text-white"
                    >
                      {user.role === "admin" ? <FaUserShield /> : <FaUsers />}
                    </button>
                  </td>
                  <td>
                    <button className="btn bg-red-600 hover:bg-red-700 border-none text-2xl text-white">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
