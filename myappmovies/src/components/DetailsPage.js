import React from "react";
import { Helmet } from "react-helmet";
import GetMovieApi from "../api/GetMovieApi.js";
import { Link } from "react-router-dom";

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      onError: false
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    GetMovieApi(id).then(response => {
      if (response.status === 200) {
        this.setState({ movie: response.data });
      } else {
        this.setState({ onError: true });
      }
    });
  }

  render() {
    let errorP = (
      <p>Oops, the movie does not exist anymore. Go back and try again..</p>
    );

    let allDetails = (
      <>
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
          <Link to={"/edit/" + this.state.movie.id}>
            <i
              className="mainPage-editBtn fa fa-pencil-square-o"
              title="Edit movie"
            ></i>
          </Link>
        </div>
      </>
    );

    return (
      <div className="detailsPage">
        <Helmet>
          <title>Details Page</title>
        </Helmet>
        <h1 className="detailsPage-title">DETAILS PAGE</h1>
        {this.state.onError ? errorP : allDetails}
      </div>
    );
  }
}

export default DetailsPage;
