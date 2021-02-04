import axios from "axios";

const instance = axios.create({
  baseURL: "https://uditsolutions.in/vinrajbackend/public/api/",
});

export default instance;
