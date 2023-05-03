import { FC } from "react";
import React from "react";
import ShowData from "./components/ShowData";
import AddData from "./components/AddData";

interface AppProps {}

const app: FC<AppProps> = ({}) => {
  return (
    <div className="p-2 flex justify-center">
      {/* <ShowData /> */}
      <AddData />
    </div>
  );
};

export default app;
