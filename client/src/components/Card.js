import { useDispatch, useSelector } from "react-redux";
import { EditIcon, DeleteIcon } from "../utils/Icons";
import { deleteAppUtil } from "../utils/utils";
import { deleteApp } from "../features/userSlice";

export default function Card({ appName, providers, appId, editApp }) {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className=" card w-80 text-orange-100 p-4 m-2 rounded  shadow-[5px_5px_0px_0px_rgba(109,40,217)] bg-pattern  bg-slate-800" >
        <div className="card-body h-96">
          <div className=" flex float-right p-0  gap-2 ">
            <button
              className="px-2 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 "
              onClick={() => editApp(appId)}
            >
              <EditIcon />
            </button>
            <button
              className=" px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              onClick={async () => {
                const response = await deleteAppUtil(appId, token);
                if (response.ok) {
                  dispatch(deleteApp(appId));
                }
              }}
            >
              <DeleteIcon />
            </button>
          </div>
          <h2 className="card-title font-bold py-8 px-5 text-2xl text-white ">
            {appName}
          </h2>
          <p className="text-lg text-gray-800"></p>

          {providers.map((item) => {
            return (
              <div className="card-actions inline-flex  mx-2 my-3" key={item}>
                <span className="border-2 rounded-lg font-bold bg-white text-indigo-600 px-2 py-1 shadow-[1px_1px_3px_2px_#edf2f7]">
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
