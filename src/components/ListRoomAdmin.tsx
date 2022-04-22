import Table from "@mui/material/Table";
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
import { Box, Button, TextField, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React from "react";
import { removeRoom } from "../services/roomService";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { room } from "../type";
import { useConfirm } from "material-ui-confirm";

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

function ListRoomAdmin() {
  const [listAllRoom, setListAllRoom] = useState<any[]>([]);
  const [searchRoomName, setSearchRoomName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  const indexOfLastRoom = currentPage * postPerPage;
  const indexOfFirstRoom = indexOfLastRoom - postPerPage;
  const listRoomReverse = listAllRoom.slice().reverse()
  const listAllRoomCurrent = listRoomReverse.slice(
    indexOfFirstRoom,
    indexOfLastRoom
  );
  const pageNumbers = Math.ceil(listAllRoom.length / postPerPage);

  const paginate = (pageNumbers: any) => {
    setCurrentPage(pageNumbers);
  };
  const getListroom = async () => {
    try {
      const data = await axios.get(`${CONFIG.ApiRoom}`);
      setListAllRoom(data.data);
    } catch (e) {}
  };

  useEffect(() => {
    getListroom();
  }, []);
  const handleAccept = (item: room, index: number) => {
    const { id } = item;
    const data = { ...item, status: 1 };
    axios.put(`${CONFIG.ApiRoom}/${id}`, data).then((result) => {
      // console.log("result", result.data);
      const newRoom = [...listAllRoom];
      newRoom[index] = result.data;
      setListAllRoom(newRoom);
      getListroom();
    });
  };
  const handleRefuse = (item: room, index: number) => {
    const { id } = item;
    const data = { ...item, status: 2 };
    axios.put(`${CONFIG.ApiRoom}/${id}`, data).then((result) => {
      const newRoom = [...listAllRoom];
      newRoom[index] = result.data;
      setListAllRoom(newRoom);
      getListroom();
    });
  };
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
                {listAllRoomCurrent
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
                  .map((item: room, index: number) => {
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
                        <TableCell className="img-table tableCell" align="center">
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
                              item.isCheckRoom === false ? "orange" : "green"
                            }`,
                          }}
                          align="center"
                        >
                          {item.isCheckRoom === false ? "Chưa thuê" : "Đã thuê"}
                        </TableCell>
                        <TableCell
                          className="tableCell"
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
                          <Box>
                            {item.isCheckRoom === false ? (
                              <>
                                <Button
                                  title="Duyệt phòng"
                                  onClick={() => handleAccept(item, index)}
                                >
                                  <CheckCircleOutlineIcon color="success" />
                                </Button>
                                <Button
                                  title="Từ chối"
                                  onClick={() => handleRefuse(item, index)}
                                >
                                  <HighlightOffIcon color="warning" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  disabled
                                  title="Duyệt phòng"
                                  onClick={() => handleAccept(item, index)}
                                >
                                  <CheckCircleOutlineIcon />
                                </Button>
                                <Button
                                  disabled
                                  title="Từ chối"
                                  onClick={() => handleRefuse(item, index)}
                                >
                                  <HighlightOffIcon />
                                </Button>
                              </>
                            )}

                            {item.status === 2 ? (
                              <Button
                                title="Xóa phòng"
                                onClick={() => handleClickDelete(item.id)}
                              >
                                <DeleteOutlineOutlinedIcon color="error" />
                              </Button>
                            ) : (
                              <></>
                            )}
                          </Box>
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
    </div>
  );
}

export default ListRoomAdmin;
