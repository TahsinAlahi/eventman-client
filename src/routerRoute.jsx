import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/signup",
        Component: SignupPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
    ],
  },
]);

export default router;
