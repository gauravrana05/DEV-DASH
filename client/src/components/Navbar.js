export default function Navbar() {
  return (
    <header class="bg-white">
      <div class="mx-auto flex h-16 items-center gap-8 px-4">
        <a class="block text-purple-600" href="/">
          <span class="sr-only">Home</span>
          <img
            alt=""
            className="h-8 w-8"
            src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
          />
        </a>

        <div class="flex flex-1 items-center justify-between">
          <nav aria-label="Global">
            <ul class="flex items-center gap-6 text-sm">
              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="/"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <div class="">
              <a
                class=" rounded-md bg-purple-600 px-5 py-2 text-sm font-medium text-white  hover:bg-purple-700 "
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
