import React from "react";
import { Helmet } from "react-helmet";
import Getapi from "../api/GetMoviesApi.js";
import DeleteApi from "../api/DeleteApi.js";
import { Link } from "react-router-dom";
import axios from "axios";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    Getapi().then(data => this.setState({ moviesList: data }));
  }

  handleDelete(id) {
    DeleteApi(id).then(response => {
      if (response.status === 204) {
        Getapi().then(data => this.setState({ moviesList: data }));
      }
    })
    .catch(err => console.log("Error, serverfel"))
  }

  render() {
    let wholeTable = (
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
              <td>
                <Link to={"/details/" + movie.id}>
                  <button className="mainPage-detailsBtn">Show details</button>
                </Link>
              </td>
              <td>
                <Link to={"/edit/" + movie.id}>
                  <button className="mainPage-editBtn">Edit movie</button>
                </Link>
              </td>
              <td>
                {
                  <i
                    className="mainPage-delBtn fa fa-trash-o"
                    title="Delete movie"
                    onClick={() => {
                      this.handleDelete(movie.id);
                    }}
                  ></i>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    let noMovies = (
      <div className="mainPage-noMovies">
        <p>Oops, no movies to show..</p>
      </div>
    );

    return (
      <div className="mainPage">
        <Helmet>
          <title>Main page</title>
        </Helmet>

        <h1>All movies</h1>
        <div className="mainPage-table">
          {this.state.moviesList.length ? wholeTable : noMovies}
        </div>
      </div>
    );
  }
}

export default MainPage;
