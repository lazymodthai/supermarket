import { Button, Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

// Form
import FormProduct from "./FormProduct";
import { useState } from "react";
import FormSupplier from "./FormSupplier";

export default function Main() {
  const buttonStyle = {
    marginBottom: "16px",
    height: 62,
    fontSize: 24,
    fontFamily: "Pridi",
  };
  const [menu, setMenu] = useState<number>();
  return (
    <>
      <Grid2 container xs={13}>
        <Grid2
          xs={2}
          height={"90vh"}
          bgcolor={"#FFF"}
          borderRadius={5}
          padding={"46px"}
          margin={"16px"}
          boxShadow={"11px 9px 10px -9px rgba(0,0,0,0.32)"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Grid2>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              sx={buttonStyle}
              onClick={() => setMenu(1)}
            >
              เพิ่มสินค้า
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              sx={buttonStyle}
              onClick={() => setMenu(2)}
            >
              เพิ่มซัพพลายเออร์
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              sx={buttonStyle}
            >
              เพิ่มพนักงาน
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              sx={buttonStyle}
              onClick={() => setMenu(3)}
            >
              เพิ่มสมาชิก
            </Button>
          </Grid2>
          <Grid2>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              color="warning"
              sx={buttonStyle}
              onClick={() => setMenu(4)}
            >
              ดูยอดขาย
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="success"
              sx={buttonStyle}
              onClick={() => setMenu(5)}
            >
              ขายสินค้า
            </Button>
          </Grid2>
        </Grid2>
        <Grid2
          xs={9}
          height={"90vh"}
          bgcolor={"#FFF"}
          borderRadius={5}
          margin={"16px"}
          padding={"46px"}
          boxShadow={"11px 9px 10px -9px rgba(0,0,0,0.32)"}
        >
          {menu === 1 && <FormProduct />}
          {menu === 2 && <FormSupplier />}
        </Grid2>
      </Grid2>
    </>
  );
}
