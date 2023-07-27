import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

/* TO-DO: ADD CUSTOM STYLE */
const Spinner = ({ loading }) => {
  return (
    <div>
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
