import React from "react";
import { Helmet } from "react-helmet";
import Getapi from "../api/Getapi.js";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: []
    };
  }

  componentDidMount() {
    Getapi().then(data => this.setState({ moviesList: data }));
  }

  render() {

    return (
      <div className="mainPage">
        <Helmet>
          <title>Main page</title>
        </Helmet>
        <h1>Main page</h1>
        <div className="mainPage-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Director</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {this.state.moviesList.map(movie => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>{movie.director}</td>
                  <td> 
                    <i className="fa fa-star" style={{ color: "#ffcc00" }}></i>
                    {movie.rating} <b>/5</b>
                  </td>
                  <td>{<button>Edit movie</button>}</td>
                  <td>{<button>Delete movie</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MainPage;
