import { Table, Button, Form, Input, Select } from "antd";
import { FC, useState } from "react";
import React, { useEffect } from "react";
import useStore from "./Zustand";
interface ShowDataProps {}

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Name",
//     dataIndex: "email",
//     key: "name",
//   },
// ];

const ShowData: FC<ShowDataProps> = ({}) => {
  const { data, loading, error, fetchData } = useStore();
  const [editingRow, setEditingRow] = useState<string>("");
  const [form] = Form.useForm();

  console.log(editingRow);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "name",

      render: (text: any, record: any) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Pleease enter your Name" }]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render: (text: any, record: any) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Pleease enter your Name" }]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: any, record: any) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Pleease enter your Email" }]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text: any, record: any) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Pleease enter your Gender" }]}
            >
              <Select
                labelInValue
                defaultValue={{
                  value: "Male",
                  label: "Male",
                }}
                style={{
                  // height: 60,
                  width: 80,
                }}
                // onChange={handleChange}
                options={[
                  {
                    value: "Male",
                    label: "Male",
                  },
                  {
                    value: "Female",
                    label: "Female",
                  },
                ]}
              />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    // {
    //   title: "Street",
    //   dataIndex: "address",
    //   key: "street",
    //   // render: (address: { street: string }) => address.street,
    //   render: (text: any, record: any) => {
    //     if (editingRow === record.key) {
    //       return (
    //         <Form.Item
    //           name="street"
    //           rules={[{ required: true, message: "Pleease enter your Street" }]}
    //         >
    //           <Input />
    //         </Form.Item>
    //       );
    //     } else {
    //       return <p>{text}</p>;
    //     }
    //   },
    // },
    // {
    //   title: "City",
    //   dataIndex: "address",
    //   key: "city",
    //   // render: (address: { city: string }) => address.city,
    //   render: (text: any, record: any) => {
    //     if (editingRow === record.key) {
    //       return (
    //         <Form.Item
    //           name="city"
    //           rules={[{ required: true, message: "Pleease enter your City" }]}
    //         >
    //           <Input />
    //         </Form.Item>
    //       );
    //     } else {
    //       return <p>{text.city}</p>;
    //     }
    //   },
    // },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text: any, record: any) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Pleease enter your Phone" }]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Actions",
      render: (_: any, record: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  name: record.name,
                  email: record.email,
                  gender: record.gender,
                  street: record.address.street,
                  city: record.address.city,
                  phone: record.phone,
                });
              }}
            >
              Edit
            </Button>
            <Button htmlType="submit">Save</Button>
            <Button>Delete</Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // console.log(data);

  const onFinish = (values: any) => {
    console.log({ values });
    // const updatedData = [...columns];
    // updatedData.splice(editingRow,1,values)
  };

  return (
    // <ul>
    //   {data.map((item) => (
    //     <li key={item.id}>{item.name}</li>
    //   ))}
    // </ul>
    <Form form={form} onFinish={onFinish}>
      <Table dataSource={data} columns={columns} />
    </Form>
  );
};

export default ShowData;
