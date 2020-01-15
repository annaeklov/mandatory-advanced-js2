import React from "react";
import { Helmet } from "react-helmet";
import Form from "./Form.js";

class AddPage extends React.Component {
  render() {
    return (
      <div className="addPage">
        <Helmet>
          <title>Add page</title>
        </Helmet>
        <h1>Add page</h1>
        <h3 className="addPage-formTitle">Add movie</h3>
        <Form />
      </div>
    );
  }
}

export default AddPage;
