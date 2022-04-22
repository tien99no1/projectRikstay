import * as React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


export default function Voucher() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item sm={6} md={4} xs={12}>
            <Box className='img-voucher'>
              <img src="https://thuthuattienich.com/wp-content/uploads/2019/07/Voucher-Deal-Coupon-la-gi.jpg" alt="voucher1" />
            </Box>

        </Grid>
        <Grid item sm={6} md={4} xs={12}>
            <Box className='img-voucher'>
              <img src="https://upload.dxshop.vn/data/2021/10/04/615a64f53a991.jpg" alt="voucher2" />
            </Box>
        </Grid>
        <Grid item sm={6} md={4} xs={12}>
            <Box className='img-voucher'>
              <img src="https://cdn.shortpixel.ai/client/q_lossless,ret_img,w_1350/https://vn.blog.kkday.com/wp-content/uploads/bank-partner-blog.jpg" alt="voucher3" />
            </Box>
        </Grid>
      </Grid>
    </Box>
  );
}