// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// const useIntersectionAnimation = (): React.RefObject<HTMLElement> => {
//     const boxRef = useRef<HTMLElement>(null); // Specify HTMLElement type for the ref

//     useEffect(() => {
//         const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     gsap.from(boxRef.current, {
//                         duration: 1,
//                         y: 100,
//                         opacity: 0,
//                         ease: "power2.out",
//                         delay: .3
//                     });
//                     observer.unobserve(entry.target);
//                 }
//             });
//         };

//         const observer = new IntersectionObserver(handleIntersection, { threshold: 0 });
//         if (boxRef.current) {
//             observer.observe(boxRef.current);
//         }

//         return () => {
//             if (boxRef.current) {
//                 observer.unobserve(boxRef.current);
//             }
//             observer.disconnect();
//         };
//     }, []);

//     return boxRef;
// };

// export default useIntersectionAnimation;
