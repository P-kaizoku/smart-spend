import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen h-2vh max-w-3xl mx-auto border-r border-neutral-500 border-l pt-16">
      <section className="flex flex-col mt-40 items-center h-full  max-w-fit px-3 py-8 rounded-2xl border-4 border-neutral-400 mx-auto relative bg-white">
        {/* <div className="absolute inset-0 w-full h-full bg-[repeating-linear-gradient(135deg,transparent,transparent_40px,#555_40px,#777_45px)] pointer-events-none z-10"></div> */}
        <div className="bg-neutral-100/40 z-20 py-3 rounded-2xl flex justify-center items-center flex-col">
          <h1 className="font-bold text-[80px] max-w-xl text-center tracking-normal  leading-none font-coe z-20">
            Welcome to Smart Spend
          </h1>
          <p className="mt-4 text-neutral-500 text-lg text-center z-20">
            Manage your finances effortlessly with our intuitive platform.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="mt-4 px-4 py-2 bg-neutral-400 text-neutral-200 text-lg font-semibold text-center  rounded-lg"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
