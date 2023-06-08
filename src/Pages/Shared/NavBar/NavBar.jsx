import { Link } from "react-router-dom";
import logo from "../../../assets/icon/menu-logo.png";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();

  const listItems = (
    <>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/pizza">Order Food</Link>
      </li>
      <li>
        <Link to="/dashboard/mycart">
          <span className="flex items-center gap-px">
            <FaShoppingCart className="text-2xl" />
            <div className="badge badge-warning">+{cart?.length || 0}</div>
          </span>
        </Link>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        //
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="fixed z-10 container navbar bg-black bg-opacity-50 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow  bg-black bg-opacity-50 rounded-box w-52"
            >
              {listItems}
            </ul>
          </div>
          <Link className="btn btn-ghost normal-case">
            <div className="flex flex-col items-start text-white">
              <span className="text-2xl uppercase font-serif font-bold">
                Bistro boss
              </span>
              <span
                className="text-md font-serif"
                style={{ letterSpacing: "10.3px" }}
              >
                Restaurant
              </span>
            </div>
            {/* <img className="w-36" src={logo} alt="" /> */}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{listItems}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-2">
              <img className="w-12 rounded-full" src={user.photoURL} alt="" />
              <button onClick={handleLogOut} className="btn btn-ghost">
                Log Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
