import React from "react";
import { Helmet } from "react-helmet";
import Getapi from "../api/GetMoviesApi.js";
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
    axios.delete("http://3.120.96.16:3001/movies/" + id).then(res => {
      if (res.status === 204) {
        Getapi().then(data => this.setState({ moviesList: data }));
      }
    });
  }

  render() {
    let wholeTable = (
      <table>
        <caption className="table-caption">Movies table</caption>
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
                  <button
                    className="mainPage-delBtn"
                    onClick={() => {
                      this.handleDelete(movie.id);
                    }}
                  >
                    Delete movie
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    let noMovies= (
      <div className="mainPage-noMovies">
      <p style={{color: "red"}}>Oops, no movies to show..</p>
      </div>
    )

    return (
      <div className="mainPage">
        <Helmet>
          <title>Main page</title>
        </Helmet>
        <h1>Main page</h1>
        <div className="mainPage-table">
        
        {this.state.moviesList.length ? wholeTable : noMovies}</div>
      </div>
    );
  }
}

export default MainPage;
