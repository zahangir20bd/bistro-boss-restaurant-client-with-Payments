import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="md:w-3/12 mx-auto text-center">
      <p className="text-warning mb-2">--- {subHeading} ---</p>
      <h3 className="text-3xl font-sans border-y-4 border-gray-300 py-5 uppercase">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
