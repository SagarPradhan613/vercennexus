"use client";

import { useState, useRef, useEffect } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import useIsMobile from "../hooks/useIsMobile";

export const SliderCarousal = ({ children }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const isMobile = useIsMobile();
  const carouselRef = useRef(null);

  // Intersection Observer callback
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // If carousel is in viewport, attach event listener for scrolling
        window.addEventListener("wheel", handleScroll);
      } else {
        // If carousel is not in viewport, remove event listener
        window.removeEventListener("wheel", handleScroll);
      }
    });
  };

  useEffect(() => {
    // Create a new Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    });

    // Observe the carousel element
    observer.observe(carouselRef.current);

    // Cleanup function
    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const handleScroll = (e) => {
  
      if (e.deltaY > 0) {
        // Scrolling down
        setActiveSlideIndex((prevIndex) =>
          Math.min(prevIndex + 1, children.length - 1)
        );
      } else if (e.deltaY < 0) {
        // Scrolling up
        setActiveSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
  
  };

  return (
    <div ref={carouselRef} style={{ overflow: "hidden", height: "100%" }}>
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
