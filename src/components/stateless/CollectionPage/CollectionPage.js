import React from "react";
import { connect } from "react-redux";

const CollectionPage = (props) => {
  const category = props.match.params.category
  console.log(props)
  const artworks = props.collections[category].map(art => {
    const { id, artist, title, year, image_link, page_link } = art;
    return (
      <li id={id}>
        <img src={image_link} alt={`image of ${title}`} />
        <a href={page_link}>link to museum page</a>
        <p>{title}</p>
        <p>{artist}</p>
        <p>{year}</p>
      </li>
    )
  });

  return (
    <ul>
      {artworks}
    </ul>
  )
};

export const mapStateToProps = (state) => ({
  collections: state.collections
});


export default connect(mapStateToProps)(CollectionPage);