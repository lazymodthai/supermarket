import { Box, Button, Link } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

// Form
import FormProduct from "./FormProduct";
import { useEffect, useState } from "react";
import FormSupplier from "./FormSupplier";
import FormEmployee from "./FormEmployee";
import FormMember from "./FormMember";
import FormSell from "./FormSell";
import FormLogin from "./FormLogin";
import Typo from "../components/Typo";
import Dashboard from "./Dashboard";
import Swal from "sweetalert2";

export default function Main() {
  const buttonStyle = {
    marginBottom: "16px",
    height: 62,
    fontSize: 24,
    fontFamily: "Pridi",
  };
  const [menu, setMenu] = useState<number>(0);
  const [employee, setEmployee] = useState<any>();

  useEffect(() => {
    const emp: any = localStorage.getItem("employee");
    const emp2: any = JSON.parse(emp);
    if (emp) setEmployee(emp2);
  }, []);

  useEffect(() => {
    employee ? setMenu(6) : setMenu(0);
  }, [employee]);

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
              disabled={!employee}
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
              disabled={!employee}
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
              disabled={!employee}
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
              disabled={!employee}
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
              disabled={!employee}
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
              disabled={!employee}
            >
              ขายสินค้า
            </Button>
            <Box sx={{ color: "black", display: "flex", gap: 2 }}>
              {`พนักงาน: ${employee ? employee?.name : "โปรดเข้าสู่ระบบ"}`}
              {employee ? (
                <Link
                  onClick={() => {
                    localStorage.removeItem("employee");
                    setEmployee("");
                  }}
                >
                  ออกจากระบบ
                </Link>
              ) : (
                ""
              )}
            </Box>
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
          {menu === 0 && <FormLogin employee={employee} />}
          {menu === 1 && <FormProduct employee={employee} />}
          {menu === 2 && <FormSupplier employee={employee} />}
          {menu === 3 && <FormEmployee employee={employee} />}
          {menu === 4 && <FormMember employee={employee} />}
          {menu === 5 && <Dashboard employee={employee} />}
          {menu === 6 && <FormSell employee={employee} />}
        </Grid2>
      </Grid2>
    </>
  );
}
