import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="featuredImage bg-fixed text-white my-28 ">
      <div className="w-full h-full bg-black bg-opacity-50 pt-8">
        <SectionTitle
          subHeading="Check it Out"
          heading="Featured Item"
        ></SectionTitle>
        <div className="md:flex justify-center items-center mt-20 pb-20 px-36">
          <div>
            <img src={featuredImage} alt="" />
          </div>
          <div className="md:ms-10">
            <p>May 22, 2024</p>
            <h2 className="text-2xl uppercase my-3">Where can I get some?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              adipisci ex eum explicabo dolores nostrum est suscipit ratione
              autem maxime animi, deleniti tempora sequi reprehenderit sed
              necessitatibus eligendi rerum molestias placeat nisi beatae facere
              veniam perspiciatis. Vitae deserunt corporis vero officia, in ipsa
              soluta omnis ab voluptatem, iste, beatae ducimus?
            </p>
            <button className="btn btn-outline btn-warning border-0 border-b-2 mt-5">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
