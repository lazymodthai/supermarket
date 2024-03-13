import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TableSell from "../components/TableSell";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

interface PropsSell {}

export default function FormSell(props: PropsSell) {
  const [load, setLoad] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [mode, setMode] = useState<string>("");
  const [productList, setProductList] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);
  const [vat, setVat] = useState<any>(0);

  useEffect(() => {
    console.log(productList);
    const sum = productList.reduce((accumulator: any, currentValue: any) => {
      return accumulator + currentValue.total;
    }, 0);
    setTotal(sum);
    setVat((sum * 7) / 100);
  }, [productList]);

  return (
    <Grid2 xs={12} container gap={4}>
      <Grid2 xs={7}>
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
                  console.log(1);
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
          count={(val) => null}
        />
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
