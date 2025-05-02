import axios from "axios";

// HEADERS
const getHeaders = (reqMethod, directToken = "") => {
  const headers = {
    headers: {
      // Authorization: `Bearer ${directToken ? directToken : store.getState().App.authToken}`
      "authentication-token": `${localStorage.getItem("token")}`,
    },
  };
  if (reqMethod === "post") {
    headers.headers["Content-Type"] = "application/json";
  }
  return headers;
};

// GET METHOD
const _get = async (url, directToken = "") => {
  try {
    const headers = getHeaders(directToken);
    const res = await axios.get(url, headers);
    return { status: res.status, data: res.data };
  } catch (error) {
    return { status: error.response?.status, message: error.message };
  }
};

// POST METHOD
const _post = async (url, formData, directToken = "") => {
  try {
    const headers = getHeaders("post", directToken);
    const res = await axios.post(url, formData, headers);
    const result = { status: res.status, data: res.data };
    return result;
  } catch (error) {
    return { status: error.response?.status, message: error.message };
  }
};
// DELETE METHOD
const _delete = async (url, directToken = "") => {
  try {
    const headers = getHeaders(directToken);
    const res = await axios.delete(url, headers);
    return { status: res.status, data: res.data };
  } catch (error) {
    return { status: error.response?.status, message: error.message };
  }
};

// PUT METHOD
const _put = async (url, formData, directToken = "") => {
  try {
    const headers = getHeaders(directToken);
    const requestConfig = {
      method: "put",
      url: url,
      headers: headers,
      data: formData,
    };
    const res = await axios.put(url, formData, headers);
    return { status: res.status, data: res.data };
  } catch (error) {
    return { status: error.response?.status, message: error.message };
  }
};

export { _get, _post, _delete, _put };
