import React from "react";
import { connect } from "react-redux";
import { postComment } from "../../actions/actions";
import { sendCommentToDB } from "../../api/api";









const Comments = ({comments}) => {
  const allComments = comments.map((comment, index) => <p key={`key${index}`}>{comment.comment}</p>);

  return (
    allComments
  );
};

export default Comments;