import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import NumberFormat from "react-number-format";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import TvIcon from "@mui/icons-material/Tv";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BlenderIcon from "@mui/icons-material/Blender";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import GarageIcon from "@mui/icons-material/Garage";
import SignalWifi0BarIcon from "@mui/icons-material/SignalWifi0Bar";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import BannerRoom from "../components/BannerRoom";
import { CONFIG } from "../config";
import Noti from "../components/Noti";
import Map from "../components/Map";
import { room } from "../type";

interface IFormInputs {
  name: string;
  phone: string;
}

function Room() {
  const [roomInfo, setRoomInfo] = useState<room>();
  const [showNoti, setShowNoti] = useState(false);
  const [payloadNoti, setPayloadNoti] = useState({
    status: "success",
    text: "",
  });
  const [valueDate, setValueDate] = React.useState<DateRange<Date>>([
    null,
    null,
  ]);
  const minValue: Date = new Date(new Date());
  const maxValue: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    90
  );

  const params = useParams();
  const { id } = params;
  useEffect(() => {
    axios.get(`${CONFIG.ApiRoom}/${id}`).then((res) => {
      setRoomInfo(res.data)
    }).catch((error) => {
      console.log("error", error)
    })
  },[id])
  const userId = localStorage.getItem("userId");
  const userName = useSelector((state: any) => state.user.lastName);
  const hostId = roomInfo?.hostId;
  const [children, setChildren] = React.useState<number | string>("");
  const [alduts, setAdults] = React.useState<number | string>("");

  const roomId = roomInfo?.id;
  const roomName = roomInfo?.roomName;
  const roomImg = roomInfo?.roomImg;
  const roomAddress = roomInfo?.address;
  const roomAddressDetail = roomInfo?.addressDetail;
  const customer = Number(roomInfo?.customer);
  const sDay = moment(valueDate[0]);
  const eDay = moment(valueDate[1]);
  const totalDays = eDay.diff(sDay, "days");
  const totalPrice = totalDays * Number(roomInfo?.roomPrice);
  //advise
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const totalCustomers: number = Number(children) + Number(alduts);
  const onSubmit = (data: IFormInputs) => {
    sessionStorage.setItem("advide", JSON.stringify(data));
    setPayloadNoti({
      status: "success",
      text: "Thành công",
    });
    setShowNoti(true);
    return data;
  };
  //post
  const navigate = useNavigate();
  const bookRoom = () => {
    if (!userId) {
      navigate("/login");
    } else {
      const dataBooking = {
        roomId,
        userName,
        hostId,
        userId,
        totalCustomers,
        roomName,
        roomAddress,
        roomAddressDetail,
        roomImg,
        alduts,
        totalPrice,
        children,
        startDay: moment(valueDate[0]).format("DD/MM/YYYY"),
        endDay: moment(valueDate[1]).format("DD/MM/YYYY"),
        isCheck: 0,
        status: 0,
      };
      if (
        !dataBooking.startDay ||
        !dataBooking.endDay ||
        dataBooking.totalCustomers === 0
      ) {
        setPayloadNoti({
          status: "error",
          text: "Vui lòng điền vào chỗ trống",
        });
        setShowNoti(true);
      } else if (dataBooking.totalCustomers > customer + 1) {
        setPayloadNoti({
          status: "error",
          text: "Bạn đã chọn quá số khách cho phép",
        });
        setShowNoti(true);
      } else {
        axios
          .post(`${CONFIG.ApiBookRoom}`, dataBooking)
          .then((dataBooking) => {
            setValueDate([null, null]);
            navigate("/home/profile");
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    }
  };
  return (
    <>
      <Box>
        <BannerRoom />
      </Box>
      <Container maxWidth="lg">
        <div className="container-room">
          <Box className="room-left">
            <Box display={"flex"}>
              <p className="mr">Rikstay</p>
              <p className="mr">Vietnam</p>
              <p className="mr">{roomInfo?.address}</p>
              <p className="mr">{roomInfo?.addressDetail}</p>
            </Box>
            <Box>
              <h3>{roomInfo?.title}</h3>
              <p className="phone margin-icon">
                <LocationOnIcon />
                <b>
                  {roomInfo?.addressDetail}, {roomInfo?.address}, Việt Nam
                </b>
                <a style={{ marginLeft: "1rem", color: "#b71c1c" }} href="#map">
                  Xem bản đồ
                </a>
              </p>
              <p className="phone margin-icon">
                <ApartmentOutlinedIcon />
                <b>{roomInfo?.roomType} -</b> <span>{roomInfo?.roomAcreage} m<sup>2</sup></span>
              </p>
              <p>
                Phòng riêng · {roomInfo?.bathRoom} Phòng tắm · {roomInfo?.bed}
                giường · {roomInfo?.bedRoom} phòng ngủ · {roomInfo?.customer} {""}
                khách (tối đa {Number(roomInfo?.customer) + 1} khách)
              </p>
              <p>{roomInfo?.info}</p>
            </Box>
            <br />
            <Box>
              <h4>Tiện nghi chỗ ở</h4>
              <p>Giới thiệu về các tiện nghi và dịch vụ tại nơi cư trú</p>
            </Box>
            <Box>
              <h4>Tiện ích</h4>
              <Grid
                container
                rowSpacing={0.1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <p className="phone">
                    <SignalWifi0BarIcon />
                    <span>Wifi</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <TvIcon />
                    <span>TV</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <BlenderIcon />
                    <span>Máy say sinh tố</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <KitchenIcon />
                    <span>Tủ lạnh</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <MicrowaveIcon />
                    <span>Lò vi sóng</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <GarageIcon />
                    <span>Chỗ để xe</span>
                  </p>
                </Grid>
              </Grid>
              <p>Và còn nhiều tiện ích khác, đặt phòng ngay để trải nghiệm</p>
            </Box>
            <br />
            <Box>
              <h4>Nội quy và chính sách về chỗ ở</h4>
              <h5>Chính sách hủy phòng</h5>
              <p>
                Nghiêm ngặt: Hoàn lại 50% giá trị đặt phòng khi khách hàng huỷ
                phòng trong vòng 48h sau khi đặt phòng thành công và trước 14
                ngày so với thời gian check-in. Sau đó, hủy phòng trước 14 ngày
                so với thời gian check-in, được hoàn lại 50% tổng số tiền đã trả
                (trừ phí dịch vụ).
              </p>
              <div id="map">
                <Map lat={roomInfo?.lat} lng={roomInfo?.lng}/>
              </div>
              <p>
                Bạn sẽ nhận được địa chỉ chính xác của chỗ ở sau khi hoàn tất
                đơn đặt phòng.
              </p>
            </Box>
            <div className="text-order">
              <h4>Đặt phòng ngay!!</h4> <br />
            </div>
          </Box>
          <Box className="room-right">
            <Box>
              <Box className="order">
                <Box>
                  <p className="price-room">
                    <span className="price">
                      <NumberFormat
                        value={roomInfo?.roomPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"₫"}
                      />
                    </span>
                    /đêm
                  </p>
                </Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      startText="Check-in"
                      endText="Check-out"
                      minDate={minValue}
                      maxDate={maxValue}
                      value={valueDate}
                      disableMaskedInput
                      onChange={(newValue) => {
                        setValueDate(newValue);
                      }}
                      renderInput={(startProps, endProps) => (
                        <Box className="input-date">
                          <TextField
                            sx={{
                              width: "37%",
                              mb: "1rem",
                              mt: "1rem",
                            }}
                            {...startProps}
                          />
                          <Box sx={{ margin: "2rem 1rem 0 1rem" }}> đến </Box>
                          <TextField
                            sx={{
                              width: "37%",
                              mb: "1rem",
                              mt: "1rem",
                            }}
                            {...endProps}
                          />
                        </Box>
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <Button
                    className="person"
                    disabled={true}
                    sx={{ m: "0.5rem 1.5rem 1rem 1.9rem" }}
                  >
                    Số lượng khách: {totalCustomers}
                  </Button>
                  <Box
                    className="number-person"
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        m: "0.5rem 1.5rem 0.3rem 1.9rem",
                        width: "87%",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-disabled"
                      label="Người lớn"
                      type="number"
                      onChange={(e) => setAdults(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputProps: { min: 0, max: 100 },
                      }}
                    />
                    <TextField
                      id="outlined-number"
                      label="Trẻ em"
                      type="number"
                      onChange={(e) => setChildren(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                    />
                  </Box>
                </Box>
                <Box className="box-person"
                >
                  <Button className="order-now" onClick={bookRoom}>
                    Đặt ngay
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className="advise">
              {sessionStorage.getItem("advide") ? (
                <>
                  <Box padding={"10px 20px 0 20px"}>
                    <h4>Tư vấn từ Rikstay</h4>
                    <p style={{ fontSize: "0.8rem", marginTop: "-5px" }}>
                      Cảm ơn bạn đã quan tâm! Rikstay sẽ liên hệ tư vấn dịch vụ
                      trong thời gian sớm nhất.
                    </p>
                  </Box>
                </>
              ) : (
                <>
                  <Box padding={"10px 20px 0 20px"}>
                    <h4>Tư vấn từ Rikstay</h4>
                    <p style={{ fontSize: "0.8rem", marginTop: "-5px" }}>
                      Vui lòng cung cấp tên và số điện thoại để nhận được tư vấn
                      từ Luxstay cho chuyến đi của bạn.
                    </p>
                  </Box>
                  <Box className="form-advise">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Box className="text-advise">
                        <TextField
                          className="input-advise"
                          label="Nhập tên"
                          variant="outlined"
                          {...register("name", {
                            required: true,
                            maxLength: 80,
                            pattern:
                              /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                          })}
                        />
                        <br />
                        {errors?.name?.type === "required" && (
                          <small>Vui lòng nhập tên</small>
                        )}
                        {errors?.name?.type === "pattern" && (
                          <small>Tên không hợp lệ</small>
                        )}
                      </Box>
                      <Box className="text-advise">
                        <TextField
                          className="input-advise"
                          label="Số điện thoại"
                          variant="outlined"
                          type={"phone"}
                          {...register("phone", {
                            required: true,
                            pattern: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/i,
                          })}
                        />
                        <br />
                        {errors?.phone?.type === "required" && (
                          <small>Vui lòng nhập số điện thoại</small>
                        )}
                        {errors?.phone?.type === "pattern" && (
                          <small>Số điện thoại không hợp lệ</small>
                        )}
                      </Box>
                      <Button className="btn-advise" type="submit">
                        Nhận tư vấn miễn phí
                      </Button>
                      <Button className="phone-advise">
                        <span style={{ fontSize: "0.7rem" }}>
                          Gọi 18006586 (miễn phí) để được hỗ trợ.
                        </span>
                      </Button>
                    </form>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </div>
      </Container>
      <Noti
        payload={payloadNoti}
        showNoti={showNoti}
        setShowNoti={setShowNoti}
      />
    </>
  );
}

export default Room;
