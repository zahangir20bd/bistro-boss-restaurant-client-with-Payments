import React from "react";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import Cover from "../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, coverImg }) => {
  return (
    <div>
      {title && <Cover img={coverImg} title={title}></Cover>}
      <div className="grid grid-cols-1 mx-2 lg:mx-16 md:grid-cols-2 gap-10 mt-20">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to={`/order/${title}`}>
          <button className="btn btn-outline btn-warning border-0 border-b-2 mt-5">
            Order Your Favorite Food
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
