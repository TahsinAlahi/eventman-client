import { Link, useLocation, useNavigate } from "react-router";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useForm } from "react-hook-form";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    setIsLoggingIn(true);
    const res = await login(data.email, data.password);
    setIsLoggingIn(false);
    if (res.status === "success") navigate(state?.from || "/events");
  }

  return (
    <main className="bg-slate-950 min-h-screen max-w-screen-xl mx-auto text-white py-10 font-poppins">
      <h1 className="text-3xl border-b-2 border-white mx-auto text-center w-fit pb-1 mb-10 font-rubik">
        Login
      </h1>

      <div className="w-11/12 md:w-2/5 mx-auto flex flex-col items-center justify-center">
        <form className="w-full space-y-4" onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="px-3 py-2 text-white outline-none rounded-md border border-gray-400 shadow-md"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="font-semibold text-lg">
              Password
            </label>
            <div
              className="absolute right-3 bottom-3 cursor-pointer text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoMdEye className="text-xl" />
              ) : (
                <IoMdEyeOff className="text-xl" />
              )}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", { required: "Password is required" })}
              className="px-3 py-2 text-white outline-none rounded-md border border-gray-400 shadow-md"
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            className="w-full px-3 py-2 rounded-md bg-purple-900 text-white font-semibold hover:bg-purple-700 transition-all duration-200 my-5"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>

        <h3 className="mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-400 hover:border-purple-500 border-b-2 border-transparent transition-all duration-200 font-semibold"
          >
            Sign Up
          </Link>
        </h3>
      </div>
    </main>
  );
}

export default LoginPage;
