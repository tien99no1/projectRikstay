import { Box } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from 'react-router-dom'
import { CONFIG } from "../config/index";

function LoginSocialUser() {
  const navigate = useNavigate();
  
  const onLoginSuccess = (res: any) => {
    localStorage.setItem('user', JSON.stringify(res.profileObj.familyName))
    navigate('/')
  };

  const onLoginFailure = (res: any) => {
    // console.log("Đăng nhập thất bại:", res);
  };

  return (
    <Box>
        <GoogleLogin
         className="login-google"
          clientId={CONFIG.GOOLGE_CLIENT_ID}
          buttonText="Đăng nhập bằng Google"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
          autoLoad={false}
        />
     
    </Box>
  );
}
export default LoginSocialUser;
