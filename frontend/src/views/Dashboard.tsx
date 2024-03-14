import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import TableBill from "../components/TableBill";

interface PropsDashboard {
  employee?: any;
}

export default function Dashboard(props: PropsDashboard) {
  const [load, setLoad] = useState<boolean>(false);
  const [total, setTotal] = useState<any>(0);
  const [vat, setVat] = useState<any>(0);
  const [discount, setDiscount] = useState<any>(0);
  const [summary, setSummary] = useState<any>([]);
  const [bill, setBill] = useState<any>([]);
  const baseUrl = "http://localhost:4900";
  const handleError = (error: any) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  };

  const setSum = () => {
    axios
      .post(`${baseUrl}/bills`, { id: props.employee.employee_id })
      .then((response) => {
        const sum = response.data.reduce(
          (accumulator: any, currentValue: any) =>
            accumulator + currentValue.total_summary,
          0
        );
        setSummary(sum);
      })
      .catch(handleError);
  };

  const viewBill = (id: number) => {
    axios
      .get(`${baseUrl}/bills/${id}`)
      .then((response) => {
        setBill(response.data[0]);
      })
      .catch(handleError);
  };

  useEffect(() => {
    const sum = bill.reduce((accumulator: any, currentValue: any) => {
      return accumulator + currentValue.total_summary;
    }, 0);
    setTotal(sum);
  }, [bill]);

  useEffect(() => {
    setSum();
  }, []);

  return (
    <Grid2 xs={12} container gap={4}>
      <Grid2 xs={7} container>
        <Grid2
          xs={12}
          container
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={2}
          sx={{ color: "black", fontSize: "24px" }}
          height={"100px"}
        >
          <Grid2>ยอดขายของคุณเดือนนี้ :</Grid2>
          <Grid2>
            {summary.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            }) || 0}{" "}
            บาท
          </Grid2>
        </Grid2>
        <Grid2 xs={12} height={"70vh"}>
          <TableBill load={load} id={(val) => viewBill(val)} />
        </Grid2>
      </Grid2>
      <Grid2 xs={4} container display={"flex"} flexDirection={"column"} gap={2}>
        <Grid2 minHeight={"80vh"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"top"}
            padding={2}
            // justifyContent={"center"}
            height={"100%"}
            sx={{ border: "1px solid black", color: "black" }}
          >
            <Box sx={{ fontSize: 20, marginLeft: "auto", marginRight: "auto" }}>
              สรุปรายการสินค้า
            </Box>
            <Grid2
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              height={"100%"}
            >
              <Grid2>
                {bill.map((item: any) => (
                  <Grid2
                    key={item.product_id}
                    display={"flex"}
                    justifyContent={"space-between"}
                    sx={{ color: "black" }}
                    paddingX={"30px"}
                    paddingY={"4px"}
                  >
                    <Grid2>{item.product_name}</Grid2>
                    <Grid2 sx={{ color: "gray" }}>
                      {item.quantity} x {item.price} บาท
                    </Grid2>
                  </Grid2>
                ))}
              </Grid2>
              <Grid2>
                <Grid2
                  display={"flex"}
                  justifyContent={"space-between"}
                  sx={{ color: "black" }}
                  paddingX={"30px"}
                  paddingY={"4px"}
                >
                  <Grid2>จำนวนสินค้าทั้งสิ้น</Grid2>
                  <Grid2>{bill.length} รายการ</Grid2>
                </Grid2>
                <Grid2
                  display={"flex"}
                  justifyContent={"space-between"}
                  sx={{ color: "black" }}
                  paddingX={"30px"}
                  paddingY={"4px"}
                >
                  <Grid2>ส่วนลด</Grid2>
                  <Grid2>{bill.length > 0 ? bill[0].discount : ""} บาท</Grid2>
                </Grid2>
                <Grid2
                  display={"flex"}
                  justifyContent={"space-between"}
                  sx={{ color: "black" }}
                  paddingX={"30px"}
                  paddingY={"4px"}
                >
                  <Grid2>ยอดชำระ</Grid2>
                  <Grid2>
                    {bill.length > 0
                      ? bill[0].total_summary.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })
                      : ""}{" "}
                    บาท
                  </Grid2>
                </Grid2>
                <Grid2
                  display={"flex"}
                  justifyContent={"space-between"}
                  sx={{ color: "black" }}
                  paddingX={"30px"}
                  paddingY={"4px"}
                >
                  <Grid2>พนักงาน</Grid2>
                  <Grid2>{bill.length > 0 ? bill[0].name : ""}</Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>
        <Grid2></Grid2>
      </Grid2>
    </Grid2>
  );
}
