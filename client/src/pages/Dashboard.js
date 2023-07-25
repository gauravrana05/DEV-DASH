/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "../components/Card.js";
import Navbar from "../components/Navbar.js";
import HomePage from "./Home.js";
import { Navigate, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getApps = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
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
        setApps(data.apps);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("from dashboard", error);
    }
  };

  const handleError = (errorMsg) => {
    //TO-DO: Add alert with data.msg
    if (errorMsg === "Invalid Token" || "Access  Denied" || "Token Expired") {
      navigate("/login");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getApps();
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <>{/* TO-DO: ADD SPINNER LOADING COMPONENT AND EFFECTS */}</>
      ) : (
        <>
          {apps.length === 0 ? (
            <HomePage />
          ) : (
            <div className="flex justify-center flex-wrap">
              {apps.map((app) => {
                return (
                  <Card
                    name={app.appName}
                    description="Video streaming application"
                    providers={app.provider}
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
