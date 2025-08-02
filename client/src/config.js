const dev = process.env.NODE_ENV !== 'production';

const config = {
  apiBaseUrl: dev
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_API_URL
};

export default config;
