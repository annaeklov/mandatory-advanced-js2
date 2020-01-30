import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import Form from "./Form.js";
import GetMovieApi from "../api/GetMovieApi.js";
import Putapi from "../api/Putapi.js";

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
      isPosted: false,
      invalidInput: false,
      onErrorGet: false,
      onErrorPut: false
    };
    this.handleEditMovie = this.handleEditMovie.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDirector = this.handleChangeDirector.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
  }

  /* ------ METODER ------ */

  componentDidMount() {
    console.log(this.props.match.params.id); // det som står efter edit/ i webbläsaren (har bestämts i App.js i route, och i Link på MainPage.js)
    let id = this.props.match.params.id; // efter att klickat på film så sätts ID i adressfältet, och ID sätts in i GetMovieApi som argument så hämtas just den filmen
    GetMovieApi(id) // filmen med just det ID:t hämtas här i GET
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
      // hanterar OM only whitespace i input
      this.state.movie.title.trim().length === 0 ||
      this.state.movie.director.trim().length === 0 ||
      this.state.movie.description.trim().length === 0
    ) {
      this.setState({ invalidInput: true });
      this.setState({
        movie: { title: "", director: "", description: "", rating: 0 }
      });
      return;
    }
    let id = this.props.match.params.id; // just det som står efter /edit i webbläsaren
    Putapi(id, this.state.movie) // PUTar filmen med det id:t, och informationen som lagts till i inputen
      .then(res => {
        if (res.status === 200) {
          this.setState({ isPosted: true });
        }
      })
      .catch(error => {
        this.setState({ onErrorPut: true });
      });
  }

  /* ------ RENDER ------ */

  render() {
    let errorP = <p>Oops, the movie does not exist. Go back and try again..</p>;
    // sätter in den klickade filmens info som fanns i ID:t in i formen
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
          submitButtonText="Edit"
        />
      </>
    );

    /* ------ RETURN ------ */

    return (
      <div className="editPage">
        <Helmet>
          <title>Edit Page</title>
        </Helmet>

        {this.state.isPosted && <Redirect to="/" />}

        <h1 className="editPage-title">EDIT PAGE</h1>
        {this.state.onErrorGet ? errorP : editForm}
        {this.state.invalidInput && (
          <p style={{ color: "red" }}>
            Invalid input, <b>only</b> whitespaces are not allowed..
          </p>
        )}
        {this.state.onErrorPut && (
          <h3 className="editPageErrorPost">Error, serverfel..</h3>
        )}
      </div>
    );
  }
}

export default EditPage;
