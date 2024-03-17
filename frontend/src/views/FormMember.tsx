import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import InputTextField from "../components/InputTextField";
import Typo from "../components/Typo";
import TableMember from "../components/TableMember";
import { api } from "../api";

interface FormMember {
  name?: string;
  tel?: string;
  point?: number | string;
  employee?: any;
}

export default function FormMember(props: FormMember) {
  const formInit = {
    name: "",
    tel: "",
    point: 0,
  };
  const [formData, setFormData] = useState<FormMember>(formInit);
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
      api.get(`/members/${id}`).then((response) => {
        setFormData(response.data[0]);
      });
    }
  }, [id]);

  const handleSubmit = () => {
    if (
      formData.name === "" ||
      formData.tel === "" ||
      formData.point === "" ||
      formData.point === 0
    ) {
      return setErr(true);
    }
    if (formData.name !== "") {
      if (mode === "ADD") {
        api.post(`/members`, formData).then(() => {
          setLoad(!load);
          setFormData(formInit);
        });
      } else {
        api.put(`/members`, formData).then(() => {
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
                error={err && formData.name === ""}
              />
              <InputTextField
                label={"เบอร์โทรศัพท์"}
                value={formData.tel || ""}
                onChange={(e) =>
                  setFormData({ ...formData, tel: e.target.value })
                }
                required
                error={err && formData.tel === ""}
              />
              <InputTextField
                label={"คะแนนสะสม"}
                value={formData.point || ""}
                onChange={(e) =>
                  setFormData({ ...formData, point: e.target.value })
                }
                required
                error={err && (formData.point === 0 || formData.point === "")}
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
