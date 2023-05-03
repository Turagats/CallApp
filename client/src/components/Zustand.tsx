import create from "zustand";
import axios from "axios";

interface Post {
  userId: number;
  id: number;
  name: string;
  body: string;
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
