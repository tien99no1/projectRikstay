import Table from "@mui/material/Table";
import { useForm } from "react-hook-form";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { CONFIG } from "../config";
import { Button } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { removeUser } from "../services/userService";
import { user } from "../type";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ListUser() {

  const [listUsers, setListUsers] = useState<any[]>([]);
  const getListUsers = async () => {
    try {
      const data = await axios.get(`${CONFIG.ApiUser}`);
      setListUsers(data.data);
    } catch (e) {}
  };

  useEffect(() => {
    getListUsers();
  }, []);
  // const handleEdit = (item: user, index: number) => {
  //   const { id } = item;
  //   console.log("first", item);
  //   setOpen(true);
  //   axios.get(`${CONFIG.ApiUser}/${id}`).then((result) => {
  //     console.log("result", result.data);
  //   });
  // };
  // const onSubmit = (id: number) => {
  //   axios
  //     .put(`${CONFIG.ApiUser}/${id}`)
  //     .then((data) => {
  //       console.log("success");
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // };
  const handleClickDelete = (id: number) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      removeUser(id)
        .then((res) => {
          getListUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      {listUsers.length > 0 ? (
        <div className="row">
          <TableContainer className="tableContainer" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">
                    Tên khách hàng
                  </StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">
                    Số điện thoại
                  </StyledTableCell>
                  <StyledTableCell align="center">Hành động</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listUsers.map((item: user, index: number) => {
                  return (
                    <StyledTableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell className="name tbody" align="center">
                        <p>{item.id}</p>
                      </TableCell>
                      <TableCell className="img-table" align="center">
                        <p>
                          {item.firstName} {item.lastName}
                        </p>
                      </TableCell>
                      <TableCell align="center">
                        <p>{item.email}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p>{item.phone}</p>
                      </TableCell>
                      <TableCell align="center">
                        <Link to={`/editprofile/${item.id}`}>
                        <Button
                          title="Chỉnh sửa"
                        >
                          <ModeEditOutlineOutlinedIcon color="warning" />
                        </Button>
                        </Link>
                        <Button
                          title="Xóa tài khoản"
                          onClick={() => handleClickDelete(item.id)}
                        >
                          <DeleteOutlineOutlinedIcon color="error" />
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <h4>Chưa có người dùng</h4>
      )}
    </div>
  );
}

export default ListUser;
