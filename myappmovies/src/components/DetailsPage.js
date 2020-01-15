import React from "react";
import { Helmet } from 'react-helmet';

class DetailsPage extends React.Component {
  render() {
    return (
      <div className="detailsPage">
        <Helmet>
          <title>Details Page</title>
        </Helmet>
        <h1>Details Page</h1>
      </div>
    );
  }
}

export default DetailsPage;