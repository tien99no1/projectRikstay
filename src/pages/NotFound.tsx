import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div
        className="not-found"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: " center",
          marginTop: "3rem",
        }}
      >
        <img
          width={"70%"}
          height={"500px"}
          src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
          alt="not-found"
        />
      </div>
      <Link style={{ textAlign: "center" }} to="/" className="link-home">
        <h2>Trang chủ</h2>
      </Link>
    </>
  );
}

export default NotFound;
