import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

/* TO-DO: ADD CUSTOM STYLE */
const Spinner = ({ loading }) => {
  return (
    <div className="flex justify-center mt-10 bg-slate-300 h-screen w-full">
      <ClipLoader
        color={"#9333ea"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Spinner;
