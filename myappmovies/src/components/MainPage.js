import React from "react";
import { Helmet } from "react-helmet";
import Getapi from "../api/GetMoviesApi.js";
import DeleteApi from "../api/DeleteApi.js";
import { Link } from "react-router-dom";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      error: false,
      search: ""
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    Getapi()
      .then(data => this.setState({ moviesList: data }))
      .catch(err => this.setState({ error: true }));
  }

  handleDelete(id) {
    DeleteApi(id)
      .then(response => {
        if (response.status === 204) {
          Getapi().then(data => this.setState({ moviesList: data }));
        }
      })
      .catch(err => this.setState({ error: true }));
  }

  updateSearch(e) {
    this.setState({ search: e.target.value.substr(0, 40) });
  }

  render() {
    let filteredSearch = this.state.moviesList.filter(movie => {
      return (
        movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1 ||
        movie.director
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    let wholeTable = (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Rating (0-5)</th>
          </tr>
        </thead>
        <tbody>
          {filteredSearch.map(movie => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>
                <i className="fa fa-star"></i>
                {movie.rating}
              </td>
              <td>
                <Link to={"/details/" + movie.id}>
                  <i
                    className="mainPage-detailsBtn fa fa-info-circle"
                    title="Show details about the movie"
                  ></i>
                </Link>
              </td>
              <td>
                <Link to={"/edit/" + movie.id}>
                  <i
                    className="mainPage-editBtn fa fa-pencil-square-o"
                    title="Edit movie"
                  ></i>
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

    const noMovies = message => {
      return (
        <div className="mainPage-noMovies">
          <p className="noMoviesP">{message}</p>
        </div>
      );
    };

    const searchBar = (
      <div className="searchBarDiv">
        <input
          type="text"
          id="searchBarId"
          className="searchBar"
          name="searchBar"
          placeholder="Search here"
          value={this.state.search}
          onChange={this.updateSearch}
        />
      </div>
    );

    return (
      <div className="mainPage">
        <Helmet>
          <title>Main page</title>
        </Helmet>

        <h1 className="mainPage-title">All movies</h1>
        {searchBar}

        {filteredSearch.length === 0 &&
          noMovies("No title or director found...")}

        <div className="mainPage-table">
          {this.state.moviesList.length
            ? wholeTable
            : noMovies(
                "Oops, the table is empty, no movies to show.. Add a new movie!"
              )}
        </div>

        <div className="mainPage-bottom">
          {this.state.error && <h3 className="error">Error, serverfel</h3>}
        </div>
      </div>
    );
  }
}

export default MainPage;
