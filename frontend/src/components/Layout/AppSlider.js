import React from "react";

import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";

const AppSlider = ({ images }) => {
  return <Carousel images={images} style={{ height: 800, width: 500 }} />;
};

export default AppSlider;
