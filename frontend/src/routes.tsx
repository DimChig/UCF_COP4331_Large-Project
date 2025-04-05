import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ErrorPage from "./pages/error/ErrorPage";
import Layout from "./pages/Layout";
import CardsPage from "./pages/cards/CardsPage";
import CardPage from "./pages/cards/[id]/CardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "cards",
        element: <CardsPage />,
      },
      {
        path: "cards/:cardId",
        element: <CardPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
