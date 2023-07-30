import { Link } from "react-router-dom";

export function FormAction({
  type = "Button",
  action = "submit",
  text,
  disabled = false,
}) {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          disabled={disabled}
          className={
            "group relative w-52 m-auto rounded-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium  text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10 disabled:cursor-not-allowed"
          }
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

export function FormExtra({ setRemember }) {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          onClick={() => setRemember((prev) => !prev)}
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-sm text-gray-900"
        >
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <Link
          to={"/forgot-password"}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
