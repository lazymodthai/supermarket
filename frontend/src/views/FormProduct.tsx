import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import InputTextField from "../components/InputTextField";
import Typo from "../components/Typo";
import TableProduct from "../components/TableProduct";
import axios from "axios";

interface FormProduct {
  name?: string;
  product_desc?: string;
  quantity?: number;
  cost?: number;
  price?: number;
  stock?: number;
  shelf?: number;
  supplier_id?: number;
  employee?: any;
}

export default function FormProduct(props: FormProduct) {
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
  const [formData, setFormData] = useState<FormProduct>(formInit);
  const [supplier, setSupplier] = useState<any>([]);
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
      .get(`${baseUrl}/supplier`)
      .then((response) => {
        setSupplier(response.data);
      })
      .catch(handleError);
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`${baseUrl}/products/${id}`)
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
          .post(`${baseUrl}/products`, formData)
          .then((response) => {
            setLoad(!load);
            setFormData(formInit);
          })
          .catch(handleError);
      } else {
        axios
          .put(`${baseUrl}/products`, formData)
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
          <Typo value="สินค้า" />
        </Grid2>
        <Grid2 container xs={12}>
          <Grid2 container xs={3} gap={2}>
            <InputTextField
              label={"ชื่อสินค้า"}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <InputTextField
              label={"รายละเอียดสินค้า"}
              value={formData.product_desc}
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
              required
            />
            <InputTextField
              type="number"
              label={"ราคาขาย"}
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
            <InputTextField
              type="number"
              label={"จำนวนในสต๊อก"}
              value={formData.stock || ""}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              required
            />
            <InputTextField
              type="number"
              label={"จำนวนบนชั้นวาง"}
              value={formData.shelf || ""}
              onChange={(e) =>
                setFormData({ ...formData, shelf: e.target.value })
              }
              required
            />
            <Autocomplete
              value={
                supplier.find((i: any) => {
                  return i.supplier_id === formData.supplier_id;
                })?.name || ""
              }
              options={supplier.map((item: any) => {
                return { label: item.name, supplier_id: item.supplier_id };
              })}
              renderInput={(params) => (
                <TextField {...params} label="ซัพพลายเออร์" />
              )}
              fullWidth
              sx={{
                fontSize: "1em",
                fontFamily: "Pridi",
              }}
              onChange={(e, val: any) => {
                setFormData({ ...formData, supplier_id: val.supplier_id });
              }}
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
              value={`รายการสินค้า (${count})`}
              variant="h5"
              sx={{ marginBottom: "16px" }}
            />
            <TableProduct
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
