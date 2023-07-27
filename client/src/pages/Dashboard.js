/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "../components/Card.js";
import Navbar from "../components/Navbar.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import CreateButton from "../components/CreateButton.js";
import CreateEditCard from "../components/CreateEditCard.js";

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
      navigate("/");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getApps();
  }, []);

  const handleCreateButton = () => {
    setIsOpen((current) => !current);
  };

  return (
    <>
      <Navbar />
      <div className="mb-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Dev-Dash
        </h2>
      </div>
      <CreateButton handleCreateButton={handleCreateButton} />
      <CreateEditCard isOpen={isOpen} />
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : (
        <>
          {apps.length === 0 ? (
            ""
          ) : (
            <div className="flex justify-center flex-wrap">
              {apps.map((app) => {
                return <Card name={app.appName} providers={app.providers} />;
              })}
            </div>
          )}
        </>
      )}
    </>
  );
}
