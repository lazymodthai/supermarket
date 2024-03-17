import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import InputTextField from "../components/InputTextField";
import Typo from "../components/Typo";
import TableSupplier from "../components/TableSupplier";
import { api } from "../api";

interface FormSupplier {
  name?: string;
  address?: string;
  contact_name?: string;
  tel?: string;
  employee?: any;
}

export default function FormSupplier(props: FormSupplier) {
  const formInit = {
    name: "",
    address: "",
    contact_name: "",
    tel: "",
  };
  const [formData, setFormData] = useState<FormSupplier>(formInit);
  const [load, setLoad] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [mode, setMode] = useState<string>("ADD");
  const [count, setCount] = useState<number>(0);
  const [err, setErr] = useState<boolean>(false);

  const buttonStyle = {
    marginBottom: "16px",
    height: 62,
    fontSize: 24,
    fontFamily: "Pridi",
  };

  useEffect(() => {
    if (id) {
      api.get(`/supplier/${id}`).then((response) => {
        setFormData(response.data[0]);
      });
    }
  }, [id]);

  const handleSubmit = () => {
    if (formData.name === "") {
      return setErr(true);
    }
    if (formData.name !== "") {
      if (mode === "ADD") {
        api.post(`/supplier`, formData).then(() => {
          setLoad(!load);
          setFormData(formInit);
        });
      } else {
        api.put(`/supplier`, formData).then(() => {
          setLoad(!load);
          setFormData(formInit);
          setMode("ADD");
        });
      }
    }
    setErr(false);
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
          <Typo value="ซัพพลายเออร์" />
        </Grid2>
        <Grid2 container xs={12}>
          <Grid2 container xs={3} gap={2}>
            <InputTextField
              label={"ชื่อซัพพลายเออร์"}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              error={err && formData.name === ""}
            />
            <InputTextField
              label={"ที่อยู่"}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <InputTextField
              label={"ชื่ิอผู้ติดต่อ"}
              value={formData.contact_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, contact_name: e.target.value })
              }
            />
            <InputTextField
              label={"เบอร์โทรศัพท์"}
              value={formData.tel || ""}
              onChange={(e) =>
                setFormData({ ...formData, tel: e.target.value })
              }
            />
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="secondary"
              sx={buttonStyle}
              onClick={handleSubmit}
            >
              เพิ่ม/แก้ไข
            </Button>
          </Grid2>
          <Grid2
            xs={9}
            padding={"0 32px"}
            // bgcolor={"red"}
            // maxHeight={"500px"}
            // overflow={"scroll"}
          >
            <Typo
              value={`รายชื่อซัพพลายเออร์ (${count})`}
              variant="h5"
              sx={{ marginBottom: "16px" }}
            />
            <TableSupplier
              load={load}
              id={(id, type) => {
                setId(id);
                setMode(type);
              }}
              count={(val) => setCount(val)}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}
