import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCarousel from "./slideSlick";

export default function Recommend() {
  return (
    <div className="recomment-div">
      <SliderCarousel
        dots={false}
        slidesToShow={5}
        styles={{ display: "block" }}
      >
        <div className="recommend">
          <div className="img-recommend">
            <img
              src="https://cdn.luxstay.com/rooms/30534/large/f785394a9a4f7d11245e.jpg"
              alt=""
            />
          </div>
          <div className="content-recommend">
            <p className="title-recommend">Vi vu ngoại thành Hà Nội</p>
            <span>Trải nghiệm không gian thoáng đãng ngay gần Hà Nội</span>
          </div>
        </div>
        <div className="recommend">
          <div className="img-recommend">
            <img
              src="https://cdn.luxstay.com/users/170204/iXp24jSPqO_yk-o6oPUj4igd.png"
              alt=""
            />
          </div>
          <div className="content-recommend">
            <p className="title-recommend">Vũng Tàu biệt thự hồ bơi</p>
            <span>
              Những căn biệt thự có hồ bơi dành cho kỳ nghỉ của bạn tại Vũng Tàu
            </span>
          </div>
        </div>
        <div className="recommend">
          <div className="img-recommend">
            <img
              src="https://cdn.luxstay.com/rooms/33408/large/814EFB77-CD08-48A2-8975-F04A665B8A61.jpg"
              alt=""
            />
          </div>
          <div className="content-recommend">
            <p className="title-recommend">Sài Gòn cần là có ngay</p>
            <span>Những căn homestay có 1 phòng ngủ tại Sài Gòn</span>
          </div>
        </div>
        <div className="recommend">
          <div className="img-recommend">
            <img
              src="https://cdn.luxstay.com/rooms/31932/large/Rivergate-Residence-Apartment-22.jpg"
              alt=""
            />
          </div>
          <div className="content-recommend">
            <p className="title-recommend">Siêu giảm giá</p>
            <span>Top chỗ ở giảm giá đến 50% từ các chủ nhà thân thiện</span>
          </div>
        </div>
        <div className="recommend">
          <div className="img-recommend">
            <img
              src="https://cdn.luxstay.com/rooms/12185/large/1521623113_IMG_0852-HDR.jpg"
              alt=""
            />
          </div>
          <div className="content-recommend">
            <p className="title-recommend">Gần trung tâm</p>
            <span>Dễ dàng di chuyển khắp nơi </span>
          </div>
        </div>
        <div className="recommend">
          <div className="img-recommend">
            <img
              src="https://cdn.luxstay.com/rooms/37991/large/18d44ef810cef590acdf.jpg"
              alt=""
            />
          </div>
          <div className="content-recommend">
            <p className="title-recommend">Hà Nội nội thành lãng mạn</p>
            <span>
              Không khí lãng mạn dành cho cặp đôi tại trung tâm Hà Nội
            </span>
          </div>
        </div>
      </SliderCarousel>
    </div>
  );
}
