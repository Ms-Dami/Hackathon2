import React from "react";
import "./CommentsForm.scss";
import Button from "../Button/Button";
import commentIcon from "../../assets/images/add_comment.svg";
import Avatar from "../Avatar/Avatar";

const CommentsForm = () => {
  return (
    <div className="new-comment">
      <Avatar extraClass="new-comment__avatar" />
      <form className="new-comment__form">
        <h2>JOIN THE CONVERSATION</h2>
        <div className="new-comment__container">
          <input
            type="text"
            className="new-comment__input"
            placeholder="Add a new comment"
          />
          <Button buttonIcon={commentIcon} buttonText="COMMENT" />
        </div>
      </form>
    </div>
  );
};

export default CommentsForm;
