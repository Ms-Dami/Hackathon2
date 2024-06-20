import React from "react";
import "./Comments.scss";
import CommentsForm from "../CommentsForm/CommentsForm";
import CommentsList from "../CommentsList/CommentsList";

const Comments = ({ video }) => {
  const { comments } = video;

  const commentNumber = comments.length;

  return (
    <section className="comment-section">
      <h3 className="comment-section__header">{commentNumber} Comments</h3>
      <CommentsForm />
      <CommentsList video={video} />
    </section>
  );
};

export default Comments;
