import React, { Component } from "react";
import { connect } from "react-redux";
import { getCollections, postComment } from "../../actions/actions";
import { fetchCollections } from "../../api/api";
import Comments from "./Comments/Comments";
import "normalize.css";
import "./App.css";

export class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      comment: ""
    };
  }

  async componentDidMount () {
    const collections = await fetchCollections();

    this.props.getCollections(collections);
  }

  handleChange () {
    this.props.postComment(this.state.comment);
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">MUSEO Talk</h1>
        </header>
        <section className="cta">
          <h2>Engage with other visitors via chat and comments while browsing your favorite art pieces.</h2>
        </section>

        <textarea id="comment-box" name="comment-box"
                  rows="3" cols="33" maxLength="200"
                  wrap="hard" value={this.state.comment} onChange={(event) => this.setState({comment: event.target.value})} placeholder="Enter Comment">
        </textarea>

        <button onClick={() => this.handleChange()}>Submit</button>
        {
          this.props.comments.length > 0 ?
            <Comments comments={this.props.comments} /> : ""
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments
});

const mapDispatchToProps = (dispatch) => ({
  getCollections: collections => dispatch(getCollections(collections)),
  postComment: comment => dispatch(postComment(comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
