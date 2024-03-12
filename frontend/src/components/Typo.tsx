import { Typography } from "@mui/material";

interface TypoProps {
  value: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5";
  sx?: any;
}

export default function Typo(props: TypoProps) {
  return (
    <Typography
      variant={props.variant || "h4"}
      color={"#2851A7"}
      sx={{ fontFamily: "Pridi", ...props.sx }}
    >
      {props.value}
    </Typography>
  );
}
