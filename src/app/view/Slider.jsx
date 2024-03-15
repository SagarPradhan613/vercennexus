import { useState, useEffect } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import useIsMobile from "../hooks/useIsMobile";

export const SliderCarousal = ({ children }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const slideHeight = viewportHeight - 200; // Adjust this value as needed

      console.log(scrollPosition, "scrollPosition");

      // Calculate the index of the previous slide
      const previousSlideIndex = Math.floor(scrollPosition / slideHeight);
      // Calculate the index of the next slide
      const nextSlideIndex = previousSlideIndex + 1;
      if (scrollPosition === 0) {
        console.log(0);
        setActiveSlideIndex(0);
      } else if (scrollPosition <= 100) {
        console.log(1);

        setActiveSlideIndex(1);
      } else if (scrollPosition <= 200) {
        console.log(2);

        setActiveSlideIndex(2);
      } else {
        console.log(3);

        setActiveSlideIndex(3);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(activeSlideIndex,'sli');
  return (
    <div style={{ overflow: "hidden", height: "100%" }}>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={3}
        itemsToScroll={1}
        speed={1000}
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
