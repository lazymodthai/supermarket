import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import InputTextField from "../components/InputTextField";
import Typo from "../components/Typo";

interface formData {
  name: string;
  address: string;
  contactName: string;
  tel: string;
}

export default function FormSupplier() {
  const formInit = { name: "", address: "", contactName: "", tel: "" };
  const [formData, setFormData] = useState<formData>(formInit);
  const buttonStyle = {
    marginBottom: "16px",
    height: 62,
    fontSize: 24,
    fontFamily: "Pridi",
  };
  return (
    <>
      <Grid2
        container
        gap={4}
        display={"flex"}
        flexDirection={"column"}
        xs={12}
      >
        <Grid2 xs={12}>
          <Typo value="เพิ่มซัพพลายเออร์" />
        </Grid2>
        <Grid2 container xs={4} gap={4}>
          <InputTextField
            label={"ชื่อซัพพลายเออร์"}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <InputTextField
            label={"ที่อยู่"}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <InputTextField
            label={"ชื่อผู้ติดต่อ"}
            onChange={(e) =>
              setFormData({ ...formData, contactName: e.target.value })
            }
          />
          <InputTextField
            label={"เบอร์โทรศัพท์"}
            onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
          />
          <Button
            variant="contained"
            fullWidth
            size="large"
            color="success"
            sx={buttonStyle}
          >
            เพิ่ม
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
}
