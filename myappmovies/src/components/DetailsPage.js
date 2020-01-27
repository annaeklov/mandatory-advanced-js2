import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import GetMovieApi from "../api/GetMovieApi.js";

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      onErrorGet: false
    };
  }

  /* ------ METOD ------ */

  componentDidMount() {
    let id = this.props.match.params.id; // det som står bakom details/ i webläsaren, har bestämts i App.js route
    GetMovieApi(id) // hämtar info om just detta ID.
      .then(response => {
        if (response.status === 200) {
          this.setState({ movie: response.data });
        } else {
          this.setState({ onErrorGet: true });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ onErrorGet: true });
      });
  }

  /* ------ RENDER ------ */

  render() {
    let errorP = <p>Oops, the movie does not exist. Go back and try again..</p>;

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
              {this.state.movie.rating} 
              <i className="fa fa-star"></i>
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

    /* ------ RETURN ------ */

    return (
      <div className="detailsPage">
        <Helmet>
          <title>Details Page</title>
        </Helmet>

        <h1 className="detailsPage-title">DETAILS PAGE</h1>
        {this.state.onErrorGet ? errorP : allDetails}
      </div>
    );
  }
}

export default DetailsPage;
