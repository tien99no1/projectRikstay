import React from "react";
import { Box, Grid } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

function About() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        justifyContent={"space-around"}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid mt={'2rem'} item sm={6} md={2} xs={12}>
          <Box className="ABout">
            <h2>RIKSTAY</h2>
            <p className="phone">
              <LocalPhoneIcon />
              <a href="tel: 19001989"> 19001089</a>
            </p>
            <p className="phone">
              <EmailIcon />
              <a href="mailto:info@rikstay.com"> info@rikstay.com</a>
            </p>
          </Box>
        </Grid>
        <Grid item sm={6} md={2} xs={12}>
          <Box className="About">
            <h5>Top homestay được yêu thích</h5>
            <p>Homestay Đà Lạt</p>
            <p>Homestay Hà Nội</p>
            <p>Homestay Vũng Tàu</p>
            <p>Homestay Nha Trang</p>
            <p>Homestay Đà Nẵng</p>
          </Box>
        </Grid>

        <Grid item sm={6} md={2} xs={12}>
          <Box className="About">
            <h5>Không gian ưa thích</h5>
            <p>Căn hộ</p>
            <p>Biệt thự</p>
            <p>Nhà riêng</p>
          </Box>
        </Grid>
        <Grid item sm={6} md={2} xs={12}>
          <Box className="About">
            <h5>Về chúng tôi</h5>
            <p>Blog</p>
            <p>Điều khoản hoạt động</p>
            <p>Tạp chí du lịch</p>
          </Box>
        </Grid>
        <Grid item sm={6} md={2} xs={12}>
          <Box className="About">
            <h5>Tải ứng dụng RikStay</h5>
            <Box>
              <img
                width={"150"}
                height={"50"}
                src="https://www.luxstay.com/icons/apple-store.svg"
                alt=""
              />
            </Box>
            <Box mt={'0.5rem'}>
              <img
                width={"150"}
                height={"50"}
                src="https://www.luxstay.com/icons/google-play.svg"
                alt=""
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default About;
