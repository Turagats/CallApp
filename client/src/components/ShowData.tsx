import type { FC } from "react";
import React, { useEffect } from "react";
import useStore from "./Zustand";

interface ShowDataProps {}

const ShowData: FC<ShowDataProps> = ({}) => {
  const { data, loading, error, fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  console.log(1, data);
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default ShowData;
