import { useState } from "react";
import { Link } from "react-router-dom"

export default function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
  const handleCreateButton = () => {
    setIsOpen(current => !current);
  }

  return (
    <>
      <div className="mb-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Dev-Dash
        </h2>

        <div className="flex justify-center mt-9">
          <Link
            to="#_"
            onClick={handleCreateButton}
            className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
          >
            <span class="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="relative">Create Application</span>
          </Link>
        </div>
        { isOpen && (
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
        </div> )}
      </div>
    </>
  )
}
