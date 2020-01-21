import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <main className="form-formWrapper">
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-titleAndDirector">
            <label name="title">Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              autoFocus
              minLength="1"
              maxLength="40"
              onChange={this.props.handleTitle}
              value={this.props.movie.title}
            />
            <label name="director">Director:</label>
            <input
              type="text"
              name="director"
              placeholder="Director"
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
              placeholder="Add description here"
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
            <input type="submit" value="Done" />
          </div>
        </form>
      </main>
    );
  }
}

export default Form;
