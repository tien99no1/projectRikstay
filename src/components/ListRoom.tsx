import React from "react";
import { useState, useEffect } from "react";
import { useConfirm } from "material-ui-confirm";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box, Button, TextField, Typography } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { CONFIG } from "../config";
import { room } from "../type";
import { removeRoom } from "../services/roomService";
import Footer from "./layout/Footer";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {},
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

function ListRoom() {
  const [listAllRoom, setListAllRoom] = useState<room[]>([]);
  const [searchRoomName, setSearchRoomName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  const indexOfLastRoom = currentPage * postPerPage;
  const indexOfFirstRoom = indexOfLastRoom - postPerPage;
  const listRoomReverse = listAllRoom.slice().reverse();
  const currentRoom = listRoomReverse.slice(indexOfFirstRoom, indexOfLastRoom);
  const pageNumbers = Math.ceil(listAllRoom.length / postPerPage);
  const paginate = (pageNumbers: any) => {
    setCurrentPage(pageNumbers);
  };

  const getListroom = async () => {
    try {
      const hostId = localStorage.getItem("hostId");
      const data = await axios.get(`${CONFIG.ApiRoom}?hostId=${hostId}`);
      setListAllRoom(data.data);
    } catch (e) {}
  };

  useEffect(() => {
    getListroom();
  }, []);
  const confirm = useConfirm();
  const handleClickDelete = (id: number) => {
    confirm({ description: `Bạn chắc chắn muốn xóa?` })
      .then(() =>
        removeRoom(id).then((res) => {
          getListroom();
        })
      )
      .catch(() => console.log("Deletion cancelled."));
  };

  return (
    <div>
      {listAllRoom.length > 0 ? (
        <div className="row">
          <Typography variant="h5" sx={{ fontWeight: "600", m: "1rem 0" }}>
            Danh sách chỗ nghỉ
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": { margin: "1rem 0", width: "25ch" },
            }}
          >
            <div>
              <TextField
                label="Tìm kiếm theo tên chỗ nghỉ"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setSearchRoomName(e.target.value)}
              />
            </div>
          </Box>
          <TableContainer className="tableContainer" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Mã phòng</StyledTableCell>
                  <StyledTableCell align="center">Tên chỗ nghỉ</StyledTableCell>
                  <StyledTableCell align="center">
                    Loại đặt phòng
                  </StyledTableCell>
                  <StyledTableCell align="center">Địa điểm</StyledTableCell>
                  <StyledTableCell align="center">Đã thuê</StyledTableCell>
                  <StyledTableCell align="center">Trạng thái</StyledTableCell>
                  <StyledTableCell align="center">Hành động</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRoom
                  .filter((value) => {
                    if (searchRoomName == "") {
                      return value;
                    } else if (
                      value.roomName
                        .toLowerCase()
                        .includes(searchRoomName.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((item, index) => {
                    return (
                      <StyledTableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="tableCell" align="center">
                          <p>{item.id}</p>
                        </TableCell>
                        <TableCell className="img-table" align="center">
                          <div>
                            <img
                              className="img-list-room"
                              src={item.roomImg}
                              alt=""
                            />
                            <span>{item.roomName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="tableCell" align="center">
                          <p>{item.roomCate}</p>
                        </TableCell>
                        <TableCell className="tableCell" align="center">
                          <p>
                            {item.addressDetail} - {item.address}
                          </p>
                        </TableCell>
                        <TableCell
                          className="tableCell"
                          style={{
                            color: `${
                              item.isCheckRoom === true ? "green" : "orange"
                            }`,
                          }}
                          align="center"
                        >
                          {item.isCheckRoom === true ? "Đã thuê" : "Chưa thuê"}
                        </TableCell>
                        <TableCell
                          className="status tbody"
                          style={{
                            color: `${
                              item.status === 0
                                ? "orange"
                                : item.status === 1
                                ? "green"
                                : "red"
                            }`,
                          }}
                          align="center"
                        >
                          {item.status === 0
                            ? "Chờ duyệt"
                            : item.status === 1
                            ? "Hoạt động"
                            : "Từ chối"}
                        </TableCell>
                        <TableCell align="center">
                          {item.isCheckRoom === false ? (
                            <Box>
                              <Link
                                className="link-edit"
                                to={`/editroom/${item.id}`}
                              >
                                <Button title="Chỉnh sửa">
                                  <ModeEditOutlineOutlinedIcon color="info" />
                                </Button>
                              </Link>
                              <Button
                                onClick={() => handleClickDelete(item.id)}
                                title="Xóa"
                              >
                                <DeleteOutlineOutlinedIcon color="error" />
                              </Button>
                            </Box>
                          ) : (
                            <Box>
                              <Button disabled title="Chỉnh sửa">
                                <ModeEditOutlineOutlinedIcon />
                              </Button>
                              <Button disabled title="Xóa">
                                <DeleteOutlineOutlinedIcon />
                              </Button>
                            </Box>
                          )}
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <Stack spacing={2} className="page">
              <Pagination
                count={pageNumbers}
                color="secondary"
                onChange={(e: any, page: number) => setCurrentPage(page)}
              />
            </Stack>
          </TableContainer>
        </div>
      ) : (
        <h4 className="center">Chỗ nghỉ của bạn đang trống</h4>
      )}
      <Footer />
    </div>
  );
}

export default ListRoom;
