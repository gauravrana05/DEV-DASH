/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "../components/Card.js";
import Navbar from "../components/Navbar.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import CreateButton from "../components/CreateButton.js";
import CreateEditCard from "../components/CreateEditCard.js";
import { useDispatch, useSelector } from "react-redux";
import { setApps } from "../features/userSlice.js";

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
        `http://localhost:5000/app/getAll/${userId}`,
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
    element.scrollIntoView();
    element.scrollIntoView({
      behavior: "auto",
      block: "start",
      inline: "center",
    });
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
      <div className="mb-10">
        <h2
          className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          id="Heading"
        >
          Welcome to Dev-Dash
        </h2>
      </div>
      <CreateButton isOpen={isOpen} handleCreateButton={handleCreateButton} />
      {isOpen && <CreateEditCard setIsOpen={setIsOpen} appId={toUpdateAppId} />}
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
        </>
      )}
    </>
  );
}
