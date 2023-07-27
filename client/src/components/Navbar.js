import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-purple-100 sticky top-0">
      <div className="mx-auto flex h-16 items-center gap-8 px-4">
        <Link className="block text-purple-600" to="/">
          <span className="sr-only">Home</span>
          <img
            alt=""
            className="h-8 w-8"
            src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
          />
        </Link>

        <div className="flex flex-1 items-center justify-between">
          <nav aria-label="Global">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-gray-900 transition hover:text-gray-500/75"
                  to="/"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="">
              <Link
                className=" rounded-md bg-purple-600 px-5 py-2 text-sm font-medium text-white  hover:bg-purple-700 "
                to="/login"
                onClick={() => {
                  localStorage.removeItem("id");
                  localStorage.removeItem("token");
                }}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
