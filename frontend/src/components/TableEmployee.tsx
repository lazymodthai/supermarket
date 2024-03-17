import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { api } from "../api";

interface PropsTable {
  id: (val: any, type: any) => void;
  count: (val: number) => void;
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
  employee_id: number,
  name: string,
  address: string,
  tel: string,
  salary: number
) {
  return { employee_id, name, address, tel, salary };
}

export default function TableEmployee(props: PropsTable) {
  const [resData, setResData] = useState<any>([]);
  const [rowData, setRowData] = useState<any>([]);

  const loadData = () => {
    api.get(`/employee`).then((response) => {
      setResData(response.data);
    });
  };

  useEffect(() => {
    loadData();
    props.id && props.id(0, "ADD");
  }, [props.load]);

  useEffect(() => {
    if (resData) {
      const i = resData.map((item: any) => {
        return createData(
          item.employee_id,
          item.name,
          item.address,
          item.tel,
          item.salary
        );
      });
      setRowData(i);
      props.count && props.count(resData.length);
    }
  }, [resData]);

  const handleRemove = (id: number) => {
    if (id) {
      api.delete(`/employee/${id}`).then(() => {
        loadData();
      });
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ชื่อพนักงาน</StyledTableCell>
            <StyledTableCell align="center">ที่อยู่</StyledTableCell>
            <StyledTableCell align="center">เบอร์โทรศัพท์</StyledTableCell>
            <StyledTableCell align="center">เงินเดือน</StyledTableCell>
            <StyledTableCell align="center">แก้ไข</StyledTableCell>
            <StyledTableCell align="center">ลบ</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row: any) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.address}</StyledTableCell>
              <StyledTableCell align="center">{row.tel}</StyledTableCell>
              <StyledTableCell align="center">
                {row.salary.toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="center">
                <EditIcon
                  sx={{ color: "#3361FC", cursor: "pointer" }}
                  onClick={() => props.id && props.id(row.employee_id, "EDIT")}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <DeleteIcon
                  sx={{ color: "#D62929", cursor: "pointer" }}
                  onClick={() => handleRemove(row.employee_id)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
