"use client";

import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import useIsMobile from "../hooks/useIsMobile";

export const SliderCarousal = ({ children }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <ReactSimplyCarousel
      activeSlideIndex={activeSlideIndex}
      onRequestChange={setActiveSlideIndex}
      itemsToShow={3}
      itemsToScroll={1}
      centerMode={isMobile ? true : false}
      forwardBtnProps={{
        //here you can also pass className, or any other button element attributes
        style: {
          background: "transparent",
          border: "none",
          display: "none",
          position: "relative",
        },

        children: <button>Next</button>,
      }}
      backwardBtnProps={{
        //here you can also pass className, or any other button element attributes
        style: {
          background: "transparent",
          border: "none",
          display: "none",
        },

        children: <button>Prev</button>,
      }}
      responsiveProps={[
        {
          itemsToShow: 4,
          itemsToScroll: 3,
          minWidth: 460,
        },
      ]}
      speed={400}
      easing="linear"
    >
      {children}
    </ReactSimplyCarousel>
  );
};
