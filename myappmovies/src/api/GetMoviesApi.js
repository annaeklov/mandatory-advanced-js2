import axios from "axios";

function Getapi() {
  return axios
    .get("http://3.120.96.16:3001/movies")
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return "Error";
    });
}

export default Getapi;
