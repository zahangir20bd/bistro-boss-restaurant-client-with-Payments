import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Parallax } from "react-parallax";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import backgroundImage from "../../../assets/home/chef-service.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <section className="mb-24">
      <SectionTitle
        subHeading={"From 11.00am to 10.00pm"}
        heading={"Order Online"}
      ></SectionTitle>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        // centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-28 mt-20"
      >
        <SwiperSlide>
          <img className="w-full mx-auto" src={slide2} alt="" />
          <p className="text-4xl text-center -mt-10 text-white font-serif uppercase">
            Pizza
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full mx-auto" src={slide1} alt="" />
          <p className="text-4xl  text-center w-full -mt-10 text-white font-serif uppercase">
            Salads
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full mx-auto" src={slide3} alt="" />
          <p className="text-4xl text-center -mt-10 text-white font-serif uppercase">
            Soup
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full mx-auto" src={slide4} alt="" />
          <p className="text-4xl text-center -mt-10 text-white font-serif uppercase">
            Desserts
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full mx-auto" src={slide5} alt="" />
          <p className="text-4xl text-center -mt-10 text-white font-serif uppercase">
            Drinks
          </p>
        </SwiperSlide>
      </Swiper>

      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={backgroundImage}
        bgImageAlt="the dog"
        strength={-200}
      >
        <div className="hero h-[500px]">
          <div className="hero-overlay h-1/2 w-8/12 bg-white"></div>
          <div className="text-center ">
            <div className="w-3/5 mx-auto">
              <h1 className="mb-5 text-3xl font-bold font-serif">
                Bistro Boss
              </h1>
              <p className="mb-5">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Similique alias rerum odio, delectus sequi optio rem recusandae
                deleniti libero distinctio dolores? Repellendus laboriosam sequi
                delectus maxime est soluta saepe magni non dolorum quod.
              </p>
            </div>
          </div>
        </div>
      </Parallax>

      <div className="w-full bg-black mt-32">
        <h3 className="text-3xl text-center text-white py-20 font-serif font-bold">
          Call Us: +88 01611391706
        </h3>
      </div>
    </section>
  );
};

export default Category;
