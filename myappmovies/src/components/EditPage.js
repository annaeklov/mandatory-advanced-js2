import React from "react";
import { Helmet } from "react-helmet";
import Form from "./Form.js";

class EditPage extends React.Component {
  render() {
    return (
      <div className="editPage">
        <Helmet>
          <title>Edit Page</title>
        </Helmet>
        <h1>Edit Page</h1>
        <h3 className="editPage-formTitle">Edit movie</h3>
        <Form />
      </div>
    );
  }
}

export default EditPage;
