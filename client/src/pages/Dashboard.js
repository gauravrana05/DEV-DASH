/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "../components/Card.js";
import Navbar from "../components/Navbar.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.js";
import CECard from "../components/CECard.js";
import { useDispatch, useSelector } from "react-redux";
import { setApps } from "../features/userSlice.js";
import { Transition } from "@headlessui/react";
import Footer from "../components/Footer.js";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toUpdateAppId, setToUpdateAppId] = useState("");
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  let apps = useSelector((state) => state.user.apps);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getApps = async () => {
    try {
      const response = await fetch(
        `https://dev-dash-bur4.onrender.com/app/getAll/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        handleError(data.msg);
      } else {
        dispatch(setApps({ apps: data.apps }));
      }
      setIsLoading(false);
    } catch (error) {
      console.log("from dashboard", error);
    }
  };

  const editApp = async (appId) => {
    setToUpdateAppId(appId);
    var element = document.getElementById("Heading");
    element.scrollIntoView()
    element.scrollIntoView({
      behavior: "auto",
      block: "start",
      inline: "center",
    })
    setIsOpen(true);
  };

  const handleError = (errorMsg) => {
    //TO-DO: Add alert with data.msg
    if (errorMsg === "Invalid Token" || "Access  Denied" || "Token Expired") {
      console.log("reached here because of", errorMsg);
      navigate("/login");
    }
  };

  const handleCreateButton = () => {
    setToUpdateAppId("");
    setIsOpen((current) => !current);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!token || token.size === 0) {
      console.log("navigating because of this");
      navigate("/login");
    } else {
      getApps();
    }
  }, []);

  return (
    <>
      <Navbar />
      <section id= "Heading" className="px-2 py-24 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className=" pb-2 block xl:inline">
                    Bring your Data{" "}
                  </span>
                  <span className="block text-indigo-600 xl:inline">
                    and Make Sense of It.
                  </span>
                </h1>
                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                  <strong className="text-black">DevDash.</strong> provides you
                  an all in one display of all your applications. Bring all your
                  apps and showcase them with us.
                </p>
                <div className="relative flex justify-center sm:justify-normal sm:space-x-4">
                  <button
                    onClick={handleCreateButton}
                    className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
                  >
                    <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
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
                    <span className="relative">
                      {isOpen ? "Close" : "Create"} Application
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div  className="w-full md:w-1/2 h-96">
              <div   className=" w-full  overflow-visible rounded-md shadow-xl sm:rounded-xl ">
                <Transition
                  show={!isOpen}
                  enter="transition-opacity ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-0"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="bg-gray-900 rounded-xl">
                    <img
                      className=" opacity-70 rounded-xl"
                      src="https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                      alt=""
                    />
                  </div>
                </Transition>
                <Transition
                  show={isOpen}
                  enter="transition-opacity ease-linear duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-0"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <CECard setIsOpen={setIsOpen} appId={toUpdateAppId} />
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className=" shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]  w-9/12 h-1 border-1 border-black m-auto" />

      {isLoading ? (
        <div className="flex justify-center ">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <>
          {apps.length === 0 ? (
            ""
          ) : (
            <div className="flex justify-center flex-wrap">
              {apps.map((app) => {
                return (
                  <Card
                    key={app._id}
                    appId={app._id}
                    appName={app.appName}
                    providers={app.providers}
                    editApp={editApp}
                  />
                );
              })}
            </div>
          )}
          <Footer />
        </>
      )}
    </>
  );
}
