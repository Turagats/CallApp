import { Table, Modal, Input, Select } from "antd";
import Button from "antd/lib/button";
import { FC, MouseEvent, SetStateAction, useEffect, useState } from "react";
import useStore from "./Zustand";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddRow from "./AddRow";
import EditRow from "./EditRow";

interface MainPageProps {}

const MainPage: FC<MainPageProps> = ({}) => {
  const { data, loading, error, fetchData } = useStore();
  const [dataSource, setDataSource] = useState(data);
  const [addModaleVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [rowIsEditing, setRowIsEditing] = useState(null);

  useEffect(() => {
    setDataSource(data);
  }, [data]);
  //   setDataSource(data);
  const columns = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Street", dataIndex: ["address", "street"], key: "street" },
    { title: "City", dataIndex: ["address", "city"], key: "city" },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => {
        return (
          <>
            <EditOutlined onClick={() => onEditRow(record)} />
            <DeleteOutlined
              className="ml-4 text-red-500"
              onClick={() => onDeleteRow(record)}
            />
          </>
        );
      },
    },
  ];

  const onAddNewRow = () => {
    setAddModalVisible(true);
  };
  const onDeleteRow = (record: { id: number | null }) => {
    Modal.confirm({
      title: "Are You Sure?",
      cancelText: "No",
      okText: "Yes",
      okType: "danger",

      onOk: () =>
        setDataSource((pre) => {
          return pre.filter((row) => row.id !== record.id);
        }),
    });
  };
  const onEditRow = (record: any) => {
    setEditModalVisible(true);
    setRowIsEditing({ ...record });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col justify-center h-full items-center">
      <AddRow visible={addModaleVisible} addModalVisible={setAddModalVisible} />
      <EditRow
        visible={editModalVisible}
        editModalVisible={setEditModalVisible}
        record={rowIsEditing}
      />
      <Button className="m-5 w-1/4" onClick={onAddNewRow}>
        Add New Row
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        onRow={(record: any, rowIndex) => ({
          onDoubleClick: (e) => {
            setRowIsEditing({ ...record });
            setEditModalVisible(true);
          },
        })}
      />
    </div>
  );
};

export default MainPage;
