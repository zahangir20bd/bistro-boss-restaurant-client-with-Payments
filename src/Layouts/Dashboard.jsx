import React from "react";

import {
  FaBars,
  FaCalendarAlt,
  FaHome,
  FaIndent,
  FaShopify,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();

  // TODO
  // const isAdmin = true;
  const [isAdmin] = useAdmin();

  return (
    <div className="drawer drawer-mobile">
      <Helmet>
        <title>Bistro Boss | Dashboard</title>
      </Helmet>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-slate-100">
        {/* <!-- Page content here --> */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side bg-warning">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80">
          <div className="flex flex-col justify-center my-10">
            <span className="text-3xl uppercase font-serif font-bold">
              Bistro boss
            </span>
            <span
              className="text-2xl font-serif font-semibold"
              style={{ letterSpacing: "9px" }}
            >
              Restaurant
            </span>
          </div>
          {/* <img className="bg-warning w-36" src={logo} alt="" /> */}
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/Admin-home">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-items">
                  <FaUtensils /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-items">
                  <FaIndent /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-bookings">
                  <FaCalendarAlt /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-users">
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/user-home">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <FaCalendarAlt /> Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history">
                  <FaWallet /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mycart">
                  <FaShoppingCart /> My Cart
                  <span className="badge badge-ghost">
                    +{cart?.length || 0}
                  </span>
                </NavLink>
              </li>
            </>
          )}

          {/* divider */}
          <div className="divider"></div>

          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <FaBars /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/pizza">
              <FaShopify /> Order Food
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
