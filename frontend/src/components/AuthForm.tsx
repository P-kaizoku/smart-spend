import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthProps = {
  type: "login" | "signup";
};

const AuthForm = ({ AuthProps }: { AuthProps: AuthProps }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const baseUrl = "http://localhost:3000";

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (AuthProps.type === "login") {
      try {
        const response = await axios.post(
          `${baseUrl}/api/auth/login`,
          userData
        );
        if (response.status === 201) {
          throw new Error("Login failed");
        }

        // Handle login response
        console.log("Login successful:", response.data);
        console.log(response);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      // Handle signup logic here
      try {
        const response = await axios.post(
          `${baseUrl}/api/auth/signup`,
          userData
        );
        console.log("Signup successful:", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } catch (error) {
        console.error("Signup failed:", error);
      }
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center  bg-transparent shadow-md rounded-lg relative overflow-hidden border border-neutral-700">
      <div className="absolute inset-0 w-full h-full bg-[repeating-linear-gradient(135deg,transparent,transparent_40px,#555_40px,#777_45px)] pointer-events-none z-10"></div>
      <h1 className="text-4xl font-coe mb-8 mt-4 z-20 bg-neutral-300/90 px-6 py-4">
        {AuthProps.type === "login" ? "Login" : "Sign Up"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 p-4 mx-6 z-20"
      >
        {AuthProps.type === "signup" && (
          <input
            className="border border-gray-300 p-2 rounded bg-neutral-200"
            type="text"
            placeholder="username"
            required
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        )}
        <input
          className="border border-gray-300 p-2 rounded bg-neutral-200"
          type="email"
          placeholder="Email"
          required
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          className="border border-gray-300 p-2 rounded bg-neutral-200"
          type="password"
          placeholder="Password"
          required
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          {AuthProps.type === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 z-20 bg-neutral-200 w-full px-4 py-5 text-center">
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
