import React from "react";
import { Helmet } from "react-helmet";

class DetailsPage extends React.Component {
  constructor(props){
    super(props);
    
  }
  render() {
    console.log(this.props);
    return (
      <div className="detailsPage">
        <Helmet>
          <title>Details Page</title>
        </Helmet>
        <h1>Details Page</h1>
        <h3 className="detailsPage-underTitle">Details about (movie name)</h3>
      </div>
    );
  }
}

export default DetailsPage;
