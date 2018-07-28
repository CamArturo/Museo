import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { Route } from 'react-router';
import { getComments, postComment } from "../../../actions/actions";
import { fetchComments, sendCommentToDB } from "../../../api/api";
import "normalize.css";

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
    sendCommentToDB(this.state.comment);
    this.setState({comment: ""});
  }

  render () {
    const allComments = this.props.comments.map((comment, index) => <li key={`key${index}`}>{comment.comment}</li>);
    return (
      <div>
        <textarea id="comment-box" name="comment-box"
                  rows="3" cols="33" maxLength="200"
                  wrap="hard" value={this.state.comment}
                  onChange={(event) => this.setState({comment: event.target.value})} placeholder="Enter Comment">
        </textarea>

        <button onClick={() => this.handleChange()}>Submit</button>
        <ul>
          {allComments}
        </ul>
      </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(ArtWork);