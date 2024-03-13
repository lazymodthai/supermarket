import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

// Form
import FormProduct from "./FormProduct";
import { useState } from "react";
import FormSupplier from "./FormSupplier";
import FormEmployee from "./FormEmployee";
import FormMember from "./FormMember";
import FormSell from "./FormSell";

export default function Main() {
  const buttonStyle = {
    marginBottom: "16px",
    height: 62,
    fontSize: 24,
    fontFamily: "Pridi",
  };
  const [menu, setMenu] = useState<number>(0);
  return (
    <>
      <Grid2 container xs={13}>
        <Grid2
          xs={2.5}
          height={"90vh"}
          bgcolor={"#FFF"}
          borderRadius={5}
          padding={"36px"}
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
              สินค้า
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              sx={buttonStyle}
              onClick={() => setMenu(2)}
            >
              ซัพพลายเออร์
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              sx={buttonStyle}
              onClick={() => setMenu(3)}
            >
              พนักงาน
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              sx={buttonStyle}
              onClick={() => setMenu(4)}
            >
              สมาชิก
            </Button>
          </Grid2>
          <Grid2>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              color="warning"
              sx={buttonStyle}
              onClick={() => setMenu(5)}
            >
              ดูยอดขาย
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="success"
              sx={buttonStyle}
              onClick={() => setMenu(6)}
            >
              ขายสินค้า
            </Button>
          </Grid2>
        </Grid2>
        <Grid2
          xs={8}
          // height={"90vh"}
          bgcolor={"#FFF"}
          borderRadius={5}
          margin={"16px"}
          padding={"24px 0 24px 24px"}
          boxShadow={"11px 9px 10px -9px rgba(0,0,0,0.32)"}
        >
          {menu === 0 && "1"}
          {menu === 1 && <FormProduct />}
          {menu === 2 && <FormSupplier />}
          {menu === 3 && <FormEmployee />}
          {menu === 4 && <FormMember />}
          {menu === 6 && <FormSell />}
        </Grid2>
      </Grid2>
    </>
  );
}
