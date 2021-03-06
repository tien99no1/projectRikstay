import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Pagination, Stack } from "@mui/material";
import axios from "axios";
import { CONFIG } from "../config";
import { bookRoom } from "../type";
import NumberFormat from "react-number-format";
import Footer from "./layout/Footer";

function News() {
  const [booking, setBooking] = useState<bookRoom[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  const indexOfLastBooking = currentPage * postPerPage;
  const indexOfFirstBooking = indexOfLastBooking - postPerPage;
  const currentBooking = booking.slice(indexOfFirstBooking, indexOfLastBooking);
  const pageNumbers = Math.ceil(booking.length / postPerPage);

  const paginate = (pageNumbers: any) => {
    setCurrentPage(pageNumbers);
  };
  const getListBooking = async () => {
    try {
      const hostId = localStorage.getItem("hostId");
      const data = await axios.get(
        `${CONFIG.ApiBookRoom}?hostId=${hostId}&status=0`
      );
      setBooking(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getListBooking();
  }, []);
  const handleAccept = (book: bookRoom, index: number) => {
    const { id } = book;
    const data = { ...book, isCheck: 1 };
    axios
      .put(`${CONFIG.ApiBookRoom}/${id}`, data)
      .then((result) => {
        const newBooking = [...booking];
        newBooking[index] = result.data;
        setBooking(newBooking);
      })
      .then((result) =>
        axios.patch(`${CONFIG.ApiRoom}/${book.roomId}`, { isCheckRoom: true })
      );
  };
  const handleRefuse = (book: bookRoom, index: number) => {
    const { id } = book;
    const data = { ...book, isCheck: 2 };
    axios.put(`${CONFIG.ApiBookRoom}/${id}`, data).then((result) => {
      const newBooking = [...booking];
      newBooking[index] = result.data;
      setBooking(newBooking);
    });
  };

  return (
    <>
      <Box
        maxWidth="xl"
        sx={{
          border: "1px solid #dae3dc",
          padding: "10px",
          borderRadius: "7px",
        }}
      >
        {booking.length > 0 ? (
          <div>
            <div>
              {currentBooking.map((book: bookRoom, index: number) => {
                return (
                  <div key={index} className="div-card">
                    <Card sx={{ width: "100%", display: "flex" }}>
                      <CardMedia
                        component="img"
                        className="media-img"
                        image={book.roomImg}
                        alt="green iguana"
                      />
                      <CardContent className="content-dashboard">
                        <Typography gutterBottom variant="h5" component="div">
                          {book.roomName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          T??n kh??ch h??ng: {book.userName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Ng??y thu??: t??? ng??y {book.startDay} ?????n {book.endDay}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          S??? kh??ch: {book.totalCustomers}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          T???ng ti???n:
                          <NumberFormat
                            value={book.totalPrice}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"??"}
                          />
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {book.isCheck == 0 ? (
                          <>
                            <Button
                              size="small"
                              onClick={() => handleAccept(book, index)}
                            >
                              Cho thu??
                            </Button>
                            <Button
                              size="small"
                              onClick={() => handleRefuse(book, index)}
                            >
                              T??? ch???i
                            </Button>
                          </>
                        ) : book.isCheck == 1 ? (
                          <p className="check-room">???? cho thu??</p>
                        ) : (
                          <p className="check-room refuse">???? t??? ch???i</p>
                        )}
                      </CardActions>
                    </Card>
                  </div>
                );
              })}
            </div>
            <Stack spacing={2} className="page">
              <Pagination
                count={pageNumbers}
                color="secondary"
                onChange={(e: any, page: number) => setCurrentPage(page)}
              />
            </Stack>
          </div>
        ) : (
          <Box textAlign={'center'}>
            <h5>B???n ch??a c?? ????n ?????t ch??? n??o</h5>
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
}

export default News;
