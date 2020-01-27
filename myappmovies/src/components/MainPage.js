import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Getapi from "../api/GetMoviesApi.js";
import DeleteApi from "../api/DeleteApi.js";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      moviesList: [],
      onErrorDel: false,
      onErrorGet: false,
      search: ""
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  /* ------ METODER ------ */

  componentDidMount() {
    Getapi()
      .then(data => this.setState({ moviesList: data, loading: false }))
      .catch(err => this.setState({ onErrorGet: true }));
  }

  handleDelete(id) {
    DeleteApi(id)
      .then(response => {
        if (response.status === 204) {
          Getapi().then(data => this.setState({ moviesList: data }));
        } else {
          this.setState({ onErrorDel: true });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ onErrorDel: true });
      });
  }

  updateSearch(e) {
    this.setState({ search: e.target.value.substr(0, 40) });
  }

  /* ------ RENDER ------ */

  render() {
    // hanterar searchbar
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
          placeholder="Search title or director"
          value={this.state.search}
          onChange={this.updateSearch}
        />
      </div>
    );

    let main;

    if (this.state.loading === false) {
      if (this.state.moviesList.length) {
        main = wholeTable;
      } else {
        main = noMovies("Oops, the table is empty.. Add a new movie!");
      }
    } else main = noMovies("Loading...");

    /* ------ RETURN ------ */

    return (
      <div className="mainPage">
        <Helmet>
          <title>Main page</title>
        </Helmet>
        <h1 className="mainPage-title">ALL MOVIES</h1>
        {searchBar}
        {this.state.onErrorDel && (
          <h3 style={{ color: "red" }}>
            Oops, the movie doesn't exist anymore..
          </h3>
        )}

        {filteredSearch.length === 0 &&
          this.state.search.length > 0 &&
          noMovies("No title or director found..")}

        <div className="mainPage-table">{main}</div>

        <div className="mainPage-bottom">
          {this.state.onErrorGet && (
            <h3 className="mainPageError">Error, serverfel..</h3>
          )}
        </div>
      </div>
    );
  }
}

export default MainPage;
