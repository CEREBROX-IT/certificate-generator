import axios from "axios";
const { VITE_REACT_APP_API_ENDPOINT } = import.meta.env;
axios.defaults.baseURL = VITE_REACT_APP_API_ENDPOINT;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
