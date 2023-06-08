import React from "react";

const MenuItem = ({ item }) => {
  const { image, price, recipe, name } = item;
  return (
    <div className="flex items-center space-x-4">
      <img
        style={{ borderRadius: "0 200px 200px 200px" }}
        className="w-[100px] h-[80px]"
        src={image}
        alt=""
      />
      <div>
        <h1 className="uppercase">{name} -----------------</h1>
        <p>{recipe}</p>
      </div>
      <p className="text-yellow-500">${price}</p>
    </div>
  );
};

export default MenuItem;
