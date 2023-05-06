import { FC } from "react";
import MainPage from "./components/MainPage";
import PieChart from "./components/PieChart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

interface AppProps {}

const app: FC<AppProps> = ({}) => {
  const router = createBrowserRouter([
    { path: "/", element: <MainPage /> },
    { path: "/pie-chart", element: <PieChart /> },
  ]);
  return <RouterProvider router={router} />;
};

export default app;
