import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import Form from "./Form.js";
import Postapi from "../api/Postapi.js";

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
      isPosted: false,
      invalidInput: false,
      onErrorPost: false
    };
    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDirector = this.handleChangeDirector.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
  }

  /* ------ METODER ------ */

  handleAddMovie(e) {
    e.preventDefault();
    if (
      // hanterar OM only whitespace i input
      this.state.movie.title.trim().length === 0 ||
      this.state.movie.director.trim().length === 0 ||
      this.state.movie.description.trim().length === 0
    ) {
      this.setState({ invalidInput: true });
      this.setState({
        movie: { title: "", director: "", description: "", rating: 0 }
      }); // nollställer input
      return;
    }
    Postapi(this.state.movie)
      .then(res => {
        if (res.status === 201) {
          this.setState({ isPosted: true });
        }
      })
      .catch(error => {
        this.setState({ onErrorPost: true });
      });
  }

  handleChangeTitle(e) {
    this.setState({ movie: { ...this.state.movie, title: e.target.value } }); // "..." menas att movie får all info innan, plus den nya titeln
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

  /* ------ RENDER ------ */

  render() {
    return (
      <div className="addPage">
        <Helmet>
          <title>Add page</title>
        </Helmet>
        {this.state.isPosted && <Redirect to="/" />}

        <h1 className="addPage-title">ADD PAGE</h1>
        <h3 className="addPage-formTitle">Add a new movie</h3>

        {/* från form.js, skickar med dessa metoder in i form.js*/}
        <Form
          movie={this.state.movie}
          handleSubmit={this.handleAddMovie}
          handleTitle={this.handleChangeTitle}
          handleDirector={this.handleChangeDirector}
          handleDescription={this.handleChangeDescription}
          handleRating={this.handleChangeRating}
          submitButtonText="Add"
        />

        {this.state.invalidInput && (
          <p style={{ color: "red" }}>
            Invalid input, whitespaces <b>only</b> are not allowed..
          </p>
        )}
        {this.state.onErrorPost && (
          <h3 className="addPageError">Error, serverfel..</h3>
        )}
      </div>
    );
  }
}

export default AddPage;
