import { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaCalendarCheck } from "react-icons/fa6";
import { useAuth } from "../providers/AuthProvider";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function activeClass({ isActive }) {
    return `block py-2 px-3 font-semibold border-b-2 border-transparent text-black hover:border-white bg-white/40 ${
      isActive ? "border-white bg-white/80 text-slate-950" : "text-white"
    }`;
  }

  return (
    <div className="w-full bg-slate-950">
      <nav className="w-full font-nunito text-white relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:px-7">
          <Link to="/" className="flex items-center space-x-3">
            <div
              className="h-10 aspect-square overflow-hidden  rounded-full flex justify-center items-center"
              style={{ color: "#fff" }}
            >
              <FaCalendarCheck className="text-3xl text-white" />
            </div>
            <span className="text-3xl font-semibold whitespace-nowrap font-open-sans">
              EventMan
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full lg:w-auto lg:flex lg:justify-end absolute lg:static top-full z-50 bg-slate-950 p-4 lg:border-0 right-0 left-0 lg:py-0 lg:px-0 lg:bg-transparent`}
          >
            <ul
              className="font-medium flex flex-col lg:flex-row p-4 mt-4 border rounded-lg bg-slate-950 lg:border-0 text-center lg:space-x-2"
              onClick={toggleMenu}
            >
              {/* Public Links */}
              <li>
                <NavLink to="/" className={activeClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className={activeClass}>
                  Events
                </NavLink>
              </li>

              {/* Private Links */}
              {user && (
                <>
                  <li>
                    <NavLink to="/add-event" className={activeClass}>
                      Add Event
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-events" className={activeClass}>
                      My Events
                    </NavLink>
                  </li>
                </>
              )}

              {/* Auth Links */}
              {!user ? (
                <>
                  <li>
                    <NavLink to="/login" className={activeClass}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" className={activeClass}>
                      Sign Up
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={logout}
                    className="lg:hidden font-semibold text-red-400 hover:border-red-600 mt-2"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Logout button for large screens */}
          {user && (
            <div className="hidden lg:flex items-center ml-3">
              <button
                onClick={logout}
                className="py-2 px-3 font-semibold text-red-400 border-b-2 border-transparent hover:border-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
