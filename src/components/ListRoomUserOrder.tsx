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
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import NumberFormat from "react-number-format";
import { bookRoom } from "../type";

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

function ListRoomUserOrder() {
  const [listAllBooking, setListAllBooking] = useState<any[]>([]);
  const [searchBookingRoom, setSearchBookingRoom] = useState("");

  const getListBooking = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const data = await axios.get(`${CONFIG.ApiBookRoom}?userId=${userId}`);
      setListAllBooking(data.data);
    } catch (e) {}
  };

  useEffect(() => {
    getListBooking();
  }, []);

  const handleCancel = (item: bookRoom, index: number) => {
    const { id } = item;
    const data = { ...item, status: 1 };
    axios.put(`${CONFIG.ApiBookRoom}/${id}`, data).then((result) => {
      const newBooking = [...listAllBooking];
      newBooking[index] = result.data;
      setListAllBooking(newBooking);
    });
  };

  return (
    <div>
      {listAllBooking.length > 0 ? (
        <div className="row">
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
                onChange={(e) => setSearchBookingRoom(e.target.value)}
              />
            </div>
          </Box>
          <TableContainer className="tableContainer" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Mã phòng</StyledTableCell>
                  <StyledTableCell align="center">Tên chỗ nghỉ</StyledTableCell>
                  <StyledTableCell align="center">Địa điểm</StyledTableCell>
                  <StyledTableCell align="center">
                    Ngày nhận phòng
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Ngày trả phòng
                  </StyledTableCell>
                  <StyledTableCell align="center">Số người</StyledTableCell>
                  <StyledTableCell align="center">Tổng tiền</StyledTableCell>
                  <StyledTableCell align="center">Trạng thái</StyledTableCell>
                  <StyledTableCell align="center">Hành động</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listAllBooking
                  .filter((value) => {
                    if (searchBookingRoom == "") {
                      return value;
                    } else if (
                      value.roomName
                        .toLowerCase()
                        .includes(searchBookingRoom.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((item: bookRoom, index: number) => {
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
                          <p>
                            {item.roomAddressDetail} - {item.roomAddress}
                          </p>
                        </TableCell>
                        <TableCell className="tableCell" align="center">
                          <p>{item.startDay}</p>
                        </TableCell>
                        <TableCell className="tableCell" align="center">
                          <p>{item.endDay}</p>
                        </TableCell>
                        <TableCell className="tableCell" align="center">
                          <p>{item.totalCustomers}</p>
                        </TableCell>
                        <TableCell className="tableCell" align="center">
                          <p>
                            <NumberFormat
                              value={item.totalPrice}
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={"đ"}
                            />
                          </p>
                        </TableCell>
                        <TableCell
                          className="tableCell"
                          style={{
                            color: `${
                              item.isCheck === 0
                                ? "orange"
                                : item.isCheck === 1
                                ? "green"
                                : "red"
                            }`,
                          }}
                          align="center"
                        >
                          {item.isCheck === 0
                            ? "Chờ duyệt"
                            : item.isCheck === 1
                            ? "Được duyệt"
                            : "Từ chối"}
                        </TableCell>
                        <TableCell align="center">
                          {item.isCheck == 0 ? (
                            item.status == 1 ? (
                              <Button disabled> Đã hủy </Button>
                            ) : (
                              <Button onClick={() => handleCancel(item, index)}>
                                Hủy đặt chỗ
                              </Button>
                            )
                          ) : (
                            <Button disabled> Hủy đặt chỗ </Button>
                          )}
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <h4 className="center">Bạn chưa đặt chỗ</h4>
      )}
    </div>
  );
}

export default ListRoomUserOrder;
