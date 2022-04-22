import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SliderCarousel from "./slideSlick";

const imgRooms = [
  "https://cdn.luxstay.com/users/422177/RQCTZY4e-FQNlfRRj1td380-.jpg",
  "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/145/2020/03/02223250/Villa-Living-Room.jpg",
  "https://images.squarespace-cdn.com/content/v1/524b5395e4b0ad97e93a5b0f/1637346293387-3AE86GCGJZ6V0FYRFILH/NDA-1.+Wellness+Resort+in+Bai+Thung+Bay+%283%29.jpg",
  "https://www.hospitality-interiors.net/sites/hospitality-interiors.net/files/styles/article-header/public/images/article/2018/06/anantaraquynhonw.jpg?itok=KcetWVT0",
  "http://thuevilla.com/wp-content/uploads/2020/02/Bathroom-1-1.jpg",
  "https://d2zpvmybpipqvy.cloudfront.net/media/products/sanitary_ware/suite/images/ambience/generated_551d8311a81838df8f43291593029840761ccf91.jpg.1280x720_q85_crop%402x.jpg",
];
export default function BannerRoom() {
  return (
    <div className="div-banner-room">
      <SliderCarousel
        dots={false}
        slidesToShow={3}
        styles={{ display: "block" }}
      >
        {imgRooms.map((img: any, index: number) => (
          <div key={index}>
            <div className="img-room">
              <img src={img} alt="" />
            </div>
          </div>
        ))}
      </SliderCarousel>
    </div>
  );
}
