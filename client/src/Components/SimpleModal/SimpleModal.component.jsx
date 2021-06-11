import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fab from "@material-ui/core/Fab";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

import axios from "axios";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    width: "100%",
    maxWidth: "500px",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    borderRadius: "0",
    padding: "2em",
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 350,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({ link }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [commentValue, setName] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const trimmedComment = commentValue.trim();
    if (trimmedComment !== "") {
      const commentInfo = {
        comment: commentValue,
        parent: link,
      };

      await axios.post("/comments/addcomment", commentInfo);

      window.location.reload(false);
    }
  };

  return (
    <div className="centeredDiv">
      <Fab onClick={handleOpen}>
        <ChatBubbleIcon />
      </Fab>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <form onSubmit={handleSubmit} className="commentForm">
            <textarea
              className="textInput"
              type="text"
              placeholder="Write a comment"
              value={commentValue}
              onChange={(e) => setName(e.target.value)}
            />
            <input className="submitInput" type="submit" />
          </form>
        </div>
      </Modal>
    </div>
  );
}
