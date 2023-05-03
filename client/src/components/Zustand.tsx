import create from "zustand";
import axios from "axios";

export interface Post {
  id: number | null;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

interface Store {
  data: Post[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

const useStore = create<Store>((set) => ({
  data: [],
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true });
    try {
      const response = await axios.get<Post[]>("http://localhost:5000/");
      set({ data: response.data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default useStore;
