import React, { Component } from "react";
import { connect } from "react-redux";
import Collections from "../Collections/Collections";
import Trie from "../../../autocomplete/Trie";
import artTitles from "../../../autocomplete/art-titles";
import "normalize.css";

const trie = new Trie();
trie.populate(artTitles);

export class Home extends Component {
  constructor (props) {
    super(props);

    this.state = {
      userInputSearch: "",
      suggestions: []
    };
  }

  searchTitle (userInputSearch) {
    this.setState({userInputSearch});

    const suggestions = trie.suggest(userInputSearch);

    if (suggestions.length) {
      this.setState({suggestions});
    }
  }

  findSelectedArtWork = () => {
    const keys = Object.keys(this.props.collections)
    let selectedArtWork = null;
    let count = 0

    while (!selectedArtWork) {
      selectedArtWork = this.props.collections[keys[count]].find(art => {
        return art.title.toLowerCase() === this.state.userInputSearch
      });
      count++
    }
    
    this.redirectToArtWorkPage(selectedArtWork.category, selectedArtWork.id)
  }

  redirectToArtWorkPage = (category, id) => {
    category = category.replace(/\s/g, '_')
    this.props.history.push(`/${category}/${id}`)
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
            className="search-titles-input"
            list="titles"
            value={this.state.userInputSearch}
            onChange={(event) => this.searchTitle(event.target.value)}
            type="text"
            placeholder="Search for an art piece"
            name="search-collections"
          />
          <datalist id="titles">
            {this.state.suggestions.map((title, index) => <option key={`option - ${index}`} value={title} />)}
          </datalist>
          <button disabled={!this.state.userInputSearch} onClick={this.findSelectedArtWork}>
            Go To Selection
          </button>
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

export const mapStateToProps = (state) => ({
  collections: state.collections
})

export default connect(mapStateToProps)(Home);