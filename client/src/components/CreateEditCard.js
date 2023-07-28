/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { createAppField } from "../constants/formFields";
import Input from "./Input";
import Select from "react-tailwindcss-select";
import { FormAction } from "./Form";
import { useNavigate } from "react-router-dom";
import { setApps } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const options = [
  { value: "Google", label: "Google" },
  { value: "Spotify", label: "Spotify" },
  { value: "Quora", label: "Quora" },
  { value: "Binance", label: "Binance" },
  { value: "Twitter", label: "Twitter" },
  { value: "Instagram", label: "Instagram" },
  { value: "Tinder", label: "Tinder" },
  { value: "Bumble", label: "Bumble" },
  { value: "Bybit", label: "Bybit" },
  { value: "Facebook", label: "Facebook" },
];

const CreateEditCard = ({ appId, setIsOpen }) => {
  const setProviders = (providers) => {
    const updatedProviders = options.filter((option) => {
      return providers.includes(option.value);
    });
    return updatedProviders;
  };

  const [prov, setProv] = useState([]);
  const [name, setName] = useState("");
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((state) => {
    return state.user.apps.filter((app) => app._id === appId);
  });
  const setInitialState = () => {
    if (app.length === 0) {
      setName("");
      setProv([]);
    } else {
      setName(app[0].appName);
      setProv(setProviders(app[0].providers));
    }
  };

  useEffect(() => {
    setInitialState();
  }, [appId]);

  const getProviders = (prov) => {
    return prov.map((provider) => {
      return provider.value;
    });
  };

  const handleSelectChange = (value) => {
    setProv(value);
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProviders = getProviders(prov);
    const type = app.length === 0 ? "create" : "update";
    const method = type === "create" ? "PUT" : "PATCH";
    console.log(type);
    const response = await fetch(`http://localhost:5000/app/${type}`, {
      headers: { Authorization: token, "Content-Type": "application/json" },
      method: method,
      body: JSON.stringify({
        userId,
        appName: name,
        providers: updatedProviders,
        appId,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setApps({ apps: data.apps }));
    } else {
      handleError(data.msg);
    }
    setName("");
    setProv(null);
    navigate("/");
    setIsOpen(false);
  };

  const handleCancel = () => {
    console.log("cancelling");
    setName("");
    setProv(null);
    setIsOpen(false);
  };

  const handleError = (errorMsg) => {
    console.log("From create card", errorMsg);
    //TO-DO: Add alert with data.msg
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="">
        <div className="  card w-80 bg-gray-200 text-orange-100 p-4 m-2 rounded  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="card-body">
            <h2 className="card-title  text-center font-bold py-4 text-2xl text-purple-600">
              Create your Application
            </h2>
            <div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="-space-y-px">
                  <Input
                    key={createAppField.id}
                    handleChange={handleInputChange}
                    labelText={createAppField.labelText}
                    labelFor={createAppField.labelFor}
                    value={name}
                    id={createAppField.id}
                    name={createAppField.name}
                    type={createAppField.type}
                    isRequired={createAppField.isRequired}
                    placeholder={createAppField.placeholder}
                  />
                  <label htmlFor="" className="text-purple-600">
                    Choose Providers
                  </label>
                  <Select
                    value={prov}
                    isMultiple
                    onChange={handleSelectChange}
                    options={options}
                  />
                </div>
                <span>
                  <FormAction
                    text="Cancel"
                    action="button"
                    onSubmit={handleCancel}
                  />
                  <FormAction text="Save" onSubmit={handleSubmit} />
                </span>
              </form>
            </div>
          </div>

          <div></div>
        </div>
        <hr className="mt-5" />
      </div>
    </div>
  );
};

export default CreateEditCard;
