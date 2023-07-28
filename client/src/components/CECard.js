/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import { createAppField } from "../constants/formFields"
import Input from "./Input"
import Select from "react-tailwindcss-select"
import { FormAction } from "./Form"
import { useNavigate } from "react-router-dom"
import { setApps } from "../features/userSlice"
import { useDispatch, useSelector } from "react-redux"


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
]

const CECard = ({ appId, setIsOpen }) => {
  const setProviders = (providers) => {
    const updatedProviders = options.filter((option) => {
      return providers.includes(option.value)
    })
    return updatedProviders
  }

  const [prov, setProv] = useState([])
  const [name, setName] = useState("")
  const token = useSelector((state) => state.user.token)
  const userId = useSelector((state) => state.user.id)
  const navigate = useNavigate()
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

  const getProviders = (prov) => {
    return prov.map((provider) => {
      return provider.value
    })
  }

  const handleSelectChange = (value) => {
    setProv(value)
  }

  const handleInputChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedProviders = getProviders(prov)
    const type = app.length === 0 ? "create" : "update"
    const method = type === "create" ? "PUT" : "PATCH"
    console.log(type)
    const response = await fetch(`http://localhost:5000/app/${type}`, {
      headers: { Authorization: token, "Content-Type": "application/json" },
      method: method,
      body: JSON.stringify({
        userId,
        appName: name,
        providers: updatedProviders,
        appId,
      }),
    })
    const data = await response.json()
    if (response.ok) {
      dispatch(setApps({ apps: data.apps }))
    } else {
      handleError(data.msg)
    }
    setName("")
    setProv(null)
    navigate("/")
    setIsOpen(false)
  }

  const handleCancel = () => {
    console.log("cancelling")
    setName("")
    setProv(null)
    setIsOpen(false)
  }

  const handleError = (errorMsg) => {
    console.log("From create card", errorMsg)
    //TO-DO: Add alert with data.msg
  }

  return (
    <div className="relative w-auto px-10  bg-slate-800 h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl ">
      <div className="flex justify-center w-full ">
        <form
          className=" bg-slate-800 transition-all ease  shadow-[rgba(20,_35,_90,_1)_0px_30px_90px] hover:shadow-[rgba(28,_100,_140,_1)_0px_30px_90px] my-7 space-y-6 border-2 border-indigo-300 px-8 py-3 rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold py-4 text-2xl text-slate-100">
            Application Details
          </h2>
          <div className=" text-white">
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
            <label htmlFor="" className="text-white">
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
