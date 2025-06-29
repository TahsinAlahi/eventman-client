import axios from "axios";
import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

function useAxiosSecure() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true,
    params: { email: user?.email },
  });

  useEffect(() => {
    const secureRequestInterceptor = axiosSecure.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );

    const secureResponseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (err) => {
        if ([401, 403].includes(err.response?.status)) {
          toast.error("Access denied");
          console.error("Token expired or invalid");
          logout();
          navigate("/");
        }
        return Promise.reject(err);
      }
    );

    // Clean up interceptors when the component unmounts or when user changes
    return () => {
      axiosSecure.interceptors.request.eject(secureRequestInterceptor);
      axiosSecure.interceptors.response.eject(secureResponseInterceptor);
    };
  }, [user, logout, navigate]);

  return axiosSecure;
}

export default useAxiosSecure;
