import React, { useState } from "react";
import { Post } from "./Zustand";
import axios from "axios";
import { error } from "console";
import { Table } from "antd";

interface AddDataProps {}

// interface AddData {
//   name: string;
//   email: string;
//   // add other properties as needed
// }

// interface AddDataState {
//   formData: AddData;
// }

const initialAddData: Post = {
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

interface User {
  id: number;
  name: string;
}

const Form: React.FC<AddDataProps> = ({}) => {
  const [state, setState] = useState<Post>(initialAddData);
  const [usersList, setUsersList] = useState<User[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("logges");
    console.log(1, state);
    try {
      const response = await axios.post("http://localhost:5000/addData", state);
      console.log(response.data);
      alert(response.data);
      setUsersList(response.data);
    } catch (error) {
    } finally {
    }
    // axios.post("http://localhost:5000/addData", state);
    // .then((response: any) => {
    //   console.log(response.data.message);
    // })
    // .catch((error: any) => {
    //   console.error(error);
    // });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-1 flex-col">
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="email"
        name="email"
        value={state.email}
        onChange={handleChange}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        name="gender"
        value={state.gender}
        onChange={handleChange}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        name="street"
        value={state.address.street}
        onChange={handleChangeAddress}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        name="city"
        value={state.address.city}
        onChange={handleChangeAddress}
      />
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        name="phone"
        value={state.phone}
        onChange={handleChange}
      />
      {/* add other input fields as needed */}
      <button
        type="submit"
        className="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
