import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.js";
import MainPage from "./components/MainPage.js";
import AddPage from "./components/AddPage.js";
import EditPage from "./components/EditPage.js";
import DetailsPage from "./components/DetailsPage.js";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={MainPage} />
          <Route path="/add" component={AddPage} />
          <Route path="/edit/:id" component={EditPage} />
          <Route path="/details/:id" component={DetailsPage} />
        </div>
      </Router>
    );
  }
}

export default App;
