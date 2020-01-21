import axios from "axios";

function Putapi(id, movie) {

  return axios
    .put("http://3.120.96.16:3001/movies/" + id, movie)

    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
      return "Error";
    });
}
export default Putapi;
