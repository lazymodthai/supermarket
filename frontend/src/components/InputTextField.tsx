import { TextField } from "@mui/material";

interface InputProps {
  onChange: (e: any) => void;
  label: string;
  value?: any;
  type?: "password" | "text" | "number";
  required?: boolean;
  placeholder?: string;
  style?: any;
  helperText?: any;
  maxLength?: any;
  error?: boolean;
}

export default function InputTextField(props: InputProps) {
  return (
    <TextField
      type={props.type || "text"}
      label={props.label}
      onChange={props.onChange}
      fullWidth
      value={props.value}
      InputLabelProps={{
        sx: {
          fontSize: "1em",
          fontFamily: "Pridi",
        },
      }}
      inputProps={{ maxLength: props.maxLength }}
      style={{ ...props.style }}
      placeholder={props.placeholder}
      required={props.required}
      helperText={props.helperText}
      error={props.error}
    />
  );
}
