/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import { createAppField } from "../constants/formFields"

import Select from "react-tailwindcss-select"
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { providerOptions } from "../constants/providerOptions"
import { createUpdateAppUtil } from "../utils/utils"
import { createApp, updateApp } from "../features/userSlice"
import { toast } from "react-toastify"

const CECard = ({ appId, setIsOpen }) => {
  const options = providerOptions

  const setProviders = (providers) => {
    const updatedProviders = options.filter((option) => {
      return providers.includes(option.value)
    })
    return updatedProviders
  }

  const getProviders = (prov) => {
    return prov.map((provider) => {
      return provider.value
    })
  }

  const [nameLen, setNameLen] = useState(0)
  const [prov, setProv] = useState([])
  const [name, setName] = useState("")
  const token = useSelector((state) => state.user.token)
  // const navigate = useNavigate();
  const dispatch = useDispatch()
  const app = useSelector((state) => {
    return state.user.apps.filter((app) => app._id === appId)
  })
  const setInitialState = () => {
    if (app.length === 0) {
      setName("")
      setProv([])
    } else {
      setName(app[0].appName)
      setProv(setProviders(app[0].providers))
    }
  }

  useEffect(() => {
    setInitialState()
  }, [appId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedProviders = getProviders(prov)
    const type = app.length === 0 ? "create" : "update"
    const response = await createUpdateAppUtil(
      type,
      { appName: name, providers: updatedProviders },
      token,
      appId
    )
    if (response.ok) {
      if (type === "create") {
        dispatch(createApp(response.data))
      } else {
        dispatch(updateApp(response.data.app))
      }
    }
    setName("")
    setProv(null)
    setIsOpen(false)
  }

  return (
    <div className="  bg-pattern relative w-auto px-10 bg-slate-800 h-auto overflow-visible rounded-md shadow-xl sm:rounded-xl ">
      <div className="flex justify-center w-full  overflow-visible">
        <form
          className=" w-80 overflow-visible bg-slate-800 transition-all ease  shadow-[rgba(20,_35,_90,_1)_0px_30px_90px] hover:shadow-[rgba(28,_100,_140,_1)_0px_30px_90px] my-7 space-y-6 border-2 border-indigo-300 px-8 py-3 rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold py-4 text-2xl text-slate-100">
            Application Details
          </h2>
          <div className=" text-white">
            <div className="mt-10 relative">
              <label
                for={createAppField.labelFor}
                className="block mb-2 text-white"
              >
                {createAppField.labelText}
              </label>
              <input
                onChange={(e) => {
                  setNameLen(e.target.value.length)
                  if (nameLen <= 25) {
                    setName(e.target.value)
                  }
                  else{
                    toast("App name too long");
                  }
                }}
                value={name}
                required={createAppField.isRequired}
                id={createAppField.id}
                name={createAppField.name}
                type={createAppField.type}
                className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                placeholder={createAppField.placeholder}
              />
            </div>
            <label for="" className="text-white">
              Choose Tech Stack
            </label>

            <Select
              value={prov}
              isMultiple
              onChange={(value) => setProv(value)}
              options={options}
              placeholder="Search..."
              searchInputPlaceholder="Search"
              isSearchable={true}
              required
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
  )
}

export default CECard
