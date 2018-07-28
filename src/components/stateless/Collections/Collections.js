import React from "react";
import { connect } from "react-redux";
import { NavLink, Route, withRouter, Switch, Redirect } from "react-router-dom";
import arrow from "../../../assets/arrow-19-48.png";
import CollectionPage from "../CollectionPage/CollectionPage";
import "normalize.css";
import "./Collections.css";

const Collections = (props) => {
  const keys = Object.keys(props.collections);

  const navLinks = keys.map(key => {
    const artCollection = props.collections[key];
    // return (
    //   <li>
    //     <img src={arrow} alt="" /><NavLink className="nav" to="/`${key}`">{key}</NavLink>
    //     <Route exact path="/`${key}`" render={(artCollection) => <CollectionPage artCollection={artCollection} />} />
    //   </li>
    // );
  });

  return <section className="collection-container">
    <ul>
      {/*<NavLink className="nav" to="/New World">New World</NavLink>*/}
      <NavLink className="nav" to="/Asian">Asian</NavLink>
    </ul>
    <Switch>
      {/*<Redirect to="/Asian" />*/}
      {/*<Route path="/Asian" component={CollectionPage} />*/}
      {/*<Redirect from="/" to="/New World" component={CollectionPage} />*/}
    </Switch>
  </section>;
};

export const mapStateToProps = (state) => ({
  collections: state.collections
});

export default withRouter(connect(mapStateToProps)(Collections));