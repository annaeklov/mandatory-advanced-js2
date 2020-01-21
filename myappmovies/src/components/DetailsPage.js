import React from "react";
import { Helmet } from "react-helmet";
import GetMovieApi from "../api/GetMovieApi.js";
import { Link } from "react-router-dom";

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    GetMovieApi(id).then(data => this.setState({ movie: data }));
  }

  render() {
    return (
      <div className="detailsPage">
        <Helmet>
          <title>Details Page</title>
        </Helmet>
        <h1>Details Page</h1>
        <div className="detailsPage-pageTitle">
          <h3 className="detailsPage-firstTitle">Showing details about:</h3>
          <h2 className="detailsPage-movieTitle">{this.state.movie.title}</h2>
        </div>
        <div className="detailsPage-details">
          <div className="detailsPage-movieTitle">
            <h3>Title:</h3>
            <p>{this.state.movie.title}</p>
          </div>
          <div className="detailsPage-movieDirector">
            <h3>Director:</h3>
            <p>{this.state.movie.director}</p>
          </div>
          <div className="detailsPage-movieDescription">
            <h3>Description:</h3>
            <p>{this.state.movie.description}</p>
          </div>
          <div className="detailsPage-movieRating">
            <h3>Rating (0-5):</h3>
            <p>
              <i className="fa fa-star"></i>
              {this.state.movie.rating}
            </p>
          </div>
        </div>
        <Link to={"/edit/" + this.state.movie.id}>
          <i
            className="mainPage-editBtn fa fa-pencil-square-o"
            title="Edit movie"
          ></i>
        </Link>
      </div>
    );
  }
}

export default DetailsPage;
