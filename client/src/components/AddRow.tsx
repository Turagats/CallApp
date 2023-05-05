import { FC, useState } from "react";
import { Modal, Input, Select } from "antd";
import { Post } from "./Zustand";
import axios from "axios";

interface AddRowProps {
  visible: boolean;
  addModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const newAddedRow: Post = {
  id: null,
  name: "",
  email: "",
  gender: "",
  address: {
    street: "",
    city: "",
  },
  phone: "",
};

const AddRow: FC<AddRowProps> = ({ visible, addModalVisible }) => {
  const [newRow, setNewRow] = useState<Post>(newAddedRow);

  const onAfterAddNewRow = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/addData",
        newRow
      );
      console.log(response.data);
      addModalVisible(false);
    } catch (error) {}
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setNewRow((prevState) => ({ ...prevState, [name]: value }));
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    console.log(event);
    if (event === "male" || event === "female") {
      // const { value } = event;
      setNewRow((prevState: any) => ({ ...prevState, gender: event }));
    } else {
      const { name, value } = event.target;
      setNewRow((prevState: any) => ({ ...prevState, [name]: value }));
    }
  };

  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewRow((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };
  console.log(newRow);

  return (
    <div>
      <Modal
        title="Add New Row"
        open={visible}
        onCancel={() => {
          addModalVisible(false);
        }}
        onOk={onAfterAddNewRow}
      >
        <Input
          name="name"
          className="mt-2"
          placeholder="Name"
          value={newRow.name}
          onChange={handleChange}
        ></Input>
        <Input
          name="email"
          className="mt-2"
          placeholder="Email"
          value={newRow.email}
          onChange={handleChange}
        ></Input>
        <Select
          placeholder="Select Gender"
          className="mt-2"
          options={[
            {
              value: "male",
              label: "male",
            },
            {
              value: "female",
              label: "female",
            },
          ]}
          //   value={newRow.gender}
          onChange={handleChange}
        ></Select>
        <Input
          name="street"
          className="mt-2"
          placeholder="Street"
          value={newRow.address.street}
          onChange={handleChangeAddress}
        ></Input>
        <Input
          name="city"
          className="mt-2"
          placeholder="City"
          value={newRow.address.city}
          onChange={handleChangeAddress}
        ></Input>
      </Modal>
    </div>
  );
};

export default AddRow;
