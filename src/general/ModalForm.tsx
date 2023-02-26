import React from "react";
import { Container, Modal } from "@mui/material";
import ButtonGen from "./Button";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(${"-50%"}, ${"-50%"})`,
    backgroundColor: "#fff",
    padding: 40,
    minHeight: 400,
  },
  buttonClose: {
    position: "absolute",
    top: 7,
    right: 7,
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "#ff00001b",
    padding: 0,
    minWidth: "max-content",
  },
}));

export default function ModalForm({ children, isOpen, handleClose }: IModal) {
  const classes = useStyles();
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Container maxWidth="xs" className={classes.paper}>
        <ButtonGen onClick={handleClose} style={classes.buttonClose}>
          <CloseIcon fontSize="medium" />
        </ButtonGen>
        {children}
      </Container>
    </Modal>
  );
}
