import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1 className="header-title">MOVIES-APP</h1>
        <nav>
          <Link className="nav-link" to="/">Main page</Link>
          <br />
          <Link className="nav-link" to="/add">Add a new movie</Link>
          <br />
          <Link className="nav-link" to="/edit/:id">Edit Page</Link>
          <br />
          <Link className="nav-link" to="/details/:id">Details Page</Link>
        </nav>
      </header>
    );
  }
}

export default Header;

