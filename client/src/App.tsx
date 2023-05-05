import { FC } from "react";
import React from "react";
import ShowData from "./components/ShowData";
import AddData from "./components/AddData";
import { Table } from "antd";
import MainPage from "./components/MainPage";

interface AppProps {}

const app: FC<AppProps> = ({}) => {
  return (
    <div className="p-2 flex justify-center">
      {/* <ShowData /> */}
      {/* <ShowData /> */}
      <MainPage />
      {/* <AddData /> */}
    </div>
  );
};

export default app;
