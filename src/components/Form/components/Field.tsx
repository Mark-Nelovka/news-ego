import React from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";

interface IField {
  variant: "filled" | "outlined" | "standard";
  label: string;
  error: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  errorMessage: string;
  type: string;
}

export default function Field({
  variant,
  label,
  error,
  value,
  onChange,
  name,
  errorMessage,
  type,
}: IField) {
  return (
    <FormControl fullWidth sx={{ height: 100 }} error={error} margin="normal">
      <TextField
        variant={variant}
        label={label}
        error={error}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        focused
        required
      />
      <FormHelperText id="component-error-text">
        {errorMessage && errorMessage}
      </FormHelperText>
    </FormControl>
  );
}
