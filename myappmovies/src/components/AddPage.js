import React from "react";
import { Helmet } from "react-helmet";
import Form from "./Form.js";
import axios from "axios";
import Postapi from "../api/Postapi.js";
import { Redirect } from "react-router-dom";

class AddPage extends React.Component {
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
    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDirector = this.handleChangeDirector.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
  }

  handleAddMovie(e) {
    e.preventDefault();
    Postapi(this.state.movie).then(res => {
      if (res.status === 201) {
        this.setState({isPosted: true})
      }
    });
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

  render() {
    return (
      <div className="addPage">
      {this.state.isPosted && <Redirect to="/"/>}
        <Helmet>
          <title>Add page</title>
        </Helmet>
        <h1>Add page</h1>
        <h3 className="addPage-formTitle">Add movie</h3>
        <Form
          movie={this.state.movie}
          handleSubmit={this.handleAddMovie}
          handleTitle={this.handleChangeTitle}
          handleDirector={this.handleChangeDirector}
          handleDescription={this.handleChangeDescription}
          handleRating={this.handleChangeRating}
        />
      </div>
    );
  }
}

export default AddPage;
