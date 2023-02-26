import { Button } from "@mui/material";
import React from "react";

interface IButton {
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  style?: string;
}

function ButtonGen({ children, onClick, style }: IButton) {
  return (
    <Button type="submit" onClick={onClick} className={style}>
      {children}
    </Button>
  );
}

export default ButtonGen;
