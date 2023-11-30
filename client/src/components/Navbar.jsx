import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";
import Button from "./ui/Button";
import Logo from "../assets/logo-icon-default.svg";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "./ProfileMenu";

const Navbar = ({ textColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  return (
    <>
      <nav className="relative flex justify-between items-center">
        <Link to="/">
          <div className="flex gap-4 items-center ">
            <img src={Logo} alt="Atlas Estate Logo" />
            <span className={`text-xl font-medium leading-none ${textColor}`}>
              Atlas Estate
            </span>
          </div>
        </Link>

        <div
          className="cursor-pointer lg:hidden block blueGradient p-2 rounded-lg"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <FaX size={20} className="text-white" />
          ) : (
            <FaBars size={20} className="text-white" />
          )}
        </div>

        <div className="lg:flex hidden gap-6">
          <a href="" className={`${textColor}`}>
            Add Property
          </a>
          <NavLink to="/properties" className={`${textColor}`}>
            Properties
          </NavLink>
          <a href="" className={`${textColor}`}>
            Contact
          </a>
        </div>

        <div className="lg:block hidden">
          {isAuthenticated ? (
            <ProfileMenu user={user} logout={logout} />
          ) : (
            <div>
              <a href="" className={`mr-6 ${textColor}`}>
                Register
              </a>
              <Button title="Login" onClick={loginWithRedirect} />
            </div>
          )}
        </div>

        <div
          className={`absolute right-0 top-10 w-40 bg-white p-4 rounded-lg blue-shadow z-50 ${
            isOpen ? "block" : "hidden"
          } `}
        >
          <div className="flex flex-col items-center gap-5">
            <a href="" className="text-black">
              Add Property
            </a>
            <a href="" className="text-black">
              Properties
            </a>
            <a href="" className="text-black">
              Contact
            </a>
          </div>
          <hr className="my-5" />
          {isAuthenticated ? (
            <div className="flex justify-center">
              <ProfileMenu user={user} logout={logout} />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5">
              <a href="" className={` text-black`}>
                Register
              </a>
              <Button title="Login" onClick={loginWithRedirect} />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
