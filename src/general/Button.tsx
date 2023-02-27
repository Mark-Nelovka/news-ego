import { Button } from "@mui/material";
import React from "react";

interface IButton {
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  style?: string;
  disabled?: boolean;
  variant?: "text" | "outlined" | "contained" | undefined;
}

function ButtonGen({ children, onClick, style, disabled, variant }: IButton) {
  return (
    <Button
      variant={variant}
      disabled={disabled}
      type="submit"
      onClick={onClick}
      className={style}
    >
      {children}
    </Button>
  );
}

export default ButtonGen;
