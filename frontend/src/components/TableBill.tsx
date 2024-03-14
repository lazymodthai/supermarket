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
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
const baseUrl = "http://localhost:4900";

interface PropsTable {
  id?: (val: any) => void;
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

function createData(bill_id: number, date: string, total_summary: number) {
  return { bill_id, date, total_summary };
}

export default function TableBill(props: PropsTable) {
  const [resData, setResData] = useState<any>([]);
  const [rowData, setRowData] = useState<any>([]);
  const emp: any = localStorage.getItem("employee");
  const emp2: any = JSON.parse(emp);

  const handleError = (error: any) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  };

  const loadData = () => {
    axios
      .post(`${baseUrl}/bills`, { id: emp2.employee_id })
      .then((response) => {
        setResData(response.data);
      })
      .catch(handleError);
  };
  useEffect(() => {
    loadData();
  }, [props.load]);

  useEffect(() => {
    if (resData) {
      const i = resData.map((item: any) => {
        return createData(item.bill_id, item.date, item.total_summary);
      });
      setRowData(i);
      props.count && props.count(resData.length);
    }
  }, [resData]);

  const handleView = (id: number) => {
    props.id && props.id(id);
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">วันที่/เวลา</StyledTableCell>
            <StyledTableCell align="center">รายรับ</StyledTableCell>
            <StyledTableCell align="center">ดูบิล</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row: any) => (
            <StyledTableRow key={row.bill_id}>
              <StyledTableCell component="th" scope="row" align="left">
                {new Date(row.date).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }) +
                  " " +
                  new Date(row.date).toLocaleTimeString("th-TH", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) +
                  " น."}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.total_summary.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </StyledTableCell>
              <StyledTableCell align="center">
                <ReceiptLongIcon
                  sx={{ color: "#EAB40B", cursor: "pointer" }}
                  onClick={() => handleView(row.bill_id)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
