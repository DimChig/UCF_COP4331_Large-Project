import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import CardDetailsPage from "./pages/cards/[cardId]/CardDetailsPage";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import MoviesPage from "./pages/movies/MoviesPage";
import RegisterPage from "./pages/register/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "cards/:cardId",
        element: <CardDetailsPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
