import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Route, withRouter, Switch, Redirect } from "react-router-dom";
import { getCollections } from "../../../actions/actions";
import { fetchCollections } from "../../../api/api";
import Collections from "../Collections/Collections";
import CollectionPage from "../CollectionPage/CollectionPage"
import "normalize.css";
import "./App.css";
import Home from "../Home/Home";

export class App extends Component {
  constructor () {
    super()
  }

  async componentDidMount () {
    const collections = await fetchCollections();

    this.props.getCollections(collections);
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <NavLink to="/" className="home-link">
            <h1 className="app-title">MUSEO Talk</h1>
          </NavLink>
        </header>
        <Route exact path="/" component={Home}/>
        <Route exact path="/Asian" component={CollectionPage}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCollections: collections => dispatch(getCollections(collections))
});

export default withRouter(connect(null, mapDispatchToProps)(App));
