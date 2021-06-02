import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

const FILE_URL = `${BASE_URL}/file`;
const config = {
  headers: { "Content-Type": "text/xml" },
};

export const postFile = async (file: any) => {
  return await axios.post(FILE_URL, file, config);
};
