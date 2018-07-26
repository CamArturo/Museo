import React from "react";

const Comments = ({comments}) => {
  const allComments = comments.map((comment, index) => <p key={`key${index}`}>{comment.comment}</p>);

  return (
    allComments
  );
};

export default Comments;