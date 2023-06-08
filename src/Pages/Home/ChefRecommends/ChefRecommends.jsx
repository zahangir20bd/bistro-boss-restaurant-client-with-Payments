import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../Shared/FoodCard/FoodCard";

const ChefRecommends = () => {
  const [menu] = useMenu();
  const chefRecommends = menu.filter((item) => item.category === "offered");

  return (
    <div className="mt-32 mb-20 ">
      <SectionTitle
        subHeading={"Should Try"}
        heading={"Chef Recommends"}
      ></SectionTitle>
      <div className="mt-20  grid gap-10 grid-cols- md:grid-cols-2 lg:grid-cols-3">
        {chefRecommends.map((item) => (
          <FoodCard key={item._id} item={item}></FoodCard>
        ))}
      </div>
    </div>
  );
};

export default ChefRecommends;
