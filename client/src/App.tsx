import { FC } from "react";
import React from "react";
import ShowData from "./components/ShowData";
import AddData from "./components/AddData";
import { Table } from "antd";
import Zustand from "zustand";

interface AppProps {}

const app: FC<AppProps> = ({}) => {
  return (
    <div className="p-2 flex justify-center">
      {/* <ShowData /> */}
      <ShowData />
      {/* <AddData /> */}
    </div>
  );
};

export default app;
