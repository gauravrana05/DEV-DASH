/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { createAppField } from "../constants/formFields";
import Input from "./Input";
import Select from "react-tailwindcss-select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { providerOptions } from "../constants/providerOptions";
import { createUpdateAppUtil } from "../utils/utils";

const CECard = ({ appId, setIsOpen }) => {
  const options = providerOptions;

  const setProviders = (providers) => {
    const updatedProviders = options.filter((option) => {
      return providers.includes(option.value);
    });
    return updatedProviders;
  };

  const getProviders = (prov) => {
    return prov.map((provider) => {
      return provider.value;
    });
  };

  const [prov, setProv] = useState([]);
  const [name, setName] = useState("");
  const token = useSelector((state) => state.user.token);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProviders = getProviders(prov);
    const type = app.length === 0 ? "create" : "update";
    await createUpdateAppUtil(
      type,
      { appName: name, providers: updatedProviders },
      token,
      appId,
      dispatch,
      navigate
    );
    setName("");
    setProv(null);
    setIsOpen(false);
  };

  return (
    <div className="  relative w-auto px-10 bg-slate-800 h-auto overflow-visible rounded-md shadow-xl sm:rounded-xl ">
      <div className="flex justify-center w-full  overflow-visible">
        <form
          className=" w-80 overflow-visible bg-slate-800 transition-all ease  shadow-[rgba(20,_35,_90,_1)_0px_30px_90px] hover:shadow-[rgba(28,_100,_140,_1)_0px_30px_90px] my-7 space-y-6 border-2 border-indigo-300 px-8 py-3 rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold py-4 text-2xl text-slate-100">
            Application Details
          </h2>
          <div className=" text-white">
            <Input
              key={createAppField.id}
              handleChange={(e) => setName(e.target.value)}
              labelText={createAppField.labelText}
              labelFor={createAppField.labelFor}
              value={name}
              id={createAppField.id}
              name={createAppField.name}
              type={createAppField.type}
              isRequired={createAppField.isRequired}
              placeholder={createAppField.placeholder}
            />
            <label htmlFor="" className="text-white">
              Choose Providers
            </label>
            <Select
              value={prov}
              isMultiple
              onChange={(value) => setProv(value)}
              options={options}
            />
          </div>
          <span>
            <button
              className="group relative w-52 m-auto rounded-xl flex justify-center py-2 px-4 border border-transparent text-sm font-medium  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-10"
              onSubmit={handleSubmit}
            >
              Save
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default CECard;
