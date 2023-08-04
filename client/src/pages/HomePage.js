import { Link } from "react-router-dom"

export default function SignupPage() {
  return (
    <div className=" bg-texture w-full h-auto">
      <div className=" p-10">
        <Link to="#_" className="flex mx-16 font-medium">
          <span className=" text-3xl font-black leading-none text-white select-none">
            DevDash<span className="text-white">.</span>
          </span>
        </Link>
      </div>
      <div className="w-6/12 m-36">
        <h1 className=" text-6xl font-bold text-emerald-400">
          Developer Dashboard
        </h1>
        <p className="m-8 text-blue-200 font-bold text-xl ">
          Here we present you the most dynamic website for all your apps, the
          dashboard is a single place to store all your apps, with all the
          providers of the particular application.
        </p>
        <div className="inline-flex w-full justify-end">
          <Link
            to="/signup"
            class=" mx-3 relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-gray-600"
          >
            <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-500 via-gray-800 to-black"></span>
            <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-90 translate-x-24 bg-gray-500 rounded-full opacity-30 group-hover:rotate-0 ease"></span>
            <span class="text-lg relative text-emerald-400 font-bold">Register</span>
          </Link>

          <Link
            to="/login"
            class=" mx-3 relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-gray-600"
          >
            <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-500 via-gray-800 to-black"></span>
            <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-90 translate-x-24 bg-gray-500 rounded-full opacity-30 group-hover:rotate-0 ease"></span>
            <span class="text-lg relative text-emerald-400 font-bold">Login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
