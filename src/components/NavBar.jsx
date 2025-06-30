import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import { FaCalendarCheck } from "react-icons/fa6";
import { useAuth } from "../providers/AuthProvider";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const userMenuRef = useRef(null);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function toggleUserMenu() {
    setIsUserMenuOpen(!isUserMenuOpen);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function activeClass({ isActive }) {
    return `nav-link relative block py-2 px-3 font-semibold
      text-neutral-300 transition-all duration-500 ease-in-out
      ${isActive ? "active" : ""}`;
  }

  return (
    <div className="w-full bg-neutral-950">
      <nav className="w-full font-nunito text-white relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:px-7">
          <Link to="/" className="flex items-center space-x-3">
            <div
              className="h-10 aspect-square overflow-hidden rounded-full flex justify-center items-center"
              style={{ color: "#fff" }}
            >
              <FaCalendarCheck className="text-3xl text-white" />
            </div>
            <span className="text-3xl font-semibold whitespace-nowrap font-open-sans">
              EventMan
            </span>
          </Link>

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

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full lg:w-auto lg:flex lg:justify-end absolute lg:static top-full z-50 bg-neutral-950 p-4 lg:border-0 right-0 left-0 lg:py-0 lg:px-0 lg:bg-transparent`}
          >
            <ul
              className="font-medium flex flex-col lg:flex-row p-4 mt-4 border rounded-lg bg-neutral-950 lg:border-0 text-center lg:space-x-2"
              onClick={toggleMenu}
            >
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
                    className="lg:hidden font-semibold text-red-400 hover:border-red-400 mt-2 cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

          {user && (
            <div
              className="hidden lg:flex items-center ml-3 relative"
              ref={userMenuRef}
            >
              <button
                onClick={toggleUserMenu}
                className="w-12 h-12 rounded-full overflow-hidden transition relative z-20 cursor-pointer"
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </button>

              <div
                className={`
        absolute right-0 mt-1 w-48 bg-neutral-900 border border-neutral-700 rounded-md shadow-lg z-30 py-2
        transform transition-all duration-300 ease-in-out origin-top-right
        ${
          isUserMenuOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }
      `}
                style={{ top: "100%", marginTop: "0.25rem" }}
              >
                <p className="px-4 py-2 text-sm text-neutral-300 font-semibold truncate">
                  {user.name || user.email}
                </p>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-600 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
