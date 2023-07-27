import React from "react";

const CreateEditCard = ({ isOpen, appName = "", providers = [] }) => {
  return (
    <div>
      {isOpen && (
        <div classsName="flex justify-center mt-10">
          <div className="  card w-80 bg-gray-200 text-orange-100 p-4 m-2 rounded  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <div className="card-body">
              <h2 className="card-title font-bold py-4 text-2xl text-purple-600">
                Create
              </h2>
              <p className="text-lg text-gray-800"></p>

              <div className="card-actions inline-flex  mx-2 my-3">
                <span className="border-2 rounded-full bg-white text-purple-600 px-2 py-1 shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
                  {" "}
                  I am bahubali{" "}
                </span>
              </div>
            </div>
          </div>
          <hr className="mt-5" />
        </div>
      )}
    </div>
  );
};

export default CreateEditCard;
