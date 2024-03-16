import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import InputTextField from "../components/InputTextField";
import Typo from "../components/Typo";
import TableEmployee from "../components/TableEmployee";
import axios from "axios";

interface FormEmployee {
  name?: string;
  address?: string;
  tel?: string;
  salary?: number;
  employee?: any;
  password?: any;
}

export default function FormEmployee(props: FormEmployee) {
  const formInit = {
    name: "",
    address: "",
    tel: "",
    salary: 0,
    password: "",
  };
  const [formData, setFormData] = useState<FormEmployee>(formInit);
  const [employee, setEmployee] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [mode, setMode] = useState<string>("ADD");
  const [count, setCount] = useState<number>(0);

  const baseUrl = "http://localhost:4900";
  const handleError = (error: any) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  };

  const buttonStyle = {
    marginBottom: "16px",
    height: 62,
    fontSize: 24,
    fontFamily: "Pridi",
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/employee`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch(handleError);
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`${baseUrl}/employee/${id}`)
        .then((response) => {
          setFormData(response.data[0]);
        })
        .catch(handleError);
    }
  }, [id]);

  const handleSubmit = () => {
    if (formData.name !== "") {
      if (mode === "ADD") {
        axios
          .post(`${baseUrl}/employee`, formData)
          .then((response) => {
            setLoad(!load);
            setFormData(formInit);
          })
          .catch(handleError);
      } else {
        axios
          .put(`${baseUrl}/employee`, formData)
          .then((response) => {
            setLoad(!load);
            setFormData(formInit);
            setMode("ADD");
          })
          .catch(handleError);
      }
    }
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
          <Typo value="พนักงาน" />
        </Grid2>
        <Grid2 container xs={12}>
          <Grid2 container xs={3} gap={2}>
            <InputTextField
              label={"ชื่อพนักงาน"}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <InputTextField
              label={"ที่อยู่"}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
            <InputTextField
              label={"เบอร์โทรศัพท์"}
              value={formData.tel || ""}
              onChange={(e) =>
                setFormData({ ...formData, tel: e.target.value })
              }
              required
            />
            <InputTextField
              label={"เงินเดือน"}
              value={formData.salary || ""}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              required
            />
            <InputTextField
              type={"password"}
              label={"รหัสผ่าน"}
              value={formData.password || ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              maxLength={4}
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
              value={`รายชื่อพนักงาน (${count})`}
              variant="h5"
              sx={{ marginBottom: "16px" }}
            />
            <TableEmployee
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
