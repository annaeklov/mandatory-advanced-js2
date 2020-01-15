import React from "react";

class Form extends React.Component {
  render() {
    return (
      <main className="form-formWrapper">
        <form>
          <div className="form-titleAndDirector">
            <label name="title">Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              minLength="1"
              maxLength="40"
            />
            <label name="director">Director:</label>
            <input
              type="text"
              name="director"
              placeholder="Director"
              required
              minLength="1"
              maxLength="40"
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
            />
          </div>
          <div className="form-rating">
            <label name="rating">Rating (0-5):</label>
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              min="0"
              max="5"
              step="0.5"
              required
            />
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
