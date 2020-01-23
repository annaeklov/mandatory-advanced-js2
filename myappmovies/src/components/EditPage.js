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
        rating: 0,
        onError: false
      },
      isPosted: false,
      invalidInput: false
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDirector = this.handleChangeDirector.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.handleEditMovie = this.handleEditMovie.bind(this);
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
    if (
      this.state.movie.title.trim().length == 0 ||
      this.state.movie.director.trim().length == 0 ||
      this.state.movie.description.trim().length == 0
    ) {
      this.setState({ invalidInput: true });
      this.setState({
        movie: { title: "", director: "", description: "", rating: 0}
      });

      console.log("invalid input");
      return;
    }
    let id = this.props.match.params.id;
    Putapi(id, this.state.movie)
      .then(res => {
        if (res.status === 200) {
          this.setState({ isPosted: true });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let errorP = (
      <p>Oops, the movie does not exist anymore. Go back and try again..</p>
    );

    let editForm = (
      <>
        <h3 className="editPage-formTitle">
          Edit movie: {this.state.movie.title}
        </h3>
        <Form
          movie={this.state.movie}
          handleSubmit={this.handleEditMovie}
          handleTitle={this.handleChangeTitle}
          handleDirector={this.handleChangeDirector}
          handleDescription={this.handleChangeDescription}
          handleRating={this.handleChangeRating}
        />
      </>
    );
    return (
      <div className="editPage">
        {this.state.isPosted && <Redirect to="/" />}
        <Helmet>
          <title>Edit Page</title>
        </Helmet>
        <h1>Edit Page</h1>
        {this.state.onError ? errorP : editForm}
        {this.state.invalidInput && (
          <p style={{ color: "red" }}>
            Invalid input, <b>only</b> whitespaces are not allowed..
          </p>
        )}
      </div>
    );
  }
}

export default EditPage;
