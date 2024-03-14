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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import QueueIcon from "@mui/icons-material/Queue";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import InputTextField from "./InputTextField";
const baseUrl = "http://localhost:4900";

interface PropsTable {
  id: (id: any, name: any, qty: any, mode: any) => void;
  count?: (val: number) => void;
  load?: boolean;
}

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
  product_id: number,
  name: string,
  productDesc: string,
  cost: number,
  price: number,
  stock: number,
  shelf: number,
  supplier: string
) {
  return { product_id, name, productDesc, cost, price, stock, shelf, supplier };
}

export default function TableSell(props: PropsTable) {
  const [resData, setResData] = useState<any>([]);
  const [supplier, setSupplier] = useState<any>([]);
  const [rowData, setRowData] = useState<any>([]);
  const [filter, setFilter] = useState<string>("");
  const [tableData, setTableData] = useState<any>([]);

  const handleError = (error: any) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  };

  const loadData = () => {
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
  };
  useEffect(() => {
    loadData();
  }, [props.load]);

  useEffect(() => {
    if (resData) {
      const i = resData.map((item: any) => {
        return createData(
          item.product_id,
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
      props.count && props.count(resData.length);
    }
  }, [resData]);

  useEffect(() => {
    if (filter !== "") {
      setTableData(rowData.filter((item: any) => item.name.includes(filter)));
    } else {
      setTableData(rowData);
    }
  }, [filter, rowData, props.load]);

  return (
    <Grid2 container gap={2} xs={12}>
      <Grid2 xs={12}>
        <InputTextField
          label="ค้นหาสินค้า"
          placeholder="ค้นหาด้วยชื่อสินค้า"
          onChange={(e) => setFilter(e.target.value)}
        />
      </Grid2>
      <Grid2 xs={12}>
        <TableContainer component={Paper} sx={{ height: 400 }}>
          <Table
            sx={{ minWidth: 600 }}
            aria-label="customized table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" sx={{ paddingLeft: "16px" }}>
                  ชื่อสินค้า
                </StyledTableCell>
                <StyledTableCell align="center" width={"80px"}>
                  ราคา
                </StyledTableCell>
                <StyledTableCell align="center" width={"80px"}>
                  มีอยู่
                </StyledTableCell>
                <StyledTableCell align="center" width={"80px"}>
                  ตะกร้า
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row: any) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row" align="left">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ color: row.shelf === 0 ? "red" : "" }}
                  >
                    {row.shelf === 0 ? "หมด" : row.shelf}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <QueueIcon
                      sx={{
                        color: row.shelf === 0 ? "gray" : "#009060",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      onClick={() => {
                        if (row.shelf === 0) return;
                        props.id &&
                          props.id(row.product_id, row.name, row.price, "ADD");
                        const newRow = rowData.map((item: any) => {
                          if (item.product_id === row.product_id) {
                            return { ...item, shelf: row.shelf - 1 };
                          } else {
                            return item;
                          }
                        });

                        setRowData(newRow);
                      }}
                    />
                    <RemoveCircleIcon
                      sx={{
                        color:
                          resData.find(
                            (item: any) => item.product_id === row.product_id
                          )?.shelf <= row.shelf
                            ? "gray"
                            : "#DF5454",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (
                          resData.find(
                            (item: any) => item.product_id === row.product_id
                          )?.shelf <= row.shelf
                        )
                          return;
                        props.id &&
                          props.id(
                            row.product_id,
                            row.name,
                            row.price,
                            "REMOVE"
                          );
                        const newRow = rowData.map((item: any) => {
                          if (item.product_id === row.product_id) {
                            return { ...item, shelf: row.shelf + 1 };
                          } else {
                            return item;
                          }
                        });
                        setRowData(newRow);
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
    </Grid2>
  );
}
