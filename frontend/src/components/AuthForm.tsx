import { useNavigate } from "react-router-dom";

type AuthProps = {
  type: "login" | "signup";
};

const AuthForm = ({ AuthProps }: { AuthProps: AuthProps }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col  items-center justify-center  bg-transparent shadow-md rounded-lg relative overflow-hidden border border-neutral-700">
      <div className="absolute inset-0 w-full h-full bg-[repeating-linear-gradient(135deg,transparent,transparent_40px,#555_40px,#777_45px)] pointer-events-none z-10"></div>
      <h1 className="text-4xl font-coe mb-8 mt-4 z-20 bg-neutral-300/90 px-6 py-4">
        {AuthProps.type === "login" ? "Login" : "Sign Up"}
      </h1>
      <form className="flex flex-col space-y-4 p-4 mx-6 z-20">
        <input
          className="border border-gray-300 p-2 rounded bg-neutral-200"
          type="email"
          placeholder="Email"
          required
        />
        <input
          className="border border-gray-300 p-2 rounded bg-neutral-200"
          type="password"
          placeholder="Password"
          required
        />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          {AuthProps.type === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 z-20 bg-neutral-200 w-full px-4 py-5">
        {AuthProps.type === "login" ? (
          <>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
