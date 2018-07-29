import React from "react";
import { connect } from "react-redux";
import { NavLink, Route, withRouter } from "react-router-dom";
import arrow from "../../../assets/arrow-19-48.png";
import CollectionPage from "../CollectionPage/CollectionPage";
import "normalize.css";
import "./Collections.css";

const Collections = ({ collections }) => {
  const keys = Object.keys(collections);

  const navLinks = keys.map(key => {
    const endpoint = key.replace(/\s/g, '_');
    return (
      <li>
        <img src={arrow} alt="" />
        <NavLink className="nav" to={`/${endpoint}`}>{key}</NavLink>
        <Route 
          path={`/${endpoint}`} 
          component={CollectionPage}
        />
      </li>
    );
  });

  return <section className="collection-container">
    <ul>
      {navLinks}
    </ul>
    
  </section>;
};

export const mapStateToProps = (state) => ({
  collections: state.collections
});

export default withRouter(connect(mapStateToProps)(Collections));