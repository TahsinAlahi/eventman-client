import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EventsPage from "./pages/EventsPage";
import CreateEventPage from "./pages/AddEventPage";
import MyEventsPage from "./pages/MyEventsPage";
import UpdateEventPage from "./pages/UpdateEventPage";

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
        Component: EventsPage,
      },
      {
        path: "/add-event",
        Component: CreateEventPage,
      },
      {
        path: "/my-events",
        Component: MyEventsPage,
      },
      { path: "/update/:eventId", Component: UpdateEventPage },
    ],
  },
]);

export default router;
