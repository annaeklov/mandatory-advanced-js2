import React from "react";

// Form är bara en "dum" komponent som kan användas på flera ställen, får props från andra .js-filer
// barn till add.js och edit.js, syns pga de använder Form.js i sin return och skickar med metoder till Form.js

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main className="form-formWrapper">
        <form onSubmit={this.props.handleSubmit}> {/* kommer från add.js och/eller edit.js*/}
          <div className="form-titleAndDirector">
            <label name="title">Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Title (max 40 characters)"
              required
              autoFocus
              minLength="1"
              maxLength="40"
              onChange={this.props.handleTitle} // kommer från add.js och/eller edit.js
              value={this.props.movie.title} // kommer från add.js och/eller edit.js
            />
            <label name="director">Director:</label>
            <input
              type="text"
              name="director"
              placeholder="Director (max 40 characters)"
              required
              minLength="1"
              maxLength="40"
              onChange={this.props.handleDirector}
              value={this.props.movie.director}
            />
          </div>
          <div className="form-description">
            <label name="description">Description:</label>
            <textarea
              name="description"
              placeholder="Add description here (max 300 characters)"
              required
              minLength="1"
              maxLength="300"
              onChange={this.props.handleDescription}
              value={this.props.movie.description}
            />
          </div>
          <div className="form-rating">
            <label name="rating">Rating (0-5):</label>
            <input
              type="range"
              name="rating"
              min="0"
              max="5"
              step="0.5"
              onChange={this.props.handleRating}
              value={this.props.movie.rating}
            />
            <output name="rating">{this.props.movie.rating} /5</output>
          </div>
          <div className="form-submitBtn">
            <input type="submit" value={this.props.submitButtonText} />
          </div>
        </form>
      </main>
    );
  }
}

export default Form;
