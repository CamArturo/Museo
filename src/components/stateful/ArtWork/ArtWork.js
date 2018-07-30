import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { Route } from "react-router";
import { getComments, postComment } from "../../../actions/actions";
import { fetchComments, sendCommentToDB } from "../../../api/api";
import "normalize.css";
import "./Artwork.css";
import { Link, withRouter } from "react-router-dom";
import backBtnImage from "../../../assets/arrow-61-48.png"

export class ArtWork extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: "",
      comments: ""
    };

    this.socket = io("localhost:4000");

    this.socket.on("RECEIVE_MESSAGES", (data) => {
      this.props.postComment(data);
    });

    this.sendComment = (event) => {
      this.socket.emit("SEND_COMMENT", {
        username: this.state.username,
        comment: this.state.comment
      });
    };
  }

  async componentDidMount () {
    const comments = await fetchComments();
    // goes into store
    this.props.getComments(comments);
  }

  handleChange () {
    this.sendComment(); //to socket
    sendCommentToDB(this.state.comment, this.props.artwork.id);
    this.setState({comment: ""});
  }

  displayArtwork = () => {
    const filteredComments = this.props.comments.filter((comment) => {
      return comment.artwork_id === this.props.artwork.id
    });
    const allComments = filteredComments.map((comment, index) => <li key={`key${index}`}>{comment.comment}</li>);

    // artwork:
    //   category
    //     :
    //     "asian"
    //   id
    //     :
    //     487
    //   image_link
    //     :
    //   page_link
    //     :
    //     "https://denverartmuseum.org/object/1967.18"
    const endpoint = this.props.match.params.category;
    const category = endpoint.replace(/_/g, ' ');

    return (
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
        <button onClick={() => this.handleChange()}>Submit</button>
        <ul className="artwork-comments-container">
          <h3>Previous Comments</h3>
          {allComments}
        </ul>
      </div>
    );
  };

  render () {

    return (
      <section className="artwork-page-container">
        {
          // Object.keys(this.props.artwork).length > 0 ?
          this.displayArtwork()
        }
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  comments: state.comments
});

export const mapDispatchToProps = (dispatch) => ({
  getComments: comments => dispatch(getComments(comments)),
  postComment: comment => dispatch(postComment(comment))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtWork));