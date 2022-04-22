import { Box } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../config/index";

function LoginSocial() {
  const navigate = useNavigate();

  const onLoginSuccess = (response: any) => {
    localStorage.setItem(
      "host",
      JSON.stringify(response.profileObj.familyName)
    );
    navigate("/dashboard");
  };

  const onLoginFailure = (res: any) => {
    // console.log("Login Failed:", res);
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
export default LoginSocial;
