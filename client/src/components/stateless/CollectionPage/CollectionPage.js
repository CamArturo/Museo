import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./CollectionPage.css";

export class CollectionPage extends Component {

  displayCollection = () => {
    const endpoint = this.props.match.params.category;
    const category = endpoint.replace(/_/g, " ");

    const artworks = this.props.collections[category].map(art => {
      const {id, artist, title, year, image_link, page_link} = art;
      return (
        <li className="artwork-item" key={id}>
          <section className="artwork-top">
            <a className="art-museum-link" href={page_link}>Link to Museum Page</a>
            <img src={image_link} alt={`${title}`} />
            <section className="artwork-info">
              <span className="artwork-artist-tag">artist</span>
              <p className="artwork-artist">{artist}</p>
              <p className="artwork-title">{title}</p>
              <p className="artwork-year">{year}</p>
              <button className="chat-btn">
                <Link to={`/${endpoint}/${id}`}>Chat about this work!  &gt;</Link>
              </button>
            </section>
          </section>
        </li>
      );
    });

    return (
      <section className="collection-page-container">
        <h2>{category}</h2>
        <p>({this.props.collections[category].length}) Pieces</p>
        <ul>
          {artworks}
        </ul>
      </section>
    );
  };

  render () {
    return (
      <div>
        {
          Object.keys(this.props.collections).length > 0 ?
            this.displayCollection() : ""
        }
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  collections: state.collections
});

export default withRouter(connect(mapStateToProps)(CollectionPage));