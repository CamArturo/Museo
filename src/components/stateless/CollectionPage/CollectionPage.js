import React, { Component } from "react";
import { connect } from "react-redux";

export class CollectionPage extends Component {

  displayCollection = () => {
    const category = this.props.match.params.category;

    const artworks = this.props.collections[category].map(art => {
      const {id, artist, title, year, image_link, page_link} = art;
      return (
        <li id={id}>
          <img src={image_link} alt={`${title}`} />
          <a href={page_link}>link to museum page</a>
          <p>{title}</p>
          <p>{artist}</p>
          <p>{year}</p>
        </li>
      );
    });
    return (
      <ul>
        {artworks}
      </ul>
    );
  };

  render () {
    console.log(this.props)
    console.log(this.props.collections);
    return (
      <div>
        {
          Object.keys(this.props.collections).length > 0 ?
          this.displayCollection() : console.log("no collection")
        }
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  collections: state.collections
});

export default connect(mapStateToProps)(CollectionPage);