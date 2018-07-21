import React, { Component } from "react";
import "normalize.css";
import "./App.css";

class App extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img className="App-logo" alt="logo" />*/}
          <h1 className="App-title">MUSEO Talk</h1>
        </header>
        <section className="cta">
          <h2>Engage with other visitors via chat and comments while browsing your favorite art pieces.</h2>
        </section>
      </div>
    );
  }
}

export default App;