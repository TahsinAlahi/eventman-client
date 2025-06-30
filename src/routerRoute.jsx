import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoute";

// Lazy-loaded pages
const RootLayout = lazy(() => import("./layouts/RootLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const CreateEventPage = lazy(() => import("./pages/AddEventPage"));
const MyEventsPage = lazy(() => import("./pages/MyEventsPage"));
const UpdateEventPage = lazy(() => import("./pages/UpdateEventPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

function withSuspense(Component) {
  return <Suspense fallback={<Loader />}>{Component}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<RootLayout />),
    children: [
      {
        path: "/",
        element: withSuspense(<HomePage />),
      },
      {
        path: "/signup",
        element: withSuspense(<SignupPage />),
      },
      {
        path: "/login",
        element: withSuspense(<LoginPage />),
      },
      {
        path: "/events",
        element: withSuspense(
          <PrivateRoute>
            <EventsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-event",
        element: withSuspense(
          <PrivateRoute>
            <CreateEventPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-events",
        element: withSuspense(
          <PrivateRoute>
            <MyEventsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:eventId",
        element: withSuspense(
          <PrivateRoute>
            <UpdateEventPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: withSuspense(<ErrorPage />),
  },
]);

export default router;
