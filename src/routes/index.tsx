import { createBrowserRouter } from "react-router-dom";
import { Login, Prattle, Registration } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Prattle />,
  },
  {
    path: "registration",
    element: <Registration />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
