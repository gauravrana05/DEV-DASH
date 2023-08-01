import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <header className="bg-purple-100 sticky top-0 z-50">
      <section className="w-full px-8 text-gray-700 bg-white">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-col md:flex-row">
            <Link
              to="#_"
              className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
              <span className="mx-auto text-2xl font-black leading-none text-gray-900 select-none">
                DevDash<span className="text-indigo-600">.</span>
              </span>
            </Link>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
              <Link
                href="#_"
                className="mr-5 text-xl font-bold leading-6 text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link className="mr-5 cursor-not-allowed font-medium leading-6 text-gray-600">
                Features
              </Link>
              <Link className="mr-5 cursor-not-allowed font-medium leading-6 text-gray-600">
                About
              </Link>
              <Link className="mr-5 cursor-not-allowed font-medium leading-6 text-gray-600">
                Contact
              </Link>
            </nav>
          </div>

          <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={() => {
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                dispatch(logout);
              }}
            >
              Logout
            </Link>
          </div>
        </div>
      </section>

    </header>
  );
}
