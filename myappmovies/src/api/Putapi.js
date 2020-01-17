import axios from "axios";

function Putapi(id, movie) {
    console.log("put api")

  return axios
    .put("http://3.120.96.16:3001/movies/" + id, movie)

    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}
export default Putapi;
