import { useState, useEffect } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import useIsMobile from "../hooks/useIsMobile";

export const SliderCarousal = ({ children }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // useEffect(() => {
  //   let debounceTimeout;

  //   const handleScroll = () => {
  //     clearTimeout(debounceTimeout);

  //     debounceTimeout = setTimeout(() => {
  //       const scrollPosition = window.scrollY;
  //       if (scrollPosition === 0) {
  //         setActiveSlideIndex(0);
  //       } else if (scrollPosition <= 100) {
  //         setActiveSlideIndex(1);
  //       } else if (scrollPosition <= 200) {
  //         setActiveSlideIndex(2);
  //       } else {
  //         setActiveSlideIndex(3);
  //       }
  //     }, 100); // Adjust debounce time as needed
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     clearTimeout(debounceTimeout);
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div style={{ overflow: "hidden", height: "100%" }}>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={3}
        itemsToScroll={1}
        speed={400}
        forwardBtnProps={{
          style: {
            background: "transparent", 
            border: "none",
            display: "none",
          },
          children: <button>Next</button>,
        }}
        backwardBtnProps={{
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
            itemsToScroll: 1,
            minWidth: 460,
          },
        ]}
        easing="linear"
      >
        {children}
      </ReactSimplyCarousel>
    </div>
  );
};
