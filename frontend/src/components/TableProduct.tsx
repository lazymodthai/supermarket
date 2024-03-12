import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
const baseUrl = "http://localhost:5000";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  productDesc: string,
  cost: number,
  price: number,
  stock: number,
  shelf: number,
  supplier: string
) {
  return { name, productDesc, cost, price, stock, shelf, supplier };
}

export default function TableProduct(props: any) {
  const [resData, setResData] = useState<any>([]);
  const [supplier, setSupplier] = useState<any>([]);
  const [rowData, setRowData] = useState<any>([]);

  const handleError = (error: any) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  };
  useEffect(() => {
    axios
      .get(`${baseUrl}/products`)
      .then((response) => {
        setResData(response.data);
      })
      .catch(handleError);

    axios
      .get(`${baseUrl}/supplier`)
      .then((response) => {
        setSupplier(response.data);
      })
      .catch(handleError);
  }, [props.load]);

  useEffect(() => {
    if (resData) {
      const i = resData.map((item: any) => {
        return createData(
          item.name,
          item.product_desc,
          item.cost,
          item.price,
          item.stock,
          item.shelf,
          supplier.find((k: any) => k.supplier_id === item.supplier_id)?.name
        );
      });
      setRowData(i);
    }
  }, [resData]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ชื่อสินค้า</StyledTableCell>
            <StyledTableCell align="center">รายละเอียดสินค้า</StyledTableCell>
            <StyledTableCell align="center">ราคาทุน</StyledTableCell>
            <StyledTableCell align="center">ราคาสินค้า</StyledTableCell>
            <StyledTableCell align="center">จำนวนในสต๊อก</StyledTableCell>
            <StyledTableCell align="center">จำนวนบนชั้นวาง</StyledTableCell>
            <StyledTableCell align="center">ซัพพลายเออร์</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row: any) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.productDesc}
              </StyledTableCell>
              <StyledTableCell align="center">{row.cost}</StyledTableCell>
              <StyledTableCell align="center">{row.price}</StyledTableCell>
              <StyledTableCell align="center">{row.stock}</StyledTableCell>
              <StyledTableCell align="center">{row.shelf}</StyledTableCell>
              <StyledTableCell align="center">{row.supplier}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
