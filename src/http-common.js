import axios from "axios";

export default axios.create({
  baseURL: "http://localhost/react-api/",
  headers: {
    "Content-type": "text/json"
  }
});