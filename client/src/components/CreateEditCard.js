import React, { useState } from "react"
import { createAppField } from "../constants/formFields"
import Input from "./Input"
import Select from "react-tailwindcss-select"
import { FormAction } from "./Form"

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

const CreateEditCard = ({ isOpen, appName = "", providers = [] }) => {
  const [prov, setProv] = useState(null)

  const handleChange = (value) => {
    console.log("value:", value)
    setProv(value)
  }


  const handleSubmit= (value) => {
    console.log("value:", value)
  }

  return (
    <div className="flex justify-center mt-10">
      {isOpen && (
        <div classsName="">
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
                handleChange={handleChange}
                value={createAppField.id}
                labelText={createAppField.labelText}
                labelFor={createAppField.labelFor}
                id={createAppField.id}
                name={createAppField.name}
                type={createAppField.type}
                isRequired={createAppField.isRequired}
                placeholder={createAppField.placeholder}
              />
              <Select
                value={prov}
                isMultiple
                onChange={handleChange}
                options={options}
              />
                  </div>

                  <FormAction text="Save" />
                </form>
              </div>
              
            </div>

            <div>
              
            </div>
          </div>
          <hr className="mt-5" />
        </div>
      )}
    </div>
  )
}

export default CreateEditCard
