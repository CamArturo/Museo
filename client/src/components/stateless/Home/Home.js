import React, { Component } from "react";
import Collections from "../Collections/Collections";
import "normalize.css";

export class Home extends Component {
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
          <input type="text" placeholder="Search for an art piece" name="search-collections" />
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