import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";
import Button from "./ui/Button";
import Logo from "../assets/logo-icon-default.svg";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "./ProfileMenu";
import AddPropertyModal from "./AddPropertyModal";
import useAuthCheck from "../hooks/useAuthCheck";

const Navbar = ({ textColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { validateLogin } = useAuthCheck();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAddPropertyModal = () => {
    if (validateLogin()) {
      setModalOpen(true);
    }
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
        <div className="lg:hidden flex gap-4 items-center">
          <div className="">
            {isAuthenticated ? (
              <ProfileMenu user={user} logout={logout} />
            ) : (
              <div>
                <Button title="Login" onClick={loginWithRedirect} />
              </div>
            )}
          </div>
          <div
            className="cursor-pointer lg:hidden block blueGradient p-2 rounded-lg h-fit"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <FaX size={20} className="text-white" />
            ) : (
              <FaBars size={20} className="text-white" />
            )}
          </div>
        </div>

        <div className="lg:flex hidden gap-6">
          <div
            onClick={handleAddPropertyModal}
            className={`navbar-link cursor-pointer ${textColor}`}
          >
            Add Property
          </div>
          <NavLink to="/properties" className={`navbar-link ${textColor}`}>
            Properties
          </NavLink>
          <NavLink to="/contact" className={`navbar-link ${textColor}`}>
            Contact
          </NavLink>
        </div>

        <AddPropertyModal open={modalOpen} setOpen={setModalOpen} />

        <div
          className={`absolute right-0 top-10 w-40 bg-white p-4 rounded-lg blue-shadow z-50 ${
            isOpen ? "block" : "hidden"
          } `}
        >
          <div className="flex flex-col items-center gap-5">
            <a onClick={handleAddPropertyModal} className="text-black">
              Add Property
            </a>
            <NavLink to="/properties" href="" className="text-black">
              Properties
            </NavLink>
            <NavLink to="/contact" className="text-black">
              Contact
            </NavLink>
          </div>
        </div>
        <div className="lg:block hidden">
          {isAuthenticated ? (
            <ProfileMenu user={user} logout={logout} />
          ) : (
            <div>
              <Button title="Login" onClick={loginWithRedirect} />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
