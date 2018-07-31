import React, { Component } from "react";
import Collections from "../Collections/Collections";
import Trie from "../../../autocomplete/Trie";
import artTitles from "../../../autocomplete/art-titles";
import "normalize.css";

const trie = new Trie;
trie.populate(artTitles);

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInputSearch: '',
      suggestions: []
    }
  }

  searchTitle(userInputSearch) {
    this.setState({ userInputSearch });

    const suggestions = trie.suggest(userInputSearch)

    if(suggestions.length) {
      this.setState({ suggestions })
    }
  }

  render () {
    return (
      <div>
        <section className="cta">
          <h2>Engage with other visitors via chat and comments while browsing your favorite art pieces.</h2>
        </section>
        <section className="login">
          <form action="">
            <input type="text" placeholder="Username" name="username" required />
            <input type="password" placeholder="Password" name="password" required />
            <button name="submit" type="submit" value="submit-true">
              Login with Gmail
            </button>
          </form>
        </section>
        <section className="art-museum">
          <img src={require("../../../assets/denver-art-museum.jpg")} alt="Denver Art Museum" />
        </section>
        <section className="search-collections">
          <h2>Search Collections.</h2>
          <input 
            list="titles" 
            value={this.state.userInputSearch}
            onChange={(event) => this.searchTitle(event.target.value)}
            type="text" 
            placeholder="Search for an art piece" 
            name="search-collections" 
          />
          <datalist id="titles">
            {this.state.suggestions.map((title) => <option value={title} /> )}
          </datalist>
        </section>
        <Collections />
        <section className="info-box">
          <img src={require("../../../assets/icon-speech-bubble-64.png")} alt="Talk Icon" />
          <p>Museo’s social app gives your museum visit a social platform to connect with other people, through comments
             and live chat, while enjoying you favorite art pieces.</p>
        </section>
      </div>
    );
  }
}

export default Home;