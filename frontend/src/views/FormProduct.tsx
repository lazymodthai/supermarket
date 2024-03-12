import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import InputTextField from "../components/InputTextField";
import Typo from "../components/Typo";
import TableProduct from "../components/TableProduct";
import axios from "axios";

interface formData {
  name: string;
  product_desc: string;
  quantity: number;
  cost: number;
  price: number;
  stock: number;
  shelf: number;
  supplier_id: number;
}

export default function FormProduct() {
  const formInit = {
    name: "",
    product_desc: "",
    quantity: 0,
    cost: 0,
    price: 0,
    stock: 0,
    shelf: 0,
    supplier_id: 0,
  };
  const [formData, setFormData] = useState<formData>(formInit);
  const [supplier, setSupplier] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);

  const baseUrl = "http://localhost:5000";
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
      .get(`${baseUrl}/supplier`)
      .then((response) => {
        setSupplier(response.data);
      })
      .catch(handleError);
  }, []);

  const handleSubmit = () => {
    if (formData.name !== "") {
      axios
        .post(`${baseUrl}/products`, formData)
        .then((response) => {
          console.log("New Product Added:", response.data);
          setLoad(!load);
          setFormData(formInit);
        })
        .catch(handleError);
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
          <Typo value="เพิ่มสินค้า" />
        </Grid2>
        <Grid2 container xs={12}>
          <Grid2 container xs={4} gap={4}>
            <InputTextField
              label={"ชื่อสินค้า"}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <InputTextField
              label={"รายละเอียดสินค้า"}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, product_desc: e.target.value })
              }
            />
            <InputTextField
              type="number"
              label={"ราคาทุน"}
              value={formData.cost || ""}
              onChange={(e) =>
                setFormData({ ...formData, cost: e.target.value })
              }
            />
            <InputTextField
              type="number"
              label={"ราคาขาย"}
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <InputTextField
              type="number"
              label={"จำนวนในสต๊อก"}
              value={formData.stock || ""}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />
            <InputTextField
              type="number"
              label={"จำนวนบนชั้นวาง"}
              value={formData.shelf || ""}
              onChange={(e) =>
                setFormData({ ...formData, shelf: e.target.value })
              }
            />
            <Autocomplete
              disablePortal
              options={supplier.map((item: any) => {
                return { label: item.name, id: item.supplier_id };
              })}
              renderInput={(params) => (
                <TextField {...params} label="ซัพพลายเออร์" />
              )}
              fullWidth
              sx={{
                fontSize: "1.2em",
                fontFamily: "Pridi",
              }}
              onChange={(e, val: any) => {
                setFormData({ ...formData, supplier_id: Number(val.id) });
              }}
            />
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="success"
              sx={buttonStyle}
              onClick={handleSubmit}
            >
              เพิ่ม
            </Button>
          </Grid2>
          <Grid2 xs={8} padding={"0 32px"}>
            <Typo
              value="รายการสินค้าที่มีอยู่"
              variant="h5"
              sx={{ marginBottom: "16px" }}
            />
            <TableProduct load={load} />
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}
