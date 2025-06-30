import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EventsPage from "./pages/EventsPage";
import CreateEventPage from "./pages/AddEventPage";
import MyEventsPage from "./pages/MyEventsPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import PrivateRoute from "./components/PrivateRoute";

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
      {
        path: "/events",
        element: (
          <PrivateRoute>
            <EventsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-event",
        element: (
          <PrivateRoute>
            <CreateEventPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-events",
        element: (
          <PrivateRoute>
            <MyEventsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:eventId",
        element: (
          <PrivateRoute>
            <UpdateEventPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
