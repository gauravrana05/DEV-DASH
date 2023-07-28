import { useDispatch, useSelector } from "react-redux";
import { setApps } from "../features/userSlice";

export default function Card({ appName, providers, appId, editApp }) {
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const deleteApp = async () => {
    const response = await fetch("http://localhost:5000/app/delete", {
      headers: { Authorization: token, "Content-Type": "application/json" },
      method: "DELETE",
      body: JSON.stringify({
        userId,
        appId,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      dispatch(setApps({ apps: data.apps }));
    } else {
      handleError(data.msg);
    }
  };

  const handleError = (errorMsg) => {
    console.log("From card", errorMsg);
    //TO-DO: Add alert with data.msg
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="card w-80 bg-gray-200 text-orange-100 p-4 m-2 rounded  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
        <div className="card-body h-72">
          <div className=" flex float-right p-0  gap-2 ">
            <button
              className="px-2 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 "
              onClick={() => editApp(appId)}
            >
              <svg
                width="24"
                stroke-width="1.5"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M8 10H16M8 6H12M8 14H11"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
              </svg>
            </button>
            <button
              className=" px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              onClick={() => deleteApp()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
          <h2 className="card-title font-bold py-4 text-2xl text-indigo-600">
            {appName}
          </h2>
          <p className="text-lg text-gray-800"></p>

          {providers.map((item) => {
            return (
              <div className="card-actions inline-flex  mx-2 my-3" key={item}>
                <span className="border-2 rounded-full bg-white text-indigo-600 px-2 py-1 shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
                  {" "}
                  {item}{" "}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
