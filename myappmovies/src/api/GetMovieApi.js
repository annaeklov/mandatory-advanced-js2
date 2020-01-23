import axios from "axios";

function GetMovieApi(id) {
  return axios
    .get("http://3.120.96.16:3001/movies/" + id)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
      return "Error";
    });
}

export default GetMovieApi;
