/* eslint-disable react/prop-types */
import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";

export const SliderCarousal = ({children}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <ReactSimplyCarousel
      activeSlideIndex={activeSlideIndex}
      onRequestChange={setActiveSlideIndex}
      itemsToShow={1}
      itemsToScroll={1}
      forwardBtnProps={
        {
          //here you can also pass className, or any other button element attributes
        }
      }
      backwardBtnProps={
        {
          //here you can also pass className, or any other button element attributes
        }
      }
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
