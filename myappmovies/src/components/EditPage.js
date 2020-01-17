import React from "react";
import { Helmet } from "react-helmet";
import Form from "./Form.js";
import GetMovieApi from "../api/GetMovieApi.js";
import Putapi from "../api/Putapi.js";
import { Redirect } from "react-router-dom";

class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: "",
        director: "",
        description: "",
        rating: 0
      },
      isPosted: false
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDirector = this.handleChangeDirector.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.handleEditMovie = this.handleEditMovie.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    GetMovieApi(id).then(data => this.setState({ movie: data }));
  }

  handleChangeTitle(e) {
    this.setState({ movie: { ...this.state.movie, title: e.target.value } });
  }

  handleChangeDirector(e) {
    this.setState({ movie: { ...this.state.movie, director: e.target.value } });
  }
  handleChangeDescription(e) {
    this.setState({
      movie: { ...this.state.movie, description: e.target.value }
    });
  }
  handleChangeRating(e) {
    this.setState({ movie: { ...this.state.movie, rating: e.target.value } });
  }

  handleEditMovie(e) {
    e.preventDefault();
    let id = this.props.match.params.id;
    Putapi(id, this.state.movie).then(res => {
      if (res.status === 200) {
        this.setState({ isPosted: true });
      }
    });
  }

  render() {
    return (
      <div className="editPage">
        {this.state.isPosted && <Redirect to="/" />}
        <Helmet>
          <title>Edit Page</title>
        </Helmet>
        <h1>Edit Page</h1>
        <h3 className="editPage-formTitle">Edit (movie name)</h3>
        <Form
          movie={this.state.movie}
          handleSubmit={this.handleEditMovie}
          handleTitle={this.handleChangeTitle}
          handleDirector={this.handleChangeDirector}
          handleDescription={this.handleChangeDescription}
          handleRating={this.handleChangeRating}
        />
      </div>
    );
  }
}

export default EditPage;
