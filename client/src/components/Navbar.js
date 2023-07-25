export default function Navbar() {
  return (
    <header className="bg-purple-100">
      <div className="mx-auto flex h-16 items-center gap-8 px-4">
        <a className="block text-purple-600" href="/">
          <span className="sr-only">Home</span>
          <img
            alt=""
            className="h-8 w-8"
            src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
          />
        </a>

        <div class="flex flex-1 items-center justify-between">
          <nav aria-label="Global">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  class="text-gray-900 transition hover:text-gray-500/75"
                  href="/dashboard"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <div className="">
              <a
                className=" rounded-md bg-purple-600 px-5 py-2 text-sm font-medium text-white  hover:bg-purple-700 "
                href="/"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
