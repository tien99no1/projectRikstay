import react from "react";

export const isAuthenticate = () => {
  const [isLoginHost, setIsLogginHost] = react.useState(false);
  const info = localStorage.getItem('hostId');
  if(info){
    return setIsLogginHost(true)
  }else {
    return setIsLogginHost(false);
  }
}