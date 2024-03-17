import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TableSell from "../components/TableSell";
import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { api } from "../api";

interface PropsSell {
  employee?: any;
}

export default function FormSell(props: PropsSell) {
  const [load, setLoad] = useState<boolean>(false);
  const [productList, setProductList] = useState<any>([]);
  const [sum, setSum] = useState<any>(0);
  const [total, setTotal] = useState<any>(0);
  const [vat, setVat] = useState<any>(0);
  const [discount, setDiscount] = useState<any>(0);
  const [members, setMembers] = useState<any>([]);
  const [member, setMember] = useState<any>({});

  const setMem = () => {
    api.get(`/members`).then((response) => {
      setMembers(response.data);
    });
  };

  useEffect(() => {
    setSum(
      productList.reduce((accumulator: any, currentValue: any) => {
        return accumulator + currentValue.total;
      }, 0)
    );
  }, [productList]);

  useEffect(() => {
    setTotal(sum - discount);
    setVat((sum * 7) / 100);
  }, [sum, discount]);

  useEffect(() => {
    setMem();
  }, []);

  const purchase = async () => {
    const sellList = productList.map((item: any) => ({
      shelf: item.qty,
      product_id: item.id,
      employee_id: props.employee.employee_id,
      member_id: member.member_id,
      point: member.point,
      discount: discount,
      total_summary: total,
    }));

    const success = () => {
      Swal.fire("ชำระเงินสำเร็จ!");
      setLoad(!load);
      setProductList([]);
      setDiscount(0);
      setMember([]);
      setMem();
    };

    try {
      if (sellList.length > 0) {
        await api.put(`/products/sell`, sellList);
        await api.post(`/products/bill`, sellList);
        const pointToUpdate = total / 20;
        await api.put(`/members/point`, {
          member_id: member.member_id,
          point: pointToUpdate,
        });
        success();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid2 xs={12} container gap={4}>
      <Grid2
        xs={7}
        container
        display={"flex"}
        justifyContent={"space-between"}
        gap={2}
      >
        <Grid2 xs={12}>
          <TableSell
            load={load}
            id={(id, name, price, mode) => {
              if (productList.some((item: any) => item.id === id)) {
                const res = productList.map((item: any) => {
                  if (item.id === id) {
                    return {
                      ...item,
                      qty: mode === "ADD" ? item.qty + 1 : item.qty - 1,
                      total:
                        item.price *
                        (mode === "ADD" ? item.qty + 1 : item.qty - 1),
                    };
                  } else {
                    return item;
                  }
                });
                const res2 = res.filter((item: any) => item.qty !== 0);
                setProductList(res2);
              } else {
                setProductList([
                  ...productList,
                  { id: id, name: name, price: price, qty: 1, total: price },
                ]);
              }
            }}
          />
        </Grid2>
        <Grid2 xs={12} container display={"flex"} gap={2}>
          <Grid2 xs={12} display={"flex"} alignItems={"center"}>
            <Autocomplete
              // clearIcon={false}
              value={member.name || ""}
              options={members.map((item: any) => {
                return { ...item, label: item.name };
              })}
              renderInput={(params) => <TextField {...params} label="สมาชิก" />}
              fullWidth
              sx={{
                fontSize: "1em",
                fontFamily: "Pridi",
              }}
              onChange={(e, val: any) => {
                val === null ? setMember([]) : setMember(val);
              }}
              disabled={discount > 0}
            />
          </Grid2>
          <Grid2
            xs={12}
            sx={{ color: "black" }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Grid2 xs={6}>
              {`แต้มสมาชิก: ${Number(
                member.point || 0
              ).toLocaleString()} แต้ม , แต้มที่จะได้รับ ${parseInt(
                String(total / 20 || 0)
              ).toLocaleString()} แต้ม`}
            </Grid2>
            <Grid2 xs={6}>
              <Button
                variant="contained"
                size="large"
                color="success"
                // sx={buttonStyle}
                onClick={() => {
                  if (member.point > 500) {
                    setDiscount(50);
                    setMember({ ...member, point: member.point - 500 });
                  }
                }}
                disabled={member.point <= 500 || discount > 0 || total < 50}
              >
                ใช้ส่วนลด
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 xs={12}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            color="primary"
            // sx={buttonStyle}
            onClick={purchase}
            disabled={productList.length < 1}
          >
            ชำระเงิน
          </Button>
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
                {productList.map((item: any) => (
                  <Grid2
                    display={"flex"}
                    justifyContent={"space-between"}
                    sx={{ color: "black" }}
                    paddingX={"30px"}
                    paddingY={"4px"}
                  >
                    <Grid2>{item.name}</Grid2>
                    <Grid2 sx={{ color: "gray" }}>
                      {item.qty} x {item.price.toLocaleString()} บาท
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
                  <Grid2>{productList.length} รายการ</Grid2>
                </Grid2>
                <Grid2
                  display={"flex"}
                  justifyContent={"space-between"}
                  sx={{ color: "black" }}
                  paddingX={"30px"}
                  paddingY={"4px"}
                >
                  <Grid2>ราคารวม</Grid2>
                  <Grid2>
                    {(total - vat).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}{" "}
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
                  <Grid2>VAT 7%</Grid2>
                  <Grid2>
                    {vat.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}{" "}
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
                  <Grid2>ส่วนลด</Grid2>
                  <Grid2>{discount} บาท</Grid2>
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
                    {total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}{" "}
                    บาท
                  </Grid2>
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
