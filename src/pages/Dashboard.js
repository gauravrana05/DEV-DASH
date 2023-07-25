import Navbar from "../components/Navbar.js"

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div class="card w-96 bg-purple-400 text-orange-100 p-4 m-2 rounded  shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
            <div class="card-body">
            <div class=" float-right p-0   ">
              <button class=" px-2 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </button>
              <button class=" px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
              <h2 class="card-title">Title</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">dsfadsf</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
