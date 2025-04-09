import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import HomePage from "./pages/home/HomePage";
import ErrorPage from "./pages/error/ErrorPage";
import Layout from "./pages/Layout";
import CardsPage from "./pages/cards/CardsPage";
import CardDetailsPage from "./pages/cards/[cardId]/CardDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "home",
        element: <HomePage />
      },
      {
        path: "cards",
        element: <CardsPage />,
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
