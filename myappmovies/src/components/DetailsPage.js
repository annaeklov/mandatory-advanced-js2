import React from "react";
import { Helmet } from "react-helmet";
import GetMovieApi from "../api/GetMovieApi.js";

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
        <h3 className="detailsPage-underTitle">Details about: {this.state.movie.title}</h3>
      </div>
    );
  }
}

export default DetailsPage;
