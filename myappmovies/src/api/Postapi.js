import axios from "axios";

function Postapi(movie) {

  return axios
    .post("http://3.120.96.16:3001/movies", movie)

    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
      return "Error";
    });
}
export default Postapi;
