import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import InputTextField from "../components/InputTextField";
import { useState } from "react";
import { WidthNormal } from "@mui/icons-material";

export default function FormLogin() {
  const [pw, setPw] = useState<any>("");
  return (
    <Grid2
      container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"80vh"}
    >
      <InputTextField
        label="รหัสผ่าน"
        placeholder="ป้อนรหัสผ่าน"
        onChange={(e) => setPw(e.target.value)}
        style={{ width: "20vw" }}
      />
    </Grid2>
  );
}
