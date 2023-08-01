const fixedInputClass =
  "rounded-md appearance-none relative disabled:cursor-not-allowed block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
  disabled = false,
}) {
  return (
    <div className="my-5">
      <label className="block mb-2 text-indigo-500" htmlFor={labelFor}>
        {labelText}
      </label>
      <input
        onChange={handleChange}
        className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
        type={type}
        name={name}
        required={isRequired}
        // placeholder={placeholder}
        disabled={disabled}
      />

      {/* <label htmlFor={labelFor} className="sr-only text-purple-600">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className={fixedInputClass + customClass}
        placeholder={placeholder}
        disabled={disabled}
      /> */}
    </div>
  )
}
