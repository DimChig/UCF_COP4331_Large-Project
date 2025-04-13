import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import MoviesPage from "./pages/movies/MoviesPage";
import MovieDetailsPage from "./pages/movies/[id]/MovieDetailsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import RegisterPage from "./pages/register/RegisterPage";
import SearchPage from "./pages/search/SearchPage";
import CardDetailsPage from "./pages/cards/[cardId]/CardDetailsPage";

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
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "movies/:cardId",
        element: <CardDetailsPage />,
      },
      {
        path: "movies2/:movieId",
        element: <MovieDetailsPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
