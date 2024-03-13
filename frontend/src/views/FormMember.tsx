import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import InputTextField from "../components/InputTextField";
import Typo from "../components/Typo";
import TableMember from "../components/TableMember";
import axios from "axios";

interface formData {
  name: string;
  tel: string;
  point: number;
}

export default function FormMember() {
  const formInit = {
    name: "",
    tel: "",
    point: 0,
  };
  const [formData, setFormData] = useState<formData>(formInit);
  const [member, setMember] = useState<any>([]);
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
      .get(`${baseUrl}/members`)
      .then((response) => {
        setMember(response.data);
      })
      .catch(handleError);
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`${baseUrl}/members/${id}`)
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
          .post(`${baseUrl}/members`, formData)
          .then((response) => {
            setLoad(!load);
            setFormData(formInit);
          })
          .catch(handleError);
      } else {
        axios
          .put(`${baseUrl}/members`, formData)
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
          <Typo value="สมาชิก" />
        </Grid2>
        <Grid2 container xs={12}>
          <Grid2 container xs={3} gap={2}>
            <Grid2
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              flexGrow={1}
            >
              <InputTextField
                label={"ชื่อสมาชิก"}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
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
                label={"คะแนนสะสม"}
                value={formData.point || ""}
                onChange={(e) =>
                  setFormData({ ...formData, point: e.target.value })
                }
                required
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
          </Grid2>
          <Grid2
            xs={9}
            padding={"0 32px"}
            // bgcolor={"red"}
            // maxHeight={"500px"}
            // overflow={"scroll"}
          >
            <Typo
              value={`รายชื่อสมาชิก (${count})`}
              variant="h5"
              sx={{ marginBottom: "16px" }}
            />
            <TableMember
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
