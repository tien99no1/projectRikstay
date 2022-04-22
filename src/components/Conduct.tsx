import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Voucher() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item sm={6} md={3} xs={12}>
          <Box className="img-voucher">
            <img
              src="https://cdn.luxstay.com/home/theme/theme_4_1583838088.jpg"
              alt="conduct1"
            />
          </Box>
        </Grid>
        <Grid item sm={6} md={3} xs={12}>
          <Box className="img-voucher">
            <img
              src="https://cdn.luxstay.com/home/theme/theme_10_1583894021.jpg"
              alt="conduct2"
            />
          </Box>
        </Grid>
        <Grid item sm={6} md={3} xs={12}>
          <Box className="img-voucher">
            <img
              src="https://cdn.luxstay.com/home/theme/theme_2_1583837926.jpg"
              alt="conduct3"
            />
          </Box>
        </Grid>
        <Grid item sm={6} md={3} xs={12}>
          <Box className="img-voucher">
            <img
              src="https://cdn.luxstay.com/home/theme/theme_1_1584074526.jpg"
              alt="conduct4"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
