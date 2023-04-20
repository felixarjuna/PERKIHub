import { Transition } from "@headlessui/react";
import React from "react";
import { BsFillCalendar2EventFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaHamburger, FaWindowClose } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/useAuth";

function App() {
  const { currentUser } = useAuth();
  const name = `${currentUser?.firstName} ${currentUser?.lastName}`;

  const [isShowed, setIsShowed] = React.useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="mt-10 sm:mr-5">
      <div className="flex items-center justify-between">
        <div
          className="ml-8 sm:mx-20 text-2xl sm:text-3xl cursor-pointer"
          onClick={() => setIsShowed(prevValue => !prevValue)}
        >
          {!isShowed && <FaHamburger />}
        </div>

        <Transition
          show={isShowed}
          enter="transition-all duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-95 bg-tundora-700"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={
            "absolute top-0 pl-10 sm:pl-48 bg-tundora-700 w-screen h-screen z-10"
          }
        >
          <div
            className="absolute top-20 text-2xl sm:text-3xl cursor-pointer"
            onClick={() => setIsShowed(prevValue => !prevValue)}
          >
            {isShowed ? <FaWindowClose /> : <FaHamburger />}
          </div>
          <ul className="text-3xl sm:text-4xl flex flex-col gap-10 justify-center h-screen">
            <li
              className="flex gap-4 cursor-pointer items-center"
              onClick={() => {
                setIsShowed(false);
                navigate("events");
              }}
            >
              <BsFillCalendar2EventFill className="" />
              <p className="hover:text-gradient-soft bg-400% animate-gradient">
                Events
              </p>
            </li>
            <li
              className="flex gap-4 cursor-pointer items-center"
              onClick={() => {
                setIsShowed(false);
                navigate("service");
              }}
            >
              <MdGroups />
              <p className="hover:text-gradient-soft bg-400% animate-gradient">
                Groups
              </p>
            </li>
          </ul>
        </Transition>

        <div className="flex justify-end items-center gap-3 sm:mx-10 mr-8">
          {currentUser ? (
            <>
              <h3 className="sm:text-2xl">
                Welcome, <span>{currentUser ? name : "User"}</span>!
              </h3>
              <NavLink to={"/profile"} className="text-3xl">
                <CgProfile />
              </NavLink>
            </>
          ) : (
            <div className="flex gap-10 text-xl">
              <NavLink
                to="/login"
                className="text-cream flex items-center gap-1"
              >
                Log in
                <FiLogIn />
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
