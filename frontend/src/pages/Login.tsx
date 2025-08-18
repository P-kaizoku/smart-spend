import React from "react";
import AuthForm from "../components/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen h-2vh max-w-3xl mx-auto border-r border-neutral-500 border-l pt-16 flex justify-center items-center">
      <section className=" ">
        <AuthForm AuthProps={{ type: "login" }} />
      </section>
    </div>
  );
};

export default Login;
