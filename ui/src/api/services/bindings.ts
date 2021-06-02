import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

const BINDINGS_URL = `${BASE_URL}/bindings`;

export const getBindings = async () => {
  return await axios.get(BINDINGS_URL);
};
