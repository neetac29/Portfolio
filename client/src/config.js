const isProd = process.env.NODE_ENV === "production";

const API_BASE_URL = isProd
  ? process.env.REACT_APP_API_URL // your deployed backend URL
  : process.env.REACT_APP_LOCAL_URL; // local development backend

export default API_BASE_URL;
