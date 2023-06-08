import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import useMenu from "../../../hooks/useMenu";
import ManageItemsRow from "./ManageItemsRow";

const ManageItems = () => {
  const [menu] = useMenu();
  return (
    <div className="mt-10">
      <SectionTitle subHeading="Hurry Up" heading="Manage All Items" />
      <Helmet>
        <title>Bistro Boss | Manage Items</title>
      </Helmet>
      <div className="overflow-x-auto w-full px-3">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg">#</th>
              <th className="text-lg">Image</th>
              <th className="text-lg">Item Name</th>
              <th className="text-lg text-end">Price</th>
              <th className="text-lg text-center">Update</th>
              <th className="text-lg text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <ManageItemsRow
                key={item._id}
                item={item}
                index={index}
              ></ManageItemsRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
