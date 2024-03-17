import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import InputTextField from "../components/InputTextField";
import { useEffect, useState } from "react";
import axios from "axios";

interface PropsLogin {
  employee?: any;
}

export default function FormLogin(props: PropsLogin) {
  const [pw, setPw] = useState<any>("");
  const [err, setErr] = useState<any>("");
  const baseUrl = "http://localhost:4900";
  useEffect(() => {
    if (String(pw).length === 6) {
      axios
        .post(`${baseUrl}/employee/login`, { password: pw })
        .then((response) => {
          const { password, ...data } = response.data[0];
          localStorage.setItem("employee", JSON.stringify(data));
          window.location.reload();
        })
        .catch(() => setErr("รหัสผ่านผิด"));
    } else {
      setErr("");
    }
  }, [pw]);

  return (
    <Grid2
      container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"80vh"}
    >
      <InputTextField
        type={"password"}
        label="รหัสผ่าน"
        placeholder="ป้อนรหัสผ่าน"
        onChange={(e) => setPw(e.target.value)}
        style={{ width: "20vw" }}
        maxLength={6}
        helperText={err}
      />
    </Grid2>
  );
}
