import axios from "axios";

const backendPortNumber = "4050";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

async function get(endpoint: string, params = "") {
  return axios.get(serverUrl + endpoint + "/" + params);
}

async function post(endpoint: string, data: any) {
  const bodyData = JSON.stringify(data);

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function put(endpoint: string, data: any) {
  const bodyData = JSON.stringify(data);

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function del(endpoint: string, params = "") {
  return axios.delete(serverUrl + endpoint + "/" + params);
}

export { get, post, put, del as delete };
