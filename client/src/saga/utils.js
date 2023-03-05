import Axios from "axios";

export const callAPI = async ({ url, method, data, headers }) => {
  return await Axios({
    url,
    method,
    headers,
    data,
  });
};
