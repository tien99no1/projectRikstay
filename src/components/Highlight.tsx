import React, { Component, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { CONFIG } from "../config";
import SliderCarousel from "./slideSlick";

export default function Highlight() {
  const [location, setLocation] = useState<any>([]);

  const getLocation = async () => {
    try {
      const data = await axios.get(`${CONFIG.ApiAddress}`);
      setLocation(data.data);
    } catch (e) {}
  };
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div>
      <SliderCarousel
        dots={false}
        slidesToShow={5}
        styles={{ display: "block" }}
      >
        {location.map((local: any) => (
          <div className="cover-highlights" key={local.id}>
            <Link to={`/home/location/${local.nameAddress}`}>
              <div className="img-highlights">
                <img src={local.img} alt="" />
              </div>
              <div className="content">
                <div className="title">{local.nameAddress}</div>
              </div>
            </Link>
          </div>
        ))}
      </SliderCarousel>
    </div>
  );
}
