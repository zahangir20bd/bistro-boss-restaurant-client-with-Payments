import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <section className="mb-12 mt-28">
      <SectionTitle
        subHeading="Popular Items"
        heading="From Our Menu"
      ></SectionTitle>
      <div className="grid grid-cols-1 mx-2 lg:mx-16 md:grid-cols-2 gap-10 mt-20">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/menu">
          <button className="btn btn-outline btn-warning border-0 border-b-2 mt-5">
            View Full Menu
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PopularMenu;
