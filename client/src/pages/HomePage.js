import { Link, useNavigate } from "react-router-dom"

export default function SignupPage() {
  const navigate = useNavigate()

  const handleClick = (route) => {
    navigate(route)
    console.log(route)
  }

  return (
    <div className=" bg-texture w-full h-screen ">
      <div className=" p-10">
      <Link to="#_" className="flex mx-16 font-medium">
        <span className=" text-3xl font-black leading-none text-white select-none">
          DevDash<span className="text-white">.</span>
        </span>
      </Link>
      </div>
      <div className="w-6/12 m-36">

        <h1 className=" text-6xl font-bold text-emerald-400">Developer Dashboard</h1>
        <p className="m-8 text-blue-200 font-bold text-xl ">
              Suno bhai ye website kisi kaam ki nhi h, pr phir bhi tere pas 
              bohot time h, kuch kaam nhi h to aaja, register yourself clicking the 
              button below or login using the other button.
            </p>
           <div className="inline-flex w-full justify-end">

            <Link
            to="/signup"
            className=" mx-5 px-4 p-2 text-lg rounded-lg text-white font-semibold text-center  bg-gray-700 transition-all hover:bg-gray-900 focus:outline-none"
            >
                Register
            </Link>
            <Link
            to="/login"
            className=" mx-5 px-4 p-2 text-lg rounded-lg text-white font-semibold text-center  bg-gray-700 transition-all hover:bg-gray-900 focus:outline-none"
            >
                Login
            </Link>
            </div>
      </div>
    </div>
  )
}
