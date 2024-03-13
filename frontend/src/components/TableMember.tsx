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
const baseUrl = "http://localhost:4900";

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
  member_id: number,
  name: string,
  tel: string,
  point: number
) {
  return { member_id, name, tel, point };
}

export default function TableMember(props: PropsTable) {
  const [resData, setResData] = useState<any>([]);
  const [member, setMember] = useState<any>([]);
  const [rowData, setRowData] = useState<any>([]);

  const handleError = (error: any) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  };

  const loadData = () => {
    axios
      .get(`${baseUrl}/members`)
      .then((response) => {
        setResData(response.data);
      })
      .catch(handleError);

    axios
      .get(`${baseUrl}/members`)
      .then((response) => {
        setMember(response.data);
      })
      .catch(handleError);
  };
  useEffect(() => {
    loadData();
    props.id && props.id(0, "ADD");
  }, [props.load]);

  useEffect(() => {
    if (resData) {
      const i = resData.map((item: any) => {
        return createData(item.member_id, item.name, item.tel, item.point);
      });
      setRowData(i);
      props.count && props.count(resData.length);
    }
  }, [resData]);

  const handleRemove = (id: number) => {
    if (id) {
      axios
        .delete(`${baseUrl}/members/${id}`)
        .then((response) => {
          console.log(`Deleted ${response.data}`);
          loadData();
        })
        .catch(handleError);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ชื่อสมาชิก</StyledTableCell>
            <StyledTableCell align="center">เบอร์โทรศัพท์</StyledTableCell>
            <StyledTableCell align="center">คะแนนสะสม</StyledTableCell>
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
              <StyledTableCell align="center">{row.tel}</StyledTableCell>
              <StyledTableCell align="center">
                {row.point.toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="center">
                <EditIcon
                  sx={{ color: "#3361FC", cursor: "pointer" }}
                  onClick={() => props.id && props.id(row.member_id, "EDIT")}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <DeleteIcon
                  sx={{ color: "#D62929", cursor: "pointer" }}
                  onClick={() => handleRemove(row.member_id)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
