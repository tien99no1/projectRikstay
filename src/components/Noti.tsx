import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface props {
  showNoti?: any;
  setShowNoti?: any;
  payload?: any;
}

export default function Noti({ showNoti, setShowNoti, payload }: props) {
  const handleClick = () => {
    setShowNoti(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNoti(false);
  };

  return (
    <>
      <Snackbar
        sx={{ display: "flex", alignItems: "center" }}
        open={showNoti}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={payload.status}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            fontSize: "1rem",
          }}
        >
          {payload.text}
        </Alert>
      </Snackbar>
    </>
  );
}
