import { TextField } from "@mui/material";

interface InputProps {
  onChange: (e: any) => void;
  label: string;
  value?: any;
  type?: "text" | "number";
  required?: boolean;
  placeholder?: string;
  style?: any;
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
      style={{ ...props.style }}
      placeholder={props.placeholder}
      required={props.required}
    />
  );
}
