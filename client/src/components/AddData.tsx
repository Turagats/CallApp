import React, { useState } from "react";
import { Post } from "./Zustand";

interface AddDataProps {}

interface AddData {
  name: string;
  email: string;
  // add other properties as needed
}

interface AddDataState {
  formData: AddData;
}

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
  // set initial values for other properties as needed
};

const Form: React.FC<AddDataProps> = ({}) => {
  const [state, setState] = useState<Post>(initialAddData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("logges");
    console.log(1, state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={state.email}
        onChange={handleChange}
      />
      {/* add other input fields as needed */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
