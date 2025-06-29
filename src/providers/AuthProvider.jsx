import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

const authContext = createContext(null);

function AuthProvider({ children }) {
  const axiosPublic = useAxiosPublic();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function signup(name, email, password, photoURL) {
    setIsAuthLoading(true);
    try {
      const res = await axiosPublic.post("/auth/register", {
        name,
        email,
        password,
        photoURL,
      });
      if (res.status === 201) {
        toast.success("User created successfully");
        return { status: "success" };
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.error("User already exists");
        return { status: "error", message: "User already exists" };
      } else if (error?.response?.status === 400) {
        toast.error("All fields are required");
        return { status: "error", message: "All fields are required" };
      } else {
        toast.error("Something went wrong");
        return { status: "error", message: "Something went wrong" };
      }
    } finally {
      setIsAuthLoading(false);
    }
  }

  async function login(email, password) {
    setIsAuthLoading(true);

    try {
      const res = await axiosPublic.post("/auth/login", {
        email,
        password,
      });
      if (res.status === 200) {
        setUser({
          name: res.data.name,
          email: res.data.email,
          _id: res.data._id,
          photoURL: res.data.photoURL,
        });

        toast.success("Login successful");
        return { status: "success" };
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error("Invalid credentials");
        return { status: "error", message: "Invalid credentials" };
      } else if (error?.response?.status === 404) {
        toast.error("User does not exist");
        return { status: "error", message: "User does not exist" };
      } else if (error?.response?.status === 400) {
        toast.error("All fields are required");
        return { status: "error", message: "All fields are required" };
      } else {
        toast.error("Something went wrong");
        return { status: "error", message: "Something went wrong" };
      }
    }
  }

  async function logout() {
    setIsAuthLoading(true);
    try {
      const res = await axiosPublic.post("/auth/logout");
      if (res.status === 200) {
        setUser(null);
        localStorage.removeItem("user");
        toast.success("Logout successful");
        return { status: "success" };
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Something went wrong");
      return { status: "error", message: "Something went wrong" };
    }
  }

  // set user in localstorage
  useEffect(() => {
    setIsAuthLoading(true);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    setIsAuthLoading(false);
  }, [user]);

  if (isAuthLoading) return <Loader />;

  const value = { signup, isAuthLoading, login, user, logout };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;

export function useAuth() {
  const context = useContext(authContext);
  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
}
