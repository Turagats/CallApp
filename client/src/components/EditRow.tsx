import { FC, useEffect, useState } from "react";
import { Modal, Input, Select } from "antd";
import { Post } from "./Zustand";
import useStore from "./Zustand";
import axios from "axios";

interface EditRowProps {}

interface EditRowProps {
  visible: boolean;
  editModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  record: any;
}

const editedRow: Post = {
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

const EditRow: FC<EditRowProps> = ({ visible, editModalVisible, record }) => {
  const [editedRowValues, setEditedRowValues] = useState(record);

  useEffect(() => {
    setEditedRowValues(record);
  }, [record]);

  // console.log("datp", editedRowValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    if (event === "male" || event === "female") {
      // const { value } = event;
      setEditedRowValues((prevState: any) => ({ ...prevState, gender: event }));
    } else {
      const { name, value } = event.target;
      setEditedRowValues((prevState: any) => ({ ...prevState, [name]: value }));
    }
  };

  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedRowValues((prevState: { address: any }) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const onEditSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/editData",
        editedRowValues
      );
      console.log(response.data);
      editModalVisible(false);
      fetchData();
    } catch (error) {}
  };

  return (
    <div>
      <Modal
        title="Edit Row"
        open={visible}
        onCancel={() => {
          editModalVisible(false);
        }}
        onOk={onEditSave}
      >
        <Input
          name="id"
          className="mt-2"
          placeholder="Name"
          value={editedRowValues?.id}
          // onChange={handleChange}
        ></Input>
        <Input
          name="name"
          className="mt-2"
          placeholder="Name"
          value={editedRowValues?.name}
          onChange={handleChange}
        ></Input>
        <Input
          name="email"
          className="mt-2"
          placeholder="Email"
          value={editedRowValues?.email}
          onChange={handleChange}
        ></Input>
        <Select
          placeholder="Select Gender"
          className="mt-2"
          defaultValue={editedRowValues?.gender}
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
          value={editedRowValues?.address.street}
          onChange={handleChangeAddress}
        ></Input>
        <Input
          name="city"
          className="mt-2"
          placeholder="City"
          value={editedRowValues?.address.city}
          onChange={handleChangeAddress}
        ></Input>
      </Modal>
    </div>
  );
};

export default EditRow;
function editModalVisible(arg0: boolean) {
  throw new Error("Function not implemented.");
}
function fetchData() {
  throw new Error("Function not implemented.");
}
