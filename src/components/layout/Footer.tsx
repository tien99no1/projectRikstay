import React from 'react'
import {Box, Container} from '@mui/material'

function Footer() {
  return (
    <Container maxWidth='xl'>
        <Box className='footer' mt={'2rem'} borderTop={'1px solid #f0f0f0'} fontSize={'0.9rem'} color={'#999'} textAlign={'center'}>
        <p>© 2022 Rikstay. Bản quyền thuộc về Công ty TNHH RikStay Việt Nam. Mọi hành vi sao chép đều là phạm pháp nếu không có sự cho phép bằng văn bản của chúng tôi.</p>
        <p>Tầng 19 tòa nhà Sông Đà, đường Phạm Hùng, quận Nam Từ Liêm, Hà Nội. Email: info@rikstay.com, Số điện thoại: 19001001.</p>
        <p>Giả vờ thui trang này phếch =))</p>

        </Box>
    </Container>
  )
}

export default Footer