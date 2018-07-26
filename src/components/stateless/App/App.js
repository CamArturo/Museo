import React, { Component } from "react";
import { connect } from "react-redux";
import { getCollections } from "../../../actions/actions";
import { fetchCollections } from "../../../api/api";
import Comments from "../Comments/Comments";
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
          <h1 className="App-title">MUSEO Talk</h1>
        </header>
        <section className="cta">
          <h2>Engage with other visitors via chat and comments while browsing your favorite art pieces.</h2>
        </section>
        <Comments />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCollections: collections => dispatch(getCollections(collections))
});

export default connect(null, mapDispatchToProps)(App);
