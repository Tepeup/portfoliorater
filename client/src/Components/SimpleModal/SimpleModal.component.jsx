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
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
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

export default function SimpleModal({ link: link }) {
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
  const [hiddenKey, setKey] = useState(Math.random());

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (commentValue !== "") {
      const commentInfo = {
        comment: commentValue,
        parent: link,
      };

      axios.post("/comments/addcomment", commentInfo);
      setKey(Math.random());
      setOpen(false);
      window.location.reload(false);
    }
  };

  return (
    <div className="centeredDiv" key={hiddenKey}>
      <Fab onClick={handleOpen}>
        <ChatBubbleIcon />
      </Fab>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <form onSubmit={handleSubmit} className="commentForm">
            <textarea
              className="textInput"
              type="text"
              placeholder="Comment"
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
