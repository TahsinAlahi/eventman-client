import { Link, useLocation, useNavigate } from "react-router";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

// Validate Password
function passwordValidator(password) {
  const minLength = 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isLongEnough = password.length >= minLength;

  return isLongEnough && hasUppercase && hasLowercase;
}

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  async function handleRegister(data) {
    if (!passwordValidator(data.password)) {
      toast.error("Try a stronger password!");
      return;
    }

    setIsSigningUp(true);
    const res = await signup(
      data.name,
      data.email,
      data.password,
      data.photoURL
    );
    setIsSigningUp(false);

    if (res.status === "success") navigate(state?.from || "/events");
  }

  return (
    <main className="bg-slate-950 min-h-screen max-w-screen-xl mx-auto text-white font-poppins py-10">
      <h1 className="text-3xl border-b-2 border-white mx-auto text-center w-fit pb-1 mb-10 font-rubik">
        Sign Up
      </h1>

      <div className="w-11/12 md:w-2/5 mx-auto flex flex-col items-center justify-center">
        <form
          className="w-full space-y-4"
          onSubmit={handleSubmit(handleRegister)}
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-semibold text-lg">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
              className="px-3 py-2 text-white outline-none rounded-md border border-gray-400 shadow-md"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

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

          {/* Photo URL */}
          <div className="flex flex-col gap-1">
            <label htmlFor="photoURL" className="font-semibold text-lg">
              Photo URL
            </label>
            <input
              type="url"
              id="photoURL"
              {...register("photoURL", { required: "Photo URL is required" })}
              className="px-3 py-2 text-white outline-none rounded-md border border-gray-400 shadow-md"
            />
            {errors.photoURL && (
              <p className="text-red-400 text-sm">{errors.photoURL.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="font-semibold text-lg">
              Password
            </label>
            <div
              className="absolute right-3 bottom-3 text-white cursor-pointer"
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

          <button className="w-full px-3 py-2 rounded-md bg-purple-900 text-white font-semibold hover:bg-purple-700 transition-all duration-200 my-5">
            Sign Up
          </button>
        </form>

        <h3 className="mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:border-purple-500 border-b-2 border-transparent transition-all duration-200 font-semibold"
          >
            Login
          </Link>
        </h3>
      </div>
    </main>
  );
}

export default SignupPage;
