import { Navigate, useLocation } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return <Loader />;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} />;
};

export default PrivateRoute;
