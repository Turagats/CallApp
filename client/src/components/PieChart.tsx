import { FC, useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import axios from "axios";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface PieChartProps {}

const PieChart: FC<PieChartProps> = ({}) => {
  const [dataSource, setDataSource] = useState<any>();
  const [cities, setCities] = useState<any>([]);

  const fetchData = async () => {
    try {
      const response: any = await axios.get("http://localhost:5000/");

      setDataSource(response);
      setCities((prevCities: any) => {
        const extractedCities = response.data.map(
          (item: any) => item.address.city
        );
        return [...prevCities, ...extractedCities];
      });
    } catch (error) {}
  };

  const counts = cities.reduce((acc: any, city: any) => {
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const totalParticipants = cities.length;

  const result = Object.entries(counts).map(([city, count]: any) => ({
    type: city,
    value: Math.round((count / totalParticipants) * 100),
  }));

  useEffect(() => {
    fetchData();
  }, []);

  const data = result;

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <div className="flex justify-center h-screen">
      {dataSource ? (
        <div className="flex w-full h-screen items-center justify-center">
          <Pie {...config} className="w-1/2"></Pie>
          <Button className="">
            {" "}
            <Link to={"/"}>Home</Link>{" "}
          </Button>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default PieChart;
