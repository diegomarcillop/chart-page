import axios from "axios";
import { API_URL } from "common/constants/constants";

class apiCliente {
  get(url, params) {
    url = new URL(`${API_URL}/${url}`);
    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }
    return axios
      .get(url)
      .then(async (response) => {
        return await response;
      })
      .catch((error) => error);
  }

  post(url, data) {
    url = new URL(`${API_URL}/${url}`);
    return axios
      .post(url, data)
      .then(async (response) => {
        return response;
      })
      .catch((error) => error);
  }
}
export default new apiCliente();
