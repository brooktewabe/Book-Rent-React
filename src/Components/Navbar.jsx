import { useState, useEffect, useRef } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { CiLogout, CiViewList  } from "react-icons/ci";
import { MdOutlineAccountCircle,  } from "react-icons/md";
import { useNavigate, NavLink } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { GoUpload } from "react-icons/go";
import Cookies from "js-cookie";
import axios from "../axiosInterceptor";
import book from "../assets/blue-book.jpg";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const sidebarRef = useRef(null);
  const linkClass = ({ isActive }) => (isActive ? "text-[#3b82f6]" : "");
  const role = localStorage.getItem("role");

  const adminMenu = [
    {
      icon: <BiSolidDashboard  size={25} className="mr-4" />,
      text: "Dashboard",
      link: "/",
      className: { linkClass },
    },
    {
      icon: <GoUpload size={25} className="mr-4" />,
      text: "Book Upload",
      link: "/add-book",
      className: { linkClass },
    },
    {
      icon: <CiViewList size={25} className="mr-4" />,
      text: "Books",
      link: "/books",
      className: { linkClass },
    },
    {
      icon: <AiOutlineUser size={25} className="mr-4" />,
      text: "Owners",
      link: "/owners",
      className: { linkClass },
    },
  ];

  const userMenu = [
    {
      icon: <BiSolidDashboard  size={25} className="mr-4" />,
      text: "Dashboard",
      link: "/",
      className: { linkClass },
    },
    {
      icon: <GoUpload size={25} className="mr-4" />,
      text: "Book Upload",
      link: "/add-book",
      className: { linkClass },
    },
    {
      icon: <CiViewList size={25} className="mr-4" />,
      text: "Books",
      link: "/books",
      className: { linkClass },
    },
    {
      icon: <AiOutlineUser size={25} className="mr-4" />,
      text: "Owners",
      link: "/owners",
      className: { linkClass },
    },
  ];

  const handleOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setNav(false);
    }
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/profile/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      Cookies.remove("userId");
      Cookies.remove("jwt");
      localStorage.removeItem("role");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const storedId = Cookies.get("userId");
  const value = storedId ? `/account/${storedId}` : "/";

  if (role !== "admin" && role !== "book_owner") {
    return null;
  }

  return (
    <div className="max-w-[1940px] mx-auto flex justify-between items-center p-1 shadow-md bg-[#f0f2ff] fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer text-">
          <AiOutlineMenu size={30} />
        </div>

        <NavLink to="/">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 text-[#1198f1] font-bold">
            Book Rent
          </h1>
        </NavLink>
      </div>

      {nav && (
        <div className="bg-black/80 fixed w-full h-screen z-60 top-0 left-0"></div>
      )}

      <div
        ref={sidebarRef}
        className={
          nav
            ? "fixed top-0 left-0 w-[270px] h-screen bg-[#100920] z-70 duration-300 rounded-lg"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-blue-950 z-70 duration-300 rounded-lg"
        }
      >
        <div className="bg-[#120927] rounded-t-xl">
          <div className="flex items-center space-x-4 ml-4">
            <img src={book} width={30} height={30} alt="Book" />
            <br /><br />
            <p className="text-2xl text-blue-500">Book Rent</p>
          </div>
        </div>
        <nav>
          <ul className="flex flex-col p-4 text-white">
            {role === "book_owner" &&
              userMenu.map(({ icon, text, link }, index) => (
                <div key={index} className="py-4">
                  <NavLink
                    to={link}
                    className={linkClass}
                    onClick={() => setNav(false)}
                  >
                    <li className="text-xl flex  rounded-lg cursor-pointer w-[95%] mx-auto hover:bg-[#1198f1]">
                      {icon} {text}
                    </li>
                  </NavLink>
                </div>
              ))}
            {role === "admin" &&
              adminMenu.map(({ icon, text, link }, index) => (
                <div key={index} className="py-4">
                  <NavLink
                    to={link}
                    className={linkClass}
                    onClick={() => setNav(false)}
                  >
                    <li className="text-xl flex cursor-pointer w-[95%] mx-auto hover:bg-[#1e40af]">
                      {icon} {text}
                    </li>
                  </NavLink>
                </div>
              ))}
            <div className="py-4">
              <NavLink to={value} className={linkClass} onClick={() => setNav(false)}>
                <li className="text-xl flex cursor-pointer w-[95%] mx-auto hover:bg-[#1198f1]">
                  <MdOutlineAccountCircle size={30} className="mr-4" /> My Profile
                </li>
              </NavLink>
            </div>
          </ul>
        </nav>
        <div className="absolute bottom-10 left-10 ">
          <button className=" hover:bg-[#1198f1] px-5 bg-slate-700 flex items-center text-white" onClick={handleLogout}>
            <CiLogout size={30} className="mr-4" /> Logout&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
