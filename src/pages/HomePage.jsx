import { Link } from "react-router";
import bgImage from "../assets/bg-image.jpg";
import { useAuth } from "../providers/AuthProvider";

function HomePage() {
  const { user } = useAuth();

  return (
    <div
      className="w-screen h-[calc(100vh-56px)] lg:h-[calc(100vh-58px)] bg-slate-900 bg-cover bg-center  text-white"
      // style={{
      //   backgroundImage: `url(${bgImage})`,
      // }}
    >
      <main className="max-w-screen-2xl h-full mx-auto flex items-center justify-center ">
        <div className="max-w-xl mx-auto flex items-center justify-center flex-col text-white p-8 h-min ">
          <div className="text-center space-y-6">
            <h1 className="md:text-4xl text-2xl font-bold font-rubik">
              Welcome to EventMan
            </h1>
            <p class="text-lg w-11/12 mx-auto px-3 font-poppins text-center">
              <strong>
                Explore exciting events, grow your network, and make every
                moment count! 🎉📅
              </strong>
              <br />
              From <em>workshops</em> to <em>community drives</em>—find, join,
              and be part of something bigger.{" "}
              <span class="inline-block">🌟🙌</span>
            </p>
          </div>

          <div className="space-x-3 text-lg mt-8">
            {user?._id ? (
              <>
                <Link
                  to="/events"
                  className="font-semibold text-white bg-slate-950 hover:bg-secondary hover:bg-white hover:text-slate-950 px-5 py-2 transition duration-300 "
                >
                  Events
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-semibold text-white bg-slate-950 hover:bg-secondary hover:bg-white hover:text-slate-950 px-5 py-2 transition duration-300 "
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="font-semibold text-white bg-slate-950 hover:bg-secondary hover:text-slate-950 hover:bg-white px-5 py-2 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
