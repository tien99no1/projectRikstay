import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import '../css/slick.css'

interface PropsSlider {
  dots: boolean, slidesToShow: number, children: object, styles: any
}

const SliderCarousel: React.FC<PropsSlider> = ({ dots, slidesToShow, children, styles }: PropsSlider) => {
  const settings = {
    dots: dots,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          infinite: true,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          infinite: true,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const ref = useRef<any>();

  const next = () => {
    ref.current.slickNext();
  };

  const previous = () => {
    ref.current.slickPrev();
  };

  return (

    <div className="post-relative">
      <Slider ref={ref} {...settings}>
        {children}
      </Slider>

      <div style={styles}>
        <button className="button_slick btn_prev" onClick={previous}>
          <BsChevronLeft className="icon_slick" />
        </button>
        <button className="button_slick btn_next" onClick={next}>
          <BsChevronRight className="icon_slick" />
        </button>
      </div>
    </div>
  );
};

export default SliderCarousel;