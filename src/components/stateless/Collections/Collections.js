import React from "react";
import { connect } from "react-redux";
import { NavLink, Route, withRouter } from "react-router-dom";
import arrow from "../../../assets/arrow-19-48.png";
import "normalize.css";
import "./Collections.css";

const Collections = (props) => {
  const keys = Object.keys(props.collections);

  const navLinks = keys.map(key => {
    return <li><img src={arrow} alt="" /><NavLink className="nav" to="/`${key}`">{key}</NavLink></li>
  });


  return <section className="collection-container">
    <ul>
      {navLinks}
    </ul>
  </section>
};

export const mapStateToProps = (state) => ({
  collections: state.collections
});

export default withRouter(connect(mapStateToProps)(Collections));