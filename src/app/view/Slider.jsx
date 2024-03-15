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
  
      // Calculate the index of the previous slide
      const previousSlideIndex = Math.floor(scrollPosition / slideHeight);
      // Calculate the index of the next slide
      const nextSlideIndex = previousSlideIndex + 1;
  
      // Update the current slide based on the scroll direction
      if (scrollPosition % slideHeight === 0) {
        setActiveSlideIndex(previousSlideIndex);
      } else {
        setActiveSlideIndex(nextSlideIndex);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ overflow: "hidden", height: "100%" }}>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={3}
        itemsToScroll={1}
        centerMode={isMobile ? true : false}
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
            itemsToScroll: 3,
            minWidth: 460,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {children}
      </ReactSimplyCarousel>
    </div>
  );
};
