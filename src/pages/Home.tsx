import React from "react";
import { Container, Box } from "@mui/material";
import Banner from "../components/Banner";
import Highlight from "../components/Highlight";
import Voucher from "../components/Voucher";
import Recommend from "../components/Recommend";
import Conduct from "../components/Conduct";
import About from "../components/About";
import "../css/home.css";

function Home() {
  return (
    <Container maxWidth="xl">
      <Box mt={"30px"} className="box">
        <Banner interval={0} />
      </Box>
      <Box mt={"30px"} className="box">
        <h2>Chào mừng đến với RikStay!</h2>
        <span>Đặt chỗ ở cho những chuyến đi thêm phần thú vị.</span>
        <br />
        <span>
          Chúng tôi sẽ mang đến những không gian như chính ngôi nhà của bạn!
        </span>
      </Box>
      <br />
      <Box className="box">
        <h3>Địa điểm nổi bật</h3>
        <p> Cùng RikStay chinh phục mọi chuyến đi</p>
      </Box>
      <Box className="box">
        <Highlight />
      </Box>
      <Box mt={"30px"} className="box">
        <h3>Ưu đã độc quyền</h3>
        <p>Chỉ có tại RikStay, hấp hẫn và hữu hạn, book ngay!</p>
      </Box>
      <Box className="box">
        <Voucher />
      </Box>
      <Box mt={"30px"} className="box">
        <h3>Gợi ý từ RikStay</h3>
        <p>Những địa điểm thường đến mà RikStay gợi ý dành cho bạn</p>
      </Box>
      <Box className="box">
        <Recommend />
      </Box>
      <Box mt={"30px"} className="box">
        <h3>Hướng dẫn sử dụng</h3>
        <p>Đặt chỗ nhanh, thanh toán đơn giản, sử dụng dễ dàng</p>
      </Box>
      <Box className="box">
        <Conduct />
      </Box>
      <Box className="box">
        <About />
      </Box>
    </Container>
  );
}

export default Home;
