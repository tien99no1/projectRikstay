// import React from "react";
import { Container, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import photo1 from "../images/banner1.png";
import photo2 from "../images/banner2.png";
import photo3 from "../images/banner3.png";
import '../css/slick.css'

const photos = [photo1, photo2, photo3];
interface IntervalProps {
  interval: number;
}
const Banner: React.FC<IntervalProps> = ({ interval }: IntervalProps) => {
  return (
    <div className="banner">
      <Carousel interval={3000}>
        {photos.map((photo, index) => {
          return (
            <Carousel.Item key={index}>
          <img
            className="d-block w-100 img-banner"
            src={photo}
            alt=""
          />
        </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
