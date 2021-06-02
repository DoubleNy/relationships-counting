import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

const RELATIONSHIPS_URL = `${BASE_URL}/relationships`;

export const getRelationships = async () => {
  return await axios.get(RELATIONSHIPS_URL);
};
