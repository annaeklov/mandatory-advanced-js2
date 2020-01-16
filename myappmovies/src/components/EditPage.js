import React from "react";
import { Helmet } from "react-helmet";
import Form from "./Form.js";

class EditPage extends React.Component {
/*       constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: "hej",
        director: "hallå",
        description: "sf",
        rating: 0
      },
      isPosted: false
    }; */

 
  componentDidMount(){
    console.log("did mount")
  } 
   /* 
  handleChangeTitle(e) {
    this.setState({ });
  }
  handleChangeDirector(e) {
    this.setState({ });
  }
  handleChangeDescription(e) {
    this.setState({ });
  }
  handleChangeRating(e) {
    this.setState({ });
  } */

  render() {
    return (
      <div className="editPage">
        <Helmet>
          <title>Edit Page</title>
        </Helmet>
        <h1>Edit Page</h1>
        <h3 className="editPage-formTitle">Edit (movie name)</h3>
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

export default EditPage;
