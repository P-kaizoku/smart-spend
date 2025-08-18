import React from "react";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  return (
    <div className="min-h-screen h-2vh max-w-3xl mx-auto border-r border-neutral-500 border-l pt-16 flex justify-center items-center">
      <section className=" ">
        <AuthForm AuthProps={{ type: "signup" }} />
      </section>
    </div>
  );
};

export default Signup;
