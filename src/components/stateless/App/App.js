import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Route, withRouter} from "react-router-dom";
import { getCollections } from "../../../actions/actions";
import { fetchCollections } from "../../../api/api";
import CollectionPage from "../CollectionPage/CollectionPage"
import Home from "../Home/Home";
import "normalize.css";
import "./App.css";

export class App extends Component {

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
        <Route path="/:category" component={CollectionPage}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCollections: collections => dispatch(getCollections(collections))
});

export default withRouter(connect(null, mapDispatchToProps)(App));
