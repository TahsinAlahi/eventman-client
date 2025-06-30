import { Link } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import Squares from "../ui/Square";
import BlurIn from "../ui/BlurText";

function HomePage() {
  const { user } = useAuth();

  return (
    <>
      <div className="relative bg-black w-screen h-[calc(100vh-56px)] lg:h-[calc(100vh-58px)] overflow-hidden">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#334155"
          hoverFillColor="#222"
        />

        <main className="absolute bg-black/40 inset-0 flex items-center justify-center">
          <div className="max-w-xl  mx-auto flex items-center justify-center flex-col text-neutral-300 p-8">
            <div className="text-center flex flex-col justify-center items-center space-y-6">
              <BlurIn className="md:text-4xl text-center text-2xl font-bold font-rubik">
                Welcome to EventMan
              </BlurIn>
              <div>
                <BlurIn
                  duration={1.5}
                  className="text-lg w-11/12 mx-auto px-3 font-poppins text-center font-semibold"
                >
                  Explore exciting events, grow your network, and make every
                  moment count! 🎉📅
                </BlurIn>
                <br />
                <BlurIn
                  className="text-lg w-11/12 mx-auto px-3 font-poppins text-center"
                  duration={2}
                >
                  From <em>workshops</em> to <em>community drives</em> — find,
                  join, and be part of something bigger.{" "}
                  <span className="inline-block">🌟🙌</span>
                </BlurIn>
              </div>
            </div>

            <div className="space-x-3 text-lg mt-8">
              {user?._id ? (
                <BlurIn
                  className="font-semibold text-neutral-950 bg-neutral-300 hover:bg-neutral-200 hover:text-neutral-950 px-5 py-2 transition duration-300"
                  duration={2.3}
                >
                  <Link to="/events">Events</Link>
                </BlurIn>
              ) : (
                <>
                  <BlurIn className="space-x-5">
                    <Link
                      to="/login"
                      className="font-semibold text-neutral-950 bg-neutral-300 hover:bg-neutral-200 hover:text-neutral-950 px-5 py-2 transition duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="font-semibold text-neutral-950 bg-neutral-300 hover:bg-neutral-200 hover:text-neutral-950 px-5 py-2 transition duration-300"
                    >
                      Sign Up
                    </Link>
                  </BlurIn>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default HomePage;
