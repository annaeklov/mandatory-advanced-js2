import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1 className="header-title"><img src="https://fontmeme.com/permalink/200116/3b5126999e046444deb0d7afe4af3546.png" alt="Header Title"></img></h1>
        <nav>
          <Link className="nav-link" to="/">See all movies</Link>
          <br />
          <Link className="nav-link" to="/add">Add a new movie</Link>
          <br />
        </nav>
      </header>
    );
  }
}

export default Header;

