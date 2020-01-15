import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>HEADER</h1>
        <nav>
          <Link to="/">Main Page</Link>
          <br />
          <Link to="/add">Add page</Link>
          <br />
          <Link to="/edit/:id">Edit page</Link>
          <br />
          <Link to="/details/:id">Details page</Link>
        </nav>
      </header>
    );
  }
}

export default Header;

