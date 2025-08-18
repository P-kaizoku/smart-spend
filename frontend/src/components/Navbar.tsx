import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Features",
      path: "/features",
    },
  ];

  const navigate = useNavigate();

  return (
    <nav className="fixed inset-x-0 border-b border-neutral-500 top-0 max-w-3xl  mx-auto p-4 ">
      <div className=" flex justify-between items-center">
        <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 to-neutral-500 cursor-default">
          SS
        </h1>
        <ul className="flex gap-3 items-center">
          {navLinks.map((link, i) => {
            return (
              <li
                className="cursor-pointer hover:text-neutral-700 text-[16px] tracking-wide "
                key={i}
                onClick={() => navigate(link.path)}
              >
                {link.name}
              </li>
            );
          })}
          <li
            className="cursor-pointer hover:bg-neutral-500 text-[16px] tracking-wide  bg-neutral-400 px-2 py-1 rounded-lg"
            key={"getstarted"}
            onClick={() => navigate("/signup")}
          >
            Get started
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
