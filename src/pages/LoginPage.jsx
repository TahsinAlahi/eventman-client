import { Link, useLocation, useNavigate } from "react-router";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useForm } from "react-hook-form";
import ShinyText from "../ui/ShinyText";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.03,
      when: "beforeChildren",
      ease: "easeOut",
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isEasyLogging, setIsEasyLogging] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  async function handleLogin(data) {
    setIsLoggingIn(true);
    const res = await login(data.email, data.password);
    setIsLoggingIn(false);
    if (res.status === "success") navigate(state?.from || "/events");
  }

  async function handleEasyLogin(e) {
    e.preventDefault();
    setIsEasyLogging(true);
    setValue("email", "admin@gmail.com");
    setValue("password", "Pa$$word");
    const res = await login("admin@gmail.com", "Pa$$word");
    setIsEasyLogging(false);
    if (res.status === "success") navigate(state?.from || "/events");
  }

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full md:w-2/3 lg:w-1/3 mx-auto text-neutral-300 font-poppins my-5 py-6 px-4 justify-center items-center flex flex-col"
    >
      <motion.div variants={itemVariants} className="mb-5">
        <ShinyText
          text="Login"
          disabled={false}
          speed={2}
          className="text-3xl mx-auto text-center w-fit pb-2 font-rubik"
        />
      </motion.div>

      <motion.form
        variants={containerVariants}
        className="w-full space-y-4"
        onSubmit={handleSubmit(handleLogin)}
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 py-2 text-neutral-300 outline-none rounded-md border border-neutral-600 focus:border-neutral-400 shadow-md bg-transparent"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-1 relative"
        >
          <label htmlFor="password" className="font-semibold text-sm">
            Password
          </label>
          <div
            className="absolute right-3 bottom-3 text-neutral-300 cursor-pointer"
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
            className="w-full px-3 py-2 text-neutral-300 outline-none rounded-md border border-neutral-600 focus:border-neutral-400 shadow-md bg-transparent"
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}
        </motion.div>

        <motion.button
          variants={itemVariants}
          type="submit"
          className="w-full px-3 py-2 rounded-md bg-neutral-900 text-neutral-300 font-semibold hover:bg-neutral-700 transition-all duration-200 my-5 disabled:opacity-50 cursor-pointer"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </motion.button>
        <motion.button
          variants={itemVariants}
          type="submit"
          className="w-full px-3 py-2 rounded-md -mt-2 bg-neutral-900 text-neutral-300 font-semibold hover:bg-neutral-700 transition-all duration-200 my-5 disabled:opacity-50 cursor-pointer"
          disabled={isEasyLogging || isLoggingIn}
          onClick={handleEasyLogin}
        >
          {isEasyLogging ? "Logging in..." : "Easy Login"}
        </motion.button>
      </motion.form>

      <motion.h3 variants={itemVariants} className="mt-4 text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="text-neutral-600 hover:border-neutral-500 border-b-2 border-transparent transition-all duration-200 font-semibold"
        >
          Sign Up
        </Link>
      </motion.h3>
    </motion.main>
  );
}

export default LoginPage;
