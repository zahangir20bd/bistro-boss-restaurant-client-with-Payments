import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imageHostingToken = import.meta.env.VITE_Image_Upload_Token;
// console.log(imageHostingToken);

const AddItems = () => {
  const [axiosSecure] = useAxiosSecure();
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(imageHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((resData) => {
        // console.log(resData);
        if (resData.success) {
          const imgUrl = resData.data.display_url;
          // console.log(imgUrl);
          const { name, price, category, recipe } = data;
          const newItem = {
            name,
            price: parseFloat(price),
            category,
            recipe,
            image: imgUrl,
          };
          console.log(newItem);
          axiosSecure.post("/menu", newItem).then((data) => {
            console.log("data after posting", data.data);
            if (data.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Menu Item added Successfully",
                showConfirmButton: false,
                timer: 1600,
              });
              reset();
            }
          });
        }
      });
  };
  // console.log(errors);

  return (
    <div className="mt-10">
      <SectionTitle
        subHeading="What's new?"
        heading="Add an Item"
      ></SectionTitle>
      <Helmet>
        <title>Bistro Boss | Add Items</title>
      </Helmet>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-10/12 mx-auto bg-slate-200 my-10 border-2"
      >
        <div className="form-control w-full p-20 mx-auto">
          <label className="label">
            <span className="label-text font-semibold">Recipe name*</span>
          </label>
          <input
            type="text"
            placeholder="Recipe name"
            {...register("name", { required: true, maxLength: 120 })}
            className="input input-bordered w-full"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-3">
            <span>
              <label className="label">
                <span className="label-text font-semibold">Category*</span>
              </label>
              <select
                defaultValue="Pick one"
                className="select select-bordered w-full"
                {...register("category", { required: true })}
              >
                <option disabled>Pick one</option>
                <option>pizza</option>
                <option>salad</option>
                <option>soup</option>
                <option>dessert</option>
                <option>drinks</option>
              </select>
            </span>
            <span>
              <label className="label">
                <span className="label-text font-semibold">Price*</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </span>
          </div>

          <label className="label">
            <span className="label-text font-semibold">Recipe Details*</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-36"
            placeholder="Recipe Details"
            {...register("recipe", { required: true })}
          ></textarea>
          <div className="my-3">
            <label className="label">
              <span className="label-text font-semibold">Recipe Image*</span>
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-ghost bg-[#b9b4b42f] w-full max-w-xs"
            />
          </div>
          <input
            type="submit"
            value="Add Item"
            className="btn btn-warning text-white font-bold mt-2"
          />
        </div>
      </form>
    </div>
  );
};

export default AddItems;
