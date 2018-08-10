import React, { Component } from "react";
import io from "socket.io-client";
import { fetchComments, sendCommentToDB } from "../../../api/api";
import "normalize.css";
import "./Artwork.css";
import { Link, withRouter } from "react-router-dom";
import backBtnImage from "../../../assets/arrow-61-48.png";

export class ArtWork extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      comment: "",
      messages: []
    };
  //
  //   // For production
  //   // this.socket = io(window.location.hostname);
  //
  //   for local development
    this.socket = io("localhost:4000");

    this.socket.on("RECEIVE_MESSAGES", (data) => {
      this.setState({messages: [...this.state.messages, data]});
    });
  }

  async componentDidMount () {
    const comments = await fetchComments();
    this.setState((previousState) => ({messages: [...previousState, comments]}));
  }

  sendComment () {
    this.socket.emit("SEND_COMMENT", {
      username: this.state.username,
      comment: this.state.comment,
      artwork_id: this.props.artwork.id
    });
  };

  handleChange () {
    this.sendComment();
    sendCommentToDB(this.state.comment, this.props.artwork.id);
    this.setState({comment: ""});
  }

  render () {
    let filteredComments = this.state.messages.filter((comment) => {
      return comment.artwork_id === this.props.artwork.id;
    });
    filteredComments = filteredComments.reverse();
    const allComments = filteredComments.map((comment, index) => <li key={`key${index}`}>{comment.comment}</li>);

    const endpoint = this.props.category;
    const category = endpoint.replace(/\s/g, "_");

    return (
      <section className="artwork-page-container">
        <div className="artwork-piece-container">
          <section className="artwork-piece">
            <Link to={`/${category}/`}>
              <img className="back-btn" src={backBtnImage} alt="" />
            </Link>
            <img className="artwork-piece-img" src={this.props.artwork.image_link} alt={this.props.artwork.title} />
            <section className="artwork-info">
              <span className="artwork-artist-tag">artist</span>
              <p className="artwork-artist">{this.props.artwork.artist}</p>
              <p className="artwork-title">{this.props.artwork.title}</p>
              <p className="artwork-year">{this.props.artwork.year}</p>
            </section>
          </section>
          <textarea id="comment-box" name="comment-box" placeholder="THANK YOU FOR COMMENTING..."
                    rows="3" cols="33" maxLength="200"
                    wrap="hard" value={this.state.comment}
                    onChange={(event) => this.setState({comment: event.target.value})}
          />
          <button className="handle-change-btn" onClick={() => this.handleChange()}>Submit</button>
          <ul className="artwork-comments-container">
            <h3>Previous Comments</h3>
            {allComments}
          </ul>
        </div>
      </section>
    );
  }
}

export default withRouter(ArtWork);