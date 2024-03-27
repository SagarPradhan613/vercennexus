'use client'

import React, { Suspense, useState, useEffect, useRef } from "react";
import Heading from "@/components/Heading";
import styled, { keyframes } from "styled-components";
import Flex from "@/components/Flex";
import IconButton from "@/components/IconButton";
import { FaArrowRight } from "react-icons/fa";
import { COLORS } from '@/utils/colors';
import Text from "@/components/Text";
import useIsMobile from "@/hooks/useIsMobile";
import useIsTab from "@/hooks/useIsTab";
import Header from "@/view/Header";
import Footer from "@/view/Footer";
import Card from '@/view/cards/ConnectedCard';
import BlueCard from '@/view/cards/BlueCard';
import { SliderCarousal } from "@/view/Slider";
import useIsBig from "@/hooks/useIsBig";
import SignInComponent from '@/view/SignInComponent';
import Nav from '@/components/Nav';
import { usePathname } from 'next/navigation';
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";



const MoveFromLeft = keyframes`
  from {
    transform: translateX(-1000px);
  }
  to {
    transform: translateX(0px);
  }
`;

const MoveFromLeftWrapper = styled.div`
  position: relative;
  animation: ${MoveFromLeft} 1s;
`;

const Section = styled.div`
  background: linear-gradient(
    115.03deg,
    #ffffff 6.54%,
    #0075ff 27.97%,
    rgba(0, 70, 153, 0.25) 119.25%
  );
  background-repeat: no-repeat;
  background-size: cover;
  margin: 1rem;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const IconButtonWrapper = styled.div`
  margin-right: 4rem;
  margin-top: 1rem;
`;

function SearchBarFallback() {
    return <>placeholder</>;
}

const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  margin-top: 20px;
  @media screen and (max-width: 520px) {
    height: 80px;
  }
`;

const NewHeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const BgWrapp = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const NewBgWrapp = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const Background = styled.div`
  width: 490px;
  height: 92px;
  position: relative;
  @media screen and (max-width: 520px) {
    width: 350px;
    height: 65px;
  }
`;

const NewBackground = styled.div`
    width:60vw;
  height: 150px;
  position: relative;
  @media screen and (max-width: 520px) {
    width: 350px;
    height: 65px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 520px) {
    left: 55%;
  };
  @media screen and (min-width:520px) and (max-width:610px){
    width:60% !important;
    left:65% !important;
  }
  @media screen and (min-width:520px) and (max-width:1024px){
margin-top:1rem;
  }
`;

const Icon = styled.a`
  color: ${COLORS.white};
  cursor: pointer;
  transition: transform 1s ease;
  &:hover {
    color: ${COLORS.blue};
  }
`;

const About = () => {

    const pathname = usePathname();
    const [isActive, setIsActive] = useState(false);

    const isMobile = useIsMobile();
    const isTab = useIsTab();
    const isBig = useIsBig();
    const [textAnim, setTextAnim] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextAnim((prev) => [...prev, 1]);
        }, 250);

        // Clear the interval when the array length reaches 3
        if (textAnim.length === 3) {
            clearInterval(interval);
        }
        console.log(textAnim);
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [textAnim]);
    // Add textAnim to dependencies to ensure effect is updated
    if (typeof window !== "undefined") {
        const cursor = document.querySelector(".cursor");

        document.addEventListener("mousemove", (e) => {
            cursor?.setAttribute(
                "style",
                "top: " + (e.pageY - 5) + "px; left: " + (e.pageX - 5) + "px;"
            );
            if (e.target.tagName.toLowerCase() === "button") {
                cursor?.setAttribute(
                    "style",
                    "top: " +
                    (e.pageY - 5) +
                    "px; left: " +
                    (e.pageX - 5) +
                    "px; background-color: " +
                    (e.target.tagName.toLowerCase() === "button"
                        ? "#0075FF"
                        : "transparent") +
                    ";"
                );
            }
        });

        document.addEventListener("click", (e) => {
            cursor?.classList.add("expand");
            setTimeout(() => {
                cursor?.classList.remove("expand");
            }, 500);
        });
    }

    const [opac, setOpac] = useState(0);

    useEffect(() => {
        setOpac(0);
        setTimeout(() => {
            setOpac(1);
        }, 100);
    }, []);

    const [grad, setGrad] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setGrad((prevGrad) => !prevGrad);
        }, 10000);

        return () => clearInterval(interval);
    }, []);



    useEffect(() => {
        if (isActive) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isActive]);


    const boxRef = useRef(null);
    const viewRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    setTimeout(() => {
                        entry.target.classList.add('slowly-hidden');
                        entry.target.classList.remove('slowly-visible');
                    }, 500); // Remove class after 2 seconds
                }
            });
        });

        const hiddenElements = document.querySelectorAll('.slowly-visible');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            // Clean up observer on component unmount
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add('bottom-to-top');
                    entry.target.classList.remove('hideTopAnimation');

                }
            });
        });

        const hiddenElements = document.querySelectorAll('.hideTopAnimationnodelay');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            // Clean up observer on component unmount
            observer.disconnect();
        };
    }, []);


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    setTimeout(() => {
                        entry.target.classList.add('show');
                        entry.target.classList.remove('hideAnimation');
                    }, 1000); // Remove class after 2 seconds
                }
            });
        });

        const hiddenElements = document.querySelectorAll('.hideAnimation');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            // Clean up observer on component unmount
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div>
                {/* modal */}
                {isActive ?
                    <>
                        <div className="absolute justify-between flex flex-col h-screen px-8 py-6 w-screen bg-black z-[100] top-0 left-0">
                            <div>
                                <div className="w-full items-center flex justify-between">
                                    <div>
                                        <svg width="72" height="10" viewBox="0 0 72 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M62.4587 8.82272C62.1994 8.82272 61.9893 8.61256 61.9893 8.35331V7.74702C61.9893 7.48745 62.1999 7.27715 62.4595 7.2776L68.827 7.28868C69.1759 7.28868 69.4415 7.2094 69.6238 7.05084C69.8141 6.88436 69.9092 6.61877 69.9092 6.25409C69.9092 5.88941 69.8141 5.62779 69.6238 5.46923C69.4415 5.30275 69.1759 5.21951 68.827 5.21951H64.5698C63.6898 5.21951 63.004 5.00942 62.5125 4.58924C62.0289 4.16114 61.7871 3.53484 61.7871 2.71034C61.7871 1.88584 62.0289 1.2635 62.5125 0.843328C63.004 0.415224 63.6898 0.201172 64.5698 0.201172H70.7836C71.0428 0.201172 71.253 0.411335 71.253 0.670585V1.27683C71.253 1.53642 71.0423 1.74672 70.7827 1.74624L64.7719 1.73521C64.431 1.73521 64.1655 1.81449 63.9752 1.97305C63.7849 2.12368 63.6898 2.36944 63.6898 2.71034C63.6898 3.05124 63.7849 3.30097 63.9752 3.45952C64.1655 3.61015 64.431 3.68547 64.7719 3.68547H69.0292C69.9092 3.68547 70.591 3.90348 71.0746 4.33951C71.5661 4.76762 71.8119 5.40581 71.8119 6.25409C71.8119 7.09445 71.5661 7.73264 71.0746 8.16867C70.591 8.6047 69.9092 8.82272 69.0292 8.82272H62.4587Z" fill="white" />
                                            <path d="M53.6311 8.82283C52.7669 8.82283 52.0851 8.71184 51.5857 8.48986C51.0862 8.25995 50.7295 7.91509 50.5154 7.45528C50.3014 6.99546 50.1943 6.41673 50.1943 5.71907V0.730155C50.1943 0.470905 50.4045 0.260742 50.6637 0.260742H51.6276C51.8869 0.260742 52.097 0.470905 52.097 0.730155V5.71907C52.097 6.32159 52.2358 6.73384 52.5132 6.95582C52.7986 7.16987 53.2783 7.2769 53.9521 7.2769H56.2473C56.9211 7.2769 57.3968 7.16987 57.6743 6.95582C57.9597 6.73384 58.1024 6.32159 58.1024 5.71907V0.730155C58.1024 0.470905 58.3125 0.260742 58.5718 0.260742H59.5356C59.7949 0.260742 60.0051 0.470905 60.0051 0.730155V5.71907C60.0051 6.41673 59.898 6.99546 59.684 7.45528C59.4699 7.91509 59.1132 8.25995 58.6137 8.48986C58.1143 8.71184 57.4325 8.82283 56.5683 8.82283H53.6311Z" fill="white" />
                                            <path d="M38.7482 8.76337C38.3613 8.76337 38.1405 8.32157 38.3728 8.01214L40.7846 4.79942C40.9098 4.63264 40.91 4.40325 40.785 4.2363L38.3708 1.01147C38.1392 0.70196 38.36 0.260742 38.7466 0.260742H39.89C40.0395 0.260742 40.18 0.331935 40.2684 0.452449L42.5438 3.55333C42.6322 3.67384 42.7728 3.74504 42.9223 3.74504H43.5408C43.6902 3.74504 43.8308 3.67384 43.9192 3.55333L46.1946 0.452449C46.283 0.331934 46.4236 0.260742 46.573 0.260742H47.7164C48.103 0.260742 48.3239 0.70196 48.0922 1.01147L45.6781 4.2363C45.5531 4.40325 45.5532 4.63264 45.6784 4.79942L48.0902 8.01214C48.3225 8.32157 48.1017 8.76337 47.7148 8.76337H46.5613C46.4118 8.76337 46.2711 8.69209 46.1827 8.57144L43.9192 5.4829C43.8308 5.36225 43.6902 5.29097 43.5406 5.29097H42.9224C42.7729 5.29097 42.6322 5.36225 42.5438 5.4829L40.2803 8.57144C40.1919 8.69209 40.0513 8.76337 39.9017 8.76337H38.7482Z" fill="white" />
                                            <path d="M27.7707 8.76337C27.5114 8.76337 27.3013 8.55321 27.3013 8.29396V0.730155C27.3013 0.470906 27.5114 0.260742 27.7707 0.260742H36.155C36.4143 0.260742 36.6244 0.470905 36.6244 0.730155V1.33726C36.6244 1.59651 36.4143 1.80667 36.155 1.80667H29.6734C29.4141 1.80667 29.204 2.01684 29.204 2.27609V3.21616C29.204 3.47541 29.4141 3.68558 29.6734 3.68558H35.4653C35.7245 3.68558 35.9347 3.89574 35.9347 4.15499V4.7621C35.9347 5.02135 35.7245 5.23151 35.4653 5.23151H29.6734C29.4141 5.23151 29.204 5.44167 29.204 5.70092V6.74802C29.204 7.00727 29.4141 7.21744 29.6734 7.21744H36.155C36.4143 7.21744 36.6244 7.4276 36.6244 7.68685V8.29396C36.6244 8.55321 36.4143 8.76337 36.155 8.76337H27.7707Z" fill="white" />
                                            <path d="M15.6662 8.76288C15.4069 8.76288 15.1968 8.55272 15.1968 8.29347V0.729667C15.1968 0.470417 15.4069 0.260254 15.6662 0.260254H16.9266C17.0524 0.260254 17.1729 0.310726 17.2612 0.400355L22.3366 5.55599C22.6312 5.85528 23.1405 5.64666 23.1405 5.22668V0.729667C23.1405 0.470418 23.3507 0.260254 23.6099 0.260254H24.5738C24.833 0.260254 25.0432 0.470417 25.0432 0.729667V8.29347C25.0432 8.55272 24.833 8.76288 24.5738 8.76288H23.3136C23.1876 8.76288 23.067 8.71228 22.9787 8.62246L17.9037 3.45717C17.6092 3.15743 17.0995 3.36595 17.0995 3.78615V8.29347C17.0995 8.55272 16.8893 8.76288 16.6301 8.76288H15.6662Z" fill="white" />
                                            <path d="M10.0796 0.705164C10.0796 0.309517 9.62015 0.0913364 9.31353 0.341369L7.59646 1.74152C7.48713 1.83067 7.42369 1.96425 7.42369 2.10531V5.66602C7.42369 6.04307 7.00161 6.26625 6.69 6.05397L4.7903 4.75981C4.47868 4.54753 4.0566 4.77071 4.0566 5.14776V6.80752C4.0566 6.95555 4.12643 7.09491 4.24501 7.18353L7.29871 9.46568C7.37985 9.52631 7.47843 9.55908 7.57972 9.55908H9.61018C9.86943 9.55908 10.0796 9.34892 10.0796 9.08967V0.705164Z" fill="white" />
                                            <path d="M0.789062 9.05509C0.789062 9.45074 1.2485 9.66892 1.55512 9.41888L3.27219 8.01873C3.38152 7.92959 3.44496 7.796 3.44496 7.65494V4.09423C3.44496 3.71718 3.86704 3.494 4.17865 3.70628L6.07836 5.00044C6.38997 5.21272 6.81205 4.98954 6.81205 4.61249V2.95273C6.81205 2.8047 6.74222 2.66534 6.62365 2.57672L3.56994 0.294575C3.4888 0.233938 3.39022 0.201173 3.28893 0.201173H1.25848C0.999226 0.201173 0.789062 0.411336 0.789062 0.670586V9.05509Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0049 1.16806C11.2382 1.16806 11.4273 0.978911 11.4273 0.745588C11.4273 0.512265 11.2382 0.32312 11.0049 0.32312C10.7715 0.32312 10.5824 0.512265 10.5824 0.745588C10.5824 0.978911 10.7715 1.16806 11.0049 1.16806ZM11.0049 1.23043C11.2726 1.23043 11.4897 1.01336 11.4897 0.745588C11.4897 0.477815 11.2726 0.260742 11.0049 0.260742C10.7371 0.260742 10.52 0.477815 10.52 0.745588C10.52 1.01336 10.7371 1.23043 11.0049 1.23043Z" fill="white" />
                                            <path d="M11.2219 0.585449H11.2865V0.897338H11.2259V0.6906L11.1328 0.841644H11.1127L11.0191 0.6906V0.897338H10.959V0.585449H11.0231L11.1225 0.745849L11.2219 0.585449Z" fill="white" />
                                            <path d="M10.9178 0.585449V0.641589H10.843V0.897338H10.7824V0.641589H10.7075V0.585449H10.9178Z" fill="white" />
                                        </svg>
                                    </div>

                                    <div onClick={() => { setIsActive(false) }} >
                                        <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.7925 11.168L12.3679 18.5926" stroke="white" stroke-width="2" stroke-linecap="round" />
                                            <path d="M12.3677 11.168L19.7923 18.5926" stroke="white" stroke-width="2" stroke-linecap="round" />
                                        </svg>
                                    </div>
                                </div>


                                <div className="mt-10">
                                    <a href="/" className="flex model-nav group hover:bg-[#0075FF] transition-all duration-300 ease-in-out rounded-[36px] px-3 pl-6 py-3 w-full justify-between">
                                        <div>
                                            <p className="font-semibold text-xl text-white">Home</p>
                                        </div>
                                        <div className="rounded-[50%] group-hover:bg-[white] w-[30px] h-[30px] transition-all duration-300 ease-in-out bg-[#0075FF]  flex justify-center items-center">
                                            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path className="hover-white" d="M9.99566 7.02301C10.2886 6.73011 10.2886 6.25524 9.99566 5.96235L5.22269 1.18938C4.9298 0.896482 4.45492 0.896482 4.16203 1.18938C3.86914 1.48227 3.86914 1.95714 4.16203 2.25004L8.40467 6.49268L4.16203 10.7353C3.86914 11.0282 3.86914 11.5031 4.16203 11.796C4.45493 12.0889 4.9298 12.0889 5.22269 11.796L9.99566 7.02301ZM1.09984 5.74268C0.685626 5.74268 0.349839 6.07846 0.349839 6.49268C0.349839 6.90689 0.685626 7.24268 1.09984 7.24268L1.09984 5.74268ZM9.46533 5.74268L1.09984 5.74268L1.09984 7.24268L9.46533 7.24268L9.46533 5.74268Z" fill="white" />
                                            </svg>
                                        </div>
                                    </a>
                                    <a href="/leaderboard" className="flex model-nav group hover:bg-[#0075FF] transition-all duration-300 ease-in-out rounded-[36px] px-3 pl-6 py-3 w-full justify-between">
                                        <div>
                                            <p className="font-semibold text-xl text-white">Leaderboard</p>
                                        </div>
                                        <div className="rounded-[50%] group-hover:bg-[white] w-[30px] h-[30px] transition-all duration-300 ease-in-out bg-[#0075FF]  flex justify-center items-center">
                                            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path className="hover-white" d="M9.99566 7.02301C10.2886 6.73011 10.2886 6.25524 9.99566 5.96235L5.22269 1.18938C4.9298 0.896482 4.45492 0.896482 4.16203 1.18938C3.86914 1.48227 3.86914 1.95714 4.16203 2.25004L8.40467 6.49268L4.16203 10.7353C3.86914 11.0282 3.86914 11.5031 4.16203 11.796C4.45493 12.0889 4.9298 12.0889 5.22269 11.796L9.99566 7.02301ZM1.09984 5.74268C0.685626 5.74268 0.349839 6.07846 0.349839 6.49268C0.349839 6.90689 0.685626 7.24268 1.09984 7.24268L1.09984 5.74268ZM9.46533 5.74268L1.09984 5.74268L1.09984 7.24268L9.46533 7.24268L9.46533 5.74268Z" fill="white" />
                                            </svg>
                                        </div>
                                    </a>
                                    <a href="/airdrop" className="flex model-nav group hover:bg-[#0075FF] transition-all duration-300 ease-in-out rounded-[36px] px-3 pl-6 py-3 w-full justify-between">
                                        <div>
                                            <p className="font-semibold text-xl text-white">Airdrop</p>
                                        </div>
                                        <div className="rounded-[50%] group-hover:bg-[white] w-[30px] h-[30px] transition-all duration-300 ease-in-out bg-[#0075FF]  flex justify-center items-center">
                                            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path className="hover-white" d="M9.99566 7.02301C10.2886 6.73011 10.2886 6.25524 9.99566 5.96235L5.22269 1.18938C4.9298 0.896482 4.45492 0.896482 4.16203 1.18938C3.86914 1.48227 3.86914 1.95714 4.16203 2.25004L8.40467 6.49268L4.16203 10.7353C3.86914 11.0282 3.86914 11.5031 4.16203 11.796C4.45493 12.0889 4.9298 12.0889 5.22269 11.796L9.99566 7.02301ZM1.09984 5.74268C0.685626 5.74268 0.349839 6.07846 0.349839 6.49268C0.349839 6.90689 0.685626 7.24268 1.09984 7.24268L1.09984 5.74268ZM9.46533 5.74268L1.09984 5.74268L1.09984 7.24268L9.46533 7.24268L9.46533 5.74268Z" fill="white" />
                                            </svg>
                                        </div>
                                    </a>
                                    <a href="/about" className="flex model-nav group hover:bg-[#0075FF] transition-all duration-300 ease-in-out rounded-[36px] px-3 pl-6 py-3 w-full justify-between">
                                        <div>
                                            <p className="font-semibold text-xl text-white">About</p>
                                        </div>
                                        <div className="rounded-[50%] group-hover:bg-[white] w-[30px] h-[30px] transition-all duration-300 ease-in-out bg-[#0075FF]  flex justify-center items-center">
                                            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path className="hover-white" d="M9.99566 7.02301C10.2886 6.73011 10.2886 6.25524 9.99566 5.96235L5.22269 1.18938C4.9298 0.896482 4.45492 0.896482 4.16203 1.18938C3.86914 1.48227 3.86914 1.95714 4.16203 2.25004L8.40467 6.49268L4.16203 10.7353C3.86914 11.0282 3.86914 11.5031 4.16203 11.796C4.45493 12.0889 4.9298 12.0889 5.22269 11.796L9.99566 7.02301ZM1.09984 5.74268C0.685626 5.74268 0.349839 6.07846 0.349839 6.49268C0.349839 6.90689 0.685626 7.24268 1.09984 7.24268L1.09984 5.74268ZM9.46533 5.74268L1.09984 5.74268L1.09984 7.24268L9.46533 7.24268L9.46533 5.74268Z" fill="white" />
                                            </svg>
                                        </div>
                                    </a>
                                    {/* <div className="flex model-nav group hover:bg-[#0075FF] transition-all duration-300 ease-in-out rounded-[36px] px-3 pl-6 py-3 w-full justify-between">
                                        <div>
                                            <p className="font-semibold text-xl text-white">FAQ</p>
                                        </div>
                                        <div className="rounded-[50%] group-hover:bg-[white] w-[30px] h-[30px] transition-all duration-300 ease-in-out bg-[#0075FF]  flex justify-center items-center">
                                            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path className="hover-white" d="M9.99566 7.02301C10.2886 6.73011 10.2886 6.25524 9.99566 5.96235L5.22269 1.18938C4.9298 0.896482 4.45492 0.896482 4.16203 1.18938C3.86914 1.48227 3.86914 1.95714 4.16203 2.25004L8.40467 6.49268L4.16203 10.7353C3.86914 11.0282 3.86914 11.5031 4.16203 11.796C4.45493 12.0889 4.9298 12.0889 5.22269 11.796L9.99566 7.02301ZM1.09984 5.74268C0.685626 5.74268 0.349839 6.07846 0.349839 6.49268C0.349839 6.90689 0.685626 7.24268 1.09984 7.24268L1.09984 5.74268ZM9.46533 5.74268L1.09984 5.74268L1.09984 7.24268L9.46533 7.24268L9.46533 5.74268Z" fill="white" />
                                            </svg>
                                        </div>
                                    </div> */}
                                </div>
                            </div>


                            <div className="w-full items-center flex justify-between">
                                <div>
                                    <svg width="72" height="10" viewBox="0 0 72 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M62.4587 8.82272C62.1994 8.82272 61.9893 8.61256 61.9893 8.35331V7.74702C61.9893 7.48745 62.1999 7.27715 62.4595 7.2776L68.827 7.28868C69.1759 7.28868 69.4415 7.2094 69.6238 7.05084C69.8141 6.88436 69.9092 6.61877 69.9092 6.25409C69.9092 5.88941 69.8141 5.62779 69.6238 5.46923C69.4415 5.30275 69.1759 5.21951 68.827 5.21951H64.5698C63.6898 5.21951 63.004 5.00942 62.5125 4.58924C62.0289 4.16114 61.7871 3.53484 61.7871 2.71034C61.7871 1.88584 62.0289 1.2635 62.5125 0.843328C63.004 0.415224 63.6898 0.201172 64.5698 0.201172H70.7836C71.0428 0.201172 71.253 0.411335 71.253 0.670585V1.27683C71.253 1.53642 71.0423 1.74672 70.7827 1.74624L64.7719 1.73521C64.431 1.73521 64.1655 1.81449 63.9752 1.97305C63.7849 2.12368 63.6898 2.36944 63.6898 2.71034C63.6898 3.05124 63.7849 3.30097 63.9752 3.45952C64.1655 3.61015 64.431 3.68547 64.7719 3.68547H69.0292C69.9092 3.68547 70.591 3.90348 71.0746 4.33951C71.5661 4.76762 71.8119 5.40581 71.8119 6.25409C71.8119 7.09445 71.5661 7.73264 71.0746 8.16867C70.591 8.6047 69.9092 8.82272 69.0292 8.82272H62.4587Z" fill="white" />
                                        <path d="M53.6311 8.82283C52.7669 8.82283 52.0851 8.71184 51.5857 8.48986C51.0862 8.25995 50.7295 7.91509 50.5154 7.45528C50.3014 6.99546 50.1943 6.41673 50.1943 5.71907V0.730155C50.1943 0.470905 50.4045 0.260742 50.6637 0.260742H51.6276C51.8869 0.260742 52.097 0.470905 52.097 0.730155V5.71907C52.097 6.32159 52.2358 6.73384 52.5132 6.95582C52.7986 7.16987 53.2783 7.2769 53.9521 7.2769H56.2473C56.9211 7.2769 57.3968 7.16987 57.6743 6.95582C57.9597 6.73384 58.1024 6.32159 58.1024 5.71907V0.730155C58.1024 0.470905 58.3125 0.260742 58.5718 0.260742H59.5356C59.7949 0.260742 60.0051 0.470905 60.0051 0.730155V5.71907C60.0051 6.41673 59.898 6.99546 59.684 7.45528C59.4699 7.91509 59.1132 8.25995 58.6137 8.48986C58.1143 8.71184 57.4325 8.82283 56.5683 8.82283H53.6311Z" fill="white" />
                                        <path d="M38.7482 8.76337C38.3613 8.76337 38.1405 8.32157 38.3728 8.01214L40.7846 4.79942C40.9098 4.63264 40.91 4.40325 40.785 4.2363L38.3708 1.01147C38.1392 0.70196 38.36 0.260742 38.7466 0.260742H39.89C40.0395 0.260742 40.18 0.331935 40.2684 0.452449L42.5438 3.55333C42.6322 3.67384 42.7728 3.74504 42.9223 3.74504H43.5408C43.6902 3.74504 43.8308 3.67384 43.9192 3.55333L46.1946 0.452449C46.283 0.331934 46.4236 0.260742 46.573 0.260742H47.7164C48.103 0.260742 48.3239 0.70196 48.0922 1.01147L45.6781 4.2363C45.5531 4.40325 45.5532 4.63264 45.6784 4.79942L48.0902 8.01214C48.3225 8.32157 48.1017 8.76337 47.7148 8.76337H46.5613C46.4118 8.76337 46.2711 8.69209 46.1827 8.57144L43.9192 5.4829C43.8308 5.36225 43.6902 5.29097 43.5406 5.29097H42.9224C42.7729 5.29097 42.6322 5.36225 42.5438 5.4829L40.2803 8.57144C40.1919 8.69209 40.0513 8.76337 39.9017 8.76337H38.7482Z" fill="white" />
                                        <path d="M27.7707 8.76337C27.5114 8.76337 27.3013 8.55321 27.3013 8.29396V0.730155C27.3013 0.470906 27.5114 0.260742 27.7707 0.260742H36.155C36.4143 0.260742 36.6244 0.470905 36.6244 0.730155V1.33726C36.6244 1.59651 36.4143 1.80667 36.155 1.80667H29.6734C29.4141 1.80667 29.204 2.01684 29.204 2.27609V3.21616C29.204 3.47541 29.4141 3.68558 29.6734 3.68558H35.4653C35.7245 3.68558 35.9347 3.89574 35.9347 4.15499V4.7621C35.9347 5.02135 35.7245 5.23151 35.4653 5.23151H29.6734C29.4141 5.23151 29.204 5.44167 29.204 5.70092V6.74802C29.204 7.00727 29.4141 7.21744 29.6734 7.21744H36.155C36.4143 7.21744 36.6244 7.4276 36.6244 7.68685V8.29396C36.6244 8.55321 36.4143 8.76337 36.155 8.76337H27.7707Z" fill="white" />
                                        <path d="M15.6662 8.76288C15.4069 8.76288 15.1968 8.55272 15.1968 8.29347V0.729667C15.1968 0.470417 15.4069 0.260254 15.6662 0.260254H16.9266C17.0524 0.260254 17.1729 0.310726 17.2612 0.400355L22.3366 5.55599C22.6312 5.85528 23.1405 5.64666 23.1405 5.22668V0.729667C23.1405 0.470418 23.3507 0.260254 23.6099 0.260254H24.5738C24.833 0.260254 25.0432 0.470417 25.0432 0.729667V8.29347C25.0432 8.55272 24.833 8.76288 24.5738 8.76288H23.3136C23.1876 8.76288 23.067 8.71228 22.9787 8.62246L17.9037 3.45717C17.6092 3.15743 17.0995 3.36595 17.0995 3.78615V8.29347C17.0995 8.55272 16.8893 8.76288 16.6301 8.76288H15.6662Z" fill="white" />
                                        <path d="M10.0796 0.705164C10.0796 0.309517 9.62015 0.0913364 9.31353 0.341369L7.59646 1.74152C7.48713 1.83067 7.42369 1.96425 7.42369 2.10531V5.66602C7.42369 6.04307 7.00161 6.26625 6.69 6.05397L4.7903 4.75981C4.47868 4.54753 4.0566 4.77071 4.0566 5.14776V6.80752C4.0566 6.95555 4.12643 7.09491 4.24501 7.18353L7.29871 9.46568C7.37985 9.52631 7.47843 9.55908 7.57972 9.55908H9.61018C9.86943 9.55908 10.0796 9.34892 10.0796 9.08967V0.705164Z" fill="white" />
                                        <path d="M0.789062 9.05509C0.789062 9.45074 1.2485 9.66892 1.55512 9.41888L3.27219 8.01873C3.38152 7.92959 3.44496 7.796 3.44496 7.65494V4.09423C3.44496 3.71718 3.86704 3.494 4.17865 3.70628L6.07836 5.00044C6.38997 5.21272 6.81205 4.98954 6.81205 4.61249V2.95273C6.81205 2.8047 6.74222 2.66534 6.62365 2.57672L3.56994 0.294575C3.4888 0.233938 3.39022 0.201173 3.28893 0.201173H1.25848C0.999226 0.201173 0.789062 0.411336 0.789062 0.670586V9.05509Z" fill="white" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0049 1.16806C11.2382 1.16806 11.4273 0.978911 11.4273 0.745588C11.4273 0.512265 11.2382 0.32312 11.0049 0.32312C10.7715 0.32312 10.5824 0.512265 10.5824 0.745588C10.5824 0.978911 10.7715 1.16806 11.0049 1.16806ZM11.0049 1.23043C11.2726 1.23043 11.4897 1.01336 11.4897 0.745588C11.4897 0.477815 11.2726 0.260742 11.0049 0.260742C10.7371 0.260742 10.52 0.477815 10.52 0.745588C10.52 1.01336 10.7371 1.23043 11.0049 1.23043Z" fill="white" />
                                        <path d="M11.2219 0.585449H11.2865V0.897338H11.2259V0.6906L11.1328 0.841644H11.1127L11.0191 0.6906V0.897338H10.959V0.585449H11.0231L11.1225 0.745849L11.2219 0.585449Z" fill="white" />
                                        <path d="M10.9178 0.585449V0.641589H10.843V0.897338H10.7824V0.641589H10.7075V0.585449H10.9178Z" fill="white" />
                                    </svg>
                                </div>

                                <div className="flex gap-4 items-center" >
                                    {/* <div className="hover:scale-125 transition-all duration-300 ease-in-out">
                                        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5563 9.24295C10.5563 9.24295 12.3941 1.82228 12.4626 0.829505L12.4637 0.828433C12.4637 0.714912 12.4744 0.646371 12.4744 0.588539C12.4744 0.485727 12.4626 0.394695 12.4519 0.348644C12.4059 0.235123 12.3598 0.200852 12.2806 0.166581C12.1092 0.109821 11.8233 0.200852 11.8233 0.200852C11.8233 0.200852 1.69629 3.84318 1.11369 4.25443C0.988388 4.33368 0.954117 4.39151 0.931627 4.44827C0.828815 4.73315 1.13725 4.85845 1.13725 4.85845L3.75146 5.71522C3.75146 5.71522 3.85427 5.72593 3.88854 5.70451C4.48185 5.32753 9.86021 1.92509 10.1686 1.82228C10.2254 1.79979 10.2586 1.82228 10.2479 1.84477C10.1226 2.29029 5.45321 6.44561 5.45321 6.44561C5.45321 6.44561 5.42965 6.45739 5.41787 6.49166L5.40716 6.51522V6.53771L5.16727 9.15192C5.16727 9.31149 5.21332 9.61993 5.65777 9.25473C5.73016 9.19776 5.79918 9.13661 5.86446 9.0716L5.87517 9.06089C6.0053 8.93206 6.13849 8.80636 6.27464 8.68391C6.60556 8.36477 6.914 8.10131 7.11962 7.91925C7.16036 7.88791 7.19866 7.85354 7.23422 7.81644C8.13596 8.44402 9.09447 9.12943 9.5175 9.48285C9.58556 9.55214 9.66749 9.60628 9.75792 9.64171C9.84835 9.67715 9.94525 9.69308 10.0423 9.68847C10.4417 9.67776 10.5563 9.24295 10.5563 9.24295Z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="hover:scale-125 transition-all duration-300 ease-in-out">
                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.20934 9.70028C8.4589 9.70028 10.7852 6.03587 10.7852 2.86018C10.7852 2.7585 10.7852 2.65681 10.779 2.54877C11.2336 2.20738 11.6244 1.78618 11.933 1.30506C11.5181 1.49572 11.0719 1.62282 10.6018 1.68637C11.0881 1.37971 11.4501 0.906214 11.622 0.351781C11.1757 0.63141 10.6813 0.828421 10.15 0.93646C9.93866 0.694758 9.67932 0.501262 9.38902 0.368717C9.09873 0.236172 8.78408 0.167588 8.46579 0.16748C7.18842 0.16748 6.15012 1.24723 6.15012 2.57419C6.15012 2.76485 6.17453 2.9428 6.21145 3.12074C4.29383 3.02541 2.59025 2.06006 1.44869 0.605989C1.24311 0.97594 1.13571 1.39378 1.13701 1.81856C1.13701 2.65109 1.54632 3.38766 2.16341 3.81918C1.79661 3.80656 1.43825 3.70408 1.11886 3.52048V3.55226C1.11886 4.71526 1.9187 5.69269 2.96889 5.90877C2.77362 5.96597 2.5721 5.99139 2.35806 5.99139C2.21161 5.99139 2.06516 5.97868 1.92496 5.9469C2.21786 6.9059 3.07278 7.59798 4.08605 7.61705C3.27391 8.28388 2.26091 8.64733 1.21649 8.64659C1.03312 8.64659 0.84411 8.64023 0.666992 8.61481C1.71645 9.3236 2.94895 9.70127 4.20934 9.70028Z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="hover:scale-125 transition-all duration-300 ease-in-out">
                                        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.6244 0.95855C9.85202 0.586124 9.03688 0.320447 8.19937 0.168175C8.19171 0.166632 8.18377 0.167676 8.17671 0.171158C8.16964 0.174641 8.16381 0.180382 8.16005 0.187559C8.05578 0.383277 7.93959 0.637773 7.85856 0.838493C6.9555 0.69454 6.0369 0.69454 5.13384 0.838493C5.04302 0.615974 4.94058 0.398875 4.82699 0.188184C4.82314 0.181248 4.81738 0.17569 4.81047 0.172233C4.80357 0.168776 4.79583 0.16758 4.78827 0.1688C3.95071 0.32057 3.13553 0.586048 2.36325 0.95855C2.35637 0.961351 2.35052 0.966391 2.34657 0.972932C0.801591 3.39471 0.378554 5.7577 0.586497 8.09069C0.587076 8.09642 0.588745 8.10198 0.591406 8.10703C0.594067 8.11208 0.597665 8.11651 0.601989 8.12008C1.50146 8.81946 2.50763 9.35335 3.57755 9.69895C3.58506 9.70136 3.5931 9.70126 3.60057 9.69869C3.60804 9.69612 3.61456 9.69118 3.61925 9.68457C3.84865 9.35566 4.05302 9.00925 4.22819 8.64533C4.23062 8.64033 4.232 8.63485 4.23225 8.62925C4.2325 8.62366 4.23161 8.61806 4.22963 8.61286C4.22766 8.60765 4.22465 8.60294 4.2208 8.59905C4.21696 8.59516 4.21237 8.59218 4.20733 8.5903C3.88628 8.46125 3.57547 8.30569 3.27785 8.12508C3.27244 8.12178 3.26788 8.11714 3.26459 8.11157C3.26129 8.10599 3.25935 8.09965 3.25894 8.0931C3.25852 8.08656 3.25965 8.08 3.26222 8.07402C3.26479 8.06804 3.26873 8.06281 3.27367 8.0588C3.33624 8.0094 3.3988 7.95875 3.45838 7.90685C3.46369 7.9022 3.47013 7.89921 3.47698 7.89822C3.48382 7.89722 3.4908 7.89826 3.49711 7.90122C5.44725 8.83604 7.55886 8.83604 9.48576 7.90122C9.49209 7.89805 9.49915 7.89684 9.50611 7.89772C9.51308 7.89861 9.51966 7.90156 9.52508 7.90622C9.58467 7.95812 9.64663 8.0094 9.70979 8.0588C9.7148 8.06271 9.71881 8.06786 9.72148 8.07378C9.72414 8.0797 9.72539 8.08622 9.72509 8.09277C9.7248 8.09931 9.72298 8.10568 9.71979 8.11132C9.7166 8.11695 9.71215 8.12167 9.70681 8.12508C9.40949 8.30704 9.10086 8.46086 8.77673 8.58967C8.77173 8.59169 8.76719 8.59478 8.7634 8.59876C8.75962 8.60274 8.75668 8.60751 8.75476 8.61276C8.75285 8.61801 8.75202 8.62362 8.75231 8.62923C8.7526 8.63484 8.75402 8.64033 8.75647 8.64533C8.93522 9.00925 9.13958 9.35504 9.36421 9.68332C9.36869 9.69023 9.37514 9.69547 9.38264 9.69828C9.39013 9.70109 9.39829 9.70132 9.40592 9.69895C10.4779 9.35455 11.4861 8.82059 12.3868 8.12008C12.3912 8.11672 12.3949 8.11241 12.3975 8.10745C12.4002 8.10249 12.4018 8.09699 12.4023 8.09131C12.6508 5.39378 11.9858 3.05079 10.6405 0.972932C10.6371 0.96635 10.631 0.961249 10.6244 0.95855ZM4.51955 6.67001C3.93266 6.67001 3.44885 6.10412 3.44885 5.40941C3.44885 4.71533 3.92313 4.14944 4.51955 4.14944C5.12133 4.14944 5.60038 4.71971 5.59084 5.40941C5.59084 6.10412 5.11657 6.67001 4.51955 6.67001ZM8.47941 6.67001C7.89192 6.67001 7.40871 6.10412 7.40871 5.40941C7.40871 4.71533 7.88299 4.14944 8.47941 4.14944C9.0806 4.14944 9.55964 4.71971 9.55011 5.40941C9.55011 6.10412 9.0806 6.67001 8.47941 6.67001Z" fill="white" />
                                        </svg>
                                    </div> */}
                                    <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                                        <FaXTwitter />
                                    </Icon>
                                    <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                                        <FaTelegramPlane />
                                    </Icon>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    null
                }
                {!isMobile && <div class="cursor"></div>}

                {/* first section */}
                {/* <div className="newgradient-background" style={{ opacity: opac }}>


                    <div className="lg:block hidden ">
                        <Header pathname={pathname} />
                    </div>
                    <div className="lg:hidden block ">

                        <div className="flex items-start">
                            <a href="/" className="ml-[8%] relative z-50 resp-head-logo hidden lg:flex">
                                <img src="/Images/nexus.png" className="mt-6 w-full h-full"></img>
                            </a>
                            <a href="/" className="ml-[14%] py-3 relative z-50 res-about-mob-head  max-w-[71px] flex lg:hidden">
                                <img src="/Images/nexus.png" className="ml-4 w-full h-full"></img>
                            </a>

                            <div className="lg:flex hidden h-[60px] relative z-50  bg-black justify-between text-white nav-resp-margin ml-[5vw] mt-6 rounded-[28px] ">
                                <div className={`${pathname === '/leaderboard' ? 'px-6 transition-all duration-300 ease-in-out bg-[#0075FF] hover:bg-[#0075FF] flex justify-center items-center rounded-[36px]' : 'px-6 transition-all duration-300 ease-in-out hover:bg-[#0075FF] flex justify-center items-center rounded-[36px]'}`}>
                                    <p className="font-semibold text-base">Leaderboard</p>
                                </div>
                                <div className={`${pathname === '/airdrop' ? 'px-6 transition-all duration-300 ease-in-out bg-[#0075FF] hover:bg-[#0075FF] flex justify-center items-center rounded-[36px]' : 'px-6 transition-all duration-300 ease-in-out hover:bg-[#0075FF] flex justify-center items-center rounded-[36px]'}`}>
                                    <p className="font-semibold text-base">Airdrop</p>
                                </div>
                                <div className={`${pathname === '/about' ? 'px-6 transition-all duration-300 ease-in-out bg-[#0075FF] hover:bg-[#0075FF] flex justify-center items-center rounded-[36px]' : 'px-6 transition-all duration-300 ease-in-out hover:bg-[#0075FF] flex justify-center items-center rounded-[36px]'}`}>
                                    <p className="font-semibold text-base">About</p>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => { setIsActive(true) }} className="lg:hidden res-about-mob-modal-btn z-50 flex right-7 top-8 justify-end absolute">
                            <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.914551" y="0.243652" width="30.39" height="30.3931" rx="15.195" fill="#0075FF" />
                                <path d="M10.8301 10.3413H21.3301" stroke="white" stroke-width="2" stroke-linecap="round" />
                                <path d="M10.8301 14.9194H16.0801" stroke="white" stroke-width="2" stroke-linecap="round" />
                                <path d="M10.8301 19.7046H21.3301" stroke="white" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </div>




                    </div>

                    <div className="lg:flex w-full pt-20 px-4 lg:pt-0 lg:px-0 lg:pb-20 relative" >
                        <div className="lg:w-1/2 text-center lg:text-left lg:pl-32  w-full">
                            <p className="grad-text nexus-hero-head text-white text-[50px] leading-[3rem] font-bold lg:text-7xl">
                                Nexus is the L2 that helps you earn
                            </p>


                            <div className="mt-20 lg:block hidden">
                                <div>
                                    <p className="font-medium text-base text-white opacity-70">Powered by</p>
                                </div>

                                <div className="flex res-gap gap-10 mt-4 res-powerby-mb">
                                    <div>
                                        <svg width="187" height="42" viewBox="0 0 187 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1330_2923)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M59.8896 2.94541C59.8896 1.55602 61.0282 0.429688 62.4329 0.429688H66.8635C67.8632 0.429688 68.8321 0.772386 69.6051 1.39945L70.9529 2.49273L70.9866 2.52314C71.0177 2.51276 71.0488 2.50262 71.08 2.49273C73.5116 1.72234 76.4618 1.57583 79.4729 1.57583C82.484 1.57583 85.4342 1.72234 87.8658 2.49273C87.897 2.50262 87.9281 2.51276 87.9592 2.52314L87.993 2.49273L89.3407 1.39945C90.1137 0.772386 91.0826 0.429688 92.0823 0.429688H96.5129C97.9176 0.429688 99.0562 1.55602 99.0562 2.94541V4.50059C99.0562 5.70384 98.5438 6.85143 97.6446 7.66183L96.5574 8.64182C96.0266 9.12024 95.3895 9.46842 94.6974 9.65824L94.4402 9.7288C95.4477 12.1067 96.0043 14.6485 96.0043 16.7047C96.0043 24.9761 90.8304 28.5484 86.2716 31.696C82.6815 34.1748 79.4729 36.3901 79.4729 40.4297C79.4729 36.3901 76.2643 34.1748 72.6742 31.696C68.1154 28.5484 62.9415 24.9761 62.9415 16.7047C62.9415 14.6485 63.4981 12.1067 64.5056 9.7288L64.2484 9.65824C63.5564 9.46842 62.9193 9.12024 62.3885 8.64182L61.3012 7.66183C60.402 6.85143 59.8896 5.70384 59.8896 4.50059V2.94541ZM82.7793 23.4669C82.7793 23.8621 82.605 24.241 82.295 24.5205C81.985 24.7999 81.5645 24.9569 81.126 24.9569C80.7475 24.9569 80.3823 24.8398 80.0901 24.628C80.5875 25.945 81.8604 27.1929 83.7965 25.1861C85.5057 23.3214 83.7205 19.3885 81.9813 17.0547C81.4016 16.2768 80.4499 15.9024 79.4729 15.9024C78.4959 15.9024 77.5442 16.2768 76.9645 17.0547C75.2253 19.3885 73.4401 23.3214 75.1493 25.1861C77.0854 27.1929 78.3584 25.945 78.8558 24.628C78.5636 24.8398 78.1983 24.9569 77.8198 24.9569C77.3813 24.9569 76.9608 24.7999 76.6508 24.5205C76.3408 24.241 76.1666 23.8621 76.1666 23.4669H82.7793ZM73.1423 11.8248H68.5368L72.1664 14.6995C72.9651 15.332 74.1324 15.1298 74.6266 14.2733C75.2506 13.1919 74.4219 11.8248 73.1423 11.8248ZM85.8036 11.8248H90.409L86.7795 14.6995C85.9808 15.332 84.8134 15.1298 84.3192 14.2733C83.6952 13.1919 84.524 11.8248 85.8036 11.8248Z" fill="#83BCFE" />
                                                <path d="M104.542 28.7635H108.622V13.3735H104.542V28.7635ZM104.542 10.9735H108.622V7.31348H104.542V10.9735Z" fill="white" />
                                                <path d="M111.251 33.8031H115.331V27.0231H115.391C116.261 28.3431 117.671 29.2131 119.831 29.2131C123.791 29.2131 126.491 26.0631 126.491 21.0831C126.491 16.2831 123.881 12.9531 119.801 12.9531C117.701 12.9531 116.261 13.9431 115.271 15.2931H115.181V13.3731H111.251V33.8031ZM118.961 25.8231C116.531 25.8231 115.241 23.9931 115.241 21.2031C115.241 18.4431 116.261 16.2531 118.811 16.2531C121.331 16.2531 122.351 18.2931 122.351 21.2031C122.351 24.1131 121.031 25.8231 118.961 25.8231Z" fill="white" />
                                                <path d="M134.631 29.2131C138.471 29.2131 141.111 27.3531 141.111 24.2631C141.111 20.6631 138.261 19.9431 135.681 19.4031C133.491 18.9531 131.451 18.8331 131.451 17.5131C131.451 16.4031 132.501 15.8031 134.091 15.8031C135.831 15.8031 136.881 16.4031 137.061 18.0531H140.751C140.451 14.9631 138.201 12.9531 134.151 12.9531C130.641 12.9531 127.881 14.5431 127.881 17.8731C127.881 21.2331 130.581 21.9831 133.341 22.5231C135.441 22.9431 137.391 23.0931 137.391 24.5631C137.391 25.6431 136.371 26.3331 134.571 26.3331C132.741 26.3331 131.481 25.5531 131.211 23.7831H127.431C127.671 27.0531 130.161 29.2131 134.631 29.2131Z" fill="white" />
                                                <path d="M156.602 28.763V13.373H152.522V22.253C152.522 24.293 151.352 25.733 149.432 25.733C147.692 25.733 146.882 24.743 146.882 22.943V13.373H142.832V23.633C142.832 26.993 144.752 29.183 148.172 29.183C150.332 29.183 151.532 28.373 152.582 26.963H152.672V28.763H156.602Z" fill="white" />
                                                <path d="M159.24 28.7631H163.32V19.8231C163.32 17.7831 164.43 16.4631 166.08 16.4631C167.58 16.4631 168.45 17.3631 168.45 19.1031V28.7631H172.53V19.8231C172.53 17.7831 173.58 16.4631 175.29 16.4631C176.79 16.4631 177.66 17.3631 177.66 19.1031V28.7631H181.74V18.4131C181.74 15.0531 179.91 12.9531 176.67 12.9531C174.72 12.9531 173.1 13.9731 172.05 15.6531H171.99C171.24 14.0331 169.68 12.9531 167.73 12.9531C165.6 12.9531 164.1 14.0331 163.26 15.4431H163.17V13.3731H159.24V28.7631Z" fill="white" />
                                                <path d="M1.53662 28.7635H5.61662V7.31348H1.53662V28.7635Z" fill="white" />
                                                <path d="M15.5928 29.2131C20.3628 29.2131 23.6328 25.6731 23.6328 21.0831C23.6328 16.4931 20.3628 12.9531 15.5928 12.9531C10.8227 12.9531 7.55273 16.4931 7.55273 21.0831C7.55273 25.6731 10.8227 29.2131 15.5928 29.2131ZM15.5928 26.0931C13.0728 26.0931 11.6928 24.0831 11.6928 21.0831C11.6928 18.0831 13.0728 16.0431 15.5928 16.0431C18.0828 16.0431 19.4928 18.0831 19.4928 21.0831C19.4928 24.0831 18.0828 26.0931 15.5928 26.0931Z" fill="white" />
                                                <path d="M32.3093 34.0131C34.5893 34.0131 36.5693 33.4731 37.8593 32.2731C38.9993 31.2231 39.6893 29.7531 39.6893 27.5931V13.3731H35.7593V14.9931H35.6993C34.7693 13.7031 33.3593 12.9531 31.4393 12.9531C27.5393 12.9531 24.7793 15.8931 24.7793 20.4831C24.7793 25.1331 28.1393 27.8331 31.5593 27.8331C33.5093 27.8331 34.6793 27.0531 35.5793 26.0331H35.6693V27.7131C35.6693 29.8131 34.5593 30.9231 32.2493 30.9231C30.3593 30.9231 29.4893 30.1731 29.1593 29.2131H25.1093C25.5293 32.2131 28.1093 34.0131 32.3093 34.0131ZM32.2493 24.5631C30.1493 24.5631 28.7693 23.0331 28.7693 20.4231C28.7693 17.8431 30.1493 16.2231 32.2193 16.2231C34.6793 16.2231 35.8793 18.1431 35.8793 20.3931C35.8793 22.6731 34.8293 24.5631 32.2493 24.5631Z" fill="white" />
                                                <path d="M49.6064 29.2131C54.3764 29.2131 57.6464 25.6731 57.6464 21.0831C57.6464 16.4931 54.3764 12.9531 49.6064 12.9531C44.8364 12.9531 41.5664 16.4931 41.5664 21.0831C41.5664 25.6731 44.8364 29.2131 49.6064 29.2131ZM49.6064 26.0931C47.0864 26.0931 45.7064 24.0831 45.7064 21.0831C45.7064 18.0831 47.0864 16.0431 49.6064 16.0431C52.0964 16.0431 53.5064 18.0831 53.5064 21.0831C53.5064 24.0831 52.0964 26.0931 49.6064 26.0931Z" fill="white" />
                                                <path d="M181.557 10.0127C181.557 9.32234 182.116 8.7627 182.807 8.7627H185.307C185.997 8.7627 186.557 9.32234 186.557 10.0127C186.557 10.703 185.997 11.2627 185.307 11.2627H182.807C182.116 11.2627 181.557 10.703 181.557 10.0127Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1330_2923">
                                                    <rect width="186" height="41" fill="white" transform="translate(0.852539 0.216797)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>

                                    <div>
                                        <svg width="187" height="41" viewBox="0 0 187 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1330_2917)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.87 4.60509L22.507 0.0380859L29.983 4.35509L27.347 8.92109C26.884 9.72209 27.577 10.6961 28.485 10.5211L33.537 9.54609L35.172 18.0231L30.12 18.9971C21.948 20.5731 15.709 11.8131 19.87 4.60509Z" fill="#B0D5FF" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.302 35.4714L12.665 40.0384L5.188 35.7224L7.825 31.1554C8.288 30.3544 7.595 29.3804 6.686 29.5554L1.635 30.5294L0 22.0534L5.052 21.0794C13.224 19.5034 19.462 28.2634 15.302 35.4714Z" fill="#2C8EFF" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.53 4.60509L12.894 0.0380859L5.41698 4.35509L8.05398 8.92109C8.51598 9.72209 7.82398 10.6961 6.91498 10.5211L1.86298 9.54609L0.22998 18.0231L5.28098 18.9971C13.454 20.5731 19.693 11.8131 15.531 4.60509H15.53Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.65 35.4714L22.285 40.0384L29.762 35.7224L27.125 31.1554C26.663 30.3544 27.355 29.3804 28.264 29.5554L33.315 30.5294L34.95 22.0534L29.898 21.0794C21.726 19.5034 15.488 28.2634 19.648 35.4714H19.65Z" fill="#64ACFF" />
                                                <path d="M163.114 30.1911V21.6911C163.114 20.5131 163.385 19.4561 163.927 18.5211C164.488 17.5671 165.283 16.8191 166.312 16.2761C167.341 15.7341 168.566 15.4631 169.987 15.4631C170.65 15.4566 171.311 15.5414 171.951 15.7151C172.55 15.8651 173.092 16.0801 173.578 16.3601C174.083 16.6221 174.513 16.9401 174.869 17.3141H174.925C175.306 16.9347 175.741 16.6133 176.215 16.3601C176.736 16.0733 177.293 15.8564 177.871 15.7151C178.521 15.5427 179.191 15.4579 179.863 15.4631C181.284 15.4631 182.509 15.7331 183.538 16.2761C184.566 16.8191 185.361 17.5661 185.922 18.5211C186.484 19.4561 186.764 20.5121 186.764 21.6911V30.1911H182.387V21.8311C182.387 21.3641 182.266 20.9431 182.023 20.5691C181.8 20.1779 181.481 19.8497 181.097 19.6151C180.692 19.3684 180.224 19.2419 179.75 19.2501C179.245 19.2501 178.787 19.3721 178.376 19.6151C177.991 19.8494 177.673 20.1777 177.45 20.5691C177.223 20.9505 177.106 21.3874 177.113 21.8311V30.1911H172.765V21.8311C172.765 21.3641 172.643 20.9431 172.4 20.5691C172.172 20.1722 171.843 19.843 171.446 19.6151C171.041 19.3684 170.573 19.2419 170.099 19.2501C169.594 19.2501 169.136 19.3721 168.725 19.6151C168.34 19.8494 168.022 20.1777 167.799 20.5691C167.573 20.9507 167.456 21.3874 167.462 21.8311V30.1911H163.114ZM153.603 30.5281C152.126 30.5281 150.844 30.2481 149.76 29.6861C148.694 29.1061 147.871 28.3301 147.291 27.3581C146.711 26.3671 146.421 25.2721 146.421 24.0751V15.7991H150.77V23.9631C150.77 24.4681 150.891 24.9361 151.134 25.3661C151.377 25.7771 151.705 26.1141 152.116 26.3761C152.546 26.6191 153.033 26.7411 153.575 26.7411C154.099 26.7411 154.566 26.6191 154.978 26.3761C155.408 26.1141 155.745 25.7771 155.988 25.3661C156.231 24.9361 156.353 24.4681 156.353 23.9631V15.7991H160.701V24.0751C160.701 25.2721 160.42 26.3671 159.859 27.3581C159.298 28.3301 158.485 29.1071 157.419 29.6861C156.371 30.2471 155.099 30.5281 153.603 30.5281ZM132.414 30.1911V26.7411H139.344C139.531 26.7411 139.699 26.7031 139.849 26.6281C139.998 26.5351 140.12 26.4131 140.213 26.2641C140.305 26.1167 140.353 25.9466 140.353 25.7731C140.353 25.5995 140.305 25.4295 140.213 25.2821C140.126 25.1379 139.999 25.0211 139.849 24.9451C139.697 24.8512 139.522 24.8026 139.344 24.8051H136.819C135.883 24.8051 135.032 24.6551 134.266 24.3561C133.538 24.0547 132.914 23.5477 132.47 22.8971C132.04 22.2241 131.825 21.3541 131.825 20.2881C131.825 19.4651 132.021 18.7171 132.414 18.0441C132.823 17.3731 133.391 16.8138 134.069 16.4161C134.776 16.0057 135.58 15.7926 136.398 15.7991H143.327V19.2781H137.071C136.823 19.2731 136.582 19.3637 136.398 19.5311C136.316 19.6112 136.251 19.7073 136.208 19.8134C136.164 19.9195 136.143 20.0334 136.145 20.1481C136.145 20.4101 136.23 20.6341 136.398 20.8211C136.582 20.9885 136.823 21.0791 137.071 21.0741H139.54C140.587 21.0741 141.485 21.2331 142.233 21.5501C143 21.8501 143.589 22.3361 144.001 23.0101C144.431 23.6831 144.646 24.5521 144.646 25.6181C144.646 26.4601 144.431 27.2271 144.001 27.9181C143.593 28.6069 143.013 29.1776 142.317 29.5741C141.625 29.9861 140.84 30.1911 139.961 30.1911H132.414ZM122.94 15.4631C124.156 15.4631 125.231 15.6591 126.166 16.0521C127.084 16.4022 127.91 16.9589 128.579 17.6791C129.261 18.3847 129.787 19.2259 130.122 20.1481C130.477 21.0831 130.655 22.1211 130.655 23.2621C130.655 24.6831 130.356 25.9461 129.757 27.0491C129.204 28.1062 128.369 28.9897 127.345 29.6021C126.316 30.2191 125.119 30.5281 123.754 30.5281C123.174 30.5281 122.622 30.4531 122.098 30.3041C121.602 30.1582 121.129 29.9405 120.696 29.6581C120.287 29.3809 119.935 29.0287 119.658 28.6201H119.573V36.2801H115.225V23.2611C115.225 21.6711 115.543 20.2961 116.179 19.1371C116.796 17.9963 117.731 17.06 118.872 16.4431C120.032 15.7891 121.388 15.4621 122.94 15.4621V15.4631ZM122.94 19.2221C122.267 19.2221 121.678 19.3901 121.173 19.7271C120.686 20.0451 120.312 20.4941 120.05 21.0741C119.789 21.6341 119.658 22.2711 119.658 22.9811C119.658 23.6921 119.789 24.3281 120.05 24.8891C120.312 25.4501 120.686 25.8991 121.173 26.2361C121.678 26.5541 122.267 26.7131 122.94 26.7131C123.613 26.7131 124.193 26.5531 124.679 26.2361C125.168 25.8967 125.556 25.4312 125.802 24.8891C126.082 24.3281 126.222 23.6921 126.222 22.9811C126.222 22.2711 126.082 21.6351 125.802 21.0741C125.54 20.4941 125.166 20.0441 124.679 19.7271C124.193 19.3901 123.613 19.2221 122.94 19.2221ZM108.617 30.1911V15.7991H112.994V30.1911H108.617ZM110.805 14.1721C110.113 14.1721 109.515 13.9201 109.01 13.4151C108.505 12.9101 108.252 12.3111 108.252 11.6191C108.252 10.9271 108.505 10.3291 109.01 9.82409C109.515 9.30009 110.113 9.03809 110.805 9.03809C111.497 9.03809 112.096 9.30009 112.601 9.82409C113.106 10.3291 113.358 10.9271 113.358 11.6191C113.358 12.3111 113.106 12.9091 112.601 13.4151C112.096 13.9201 111.497 14.1721 110.805 14.1721ZM99.105 30.5281C97.628 30.5281 96.3 30.2011 95.121 29.5461C93.9644 28.9121 92.9966 27.9829 92.316 26.8531C91.643 25.7121 91.306 24.4311 91.306 23.0091C91.306 21.5691 91.643 20.2881 92.316 19.1661C92.9966 18.0363 93.9644 17.1071 95.121 16.4731C96.3 15.7991 97.628 15.4631 99.105 15.4631C100.583 15.4631 101.901 15.7991 103.061 16.4731C104.213 17.1027 105.173 18.0335 105.838 19.1661C106.53 20.2881 106.876 21.5691 106.876 23.0091C106.876 24.4311 106.53 25.7121 105.838 26.8531C105.173 27.9857 104.213 28.9165 103.061 29.5461C101.883 30.2011 100.564 30.5281 99.105 30.5281ZM99.105 26.7411C99.797 26.7411 100.396 26.5721 100.901 26.2361C101.406 25.8994 101.813 25.4346 102.079 24.8891C102.36 24.3281 102.5 23.6921 102.5 22.9811C102.5 22.2891 102.36 21.6631 102.079 21.1011C101.813 20.5559 101.406 20.0914 100.901 19.7551C100.396 19.4181 99.797 19.2501 99.105 19.2501C98.413 19.2501 97.805 19.4181 97.282 19.7551C96.7766 20.0917 96.3697 20.5566 96.103 21.1021C95.8172 21.6871 95.6734 22.3311 95.683 22.9821C95.683 23.6921 95.823 24.3281 96.103 24.8891C96.3698 25.4345 96.7767 25.8994 97.282 26.2361C97.805 26.5721 98.413 26.7411 99.105 26.7411ZM77.174 35.8871V32.1551H84.355C84.636 32.1551 84.87 32.0621 85.057 31.8751C85.1482 31.7945 85.2205 31.6949 85.2689 31.5832C85.3173 31.4716 85.3405 31.3507 85.337 31.2291V28.0591H85.253C84.8978 28.4722 84.4927 28.8397 84.047 29.1531C83.635 29.4531 83.167 29.6771 82.644 29.8271C82.0874 29.9835 81.5111 30.0589 80.933 30.0511C79.661 30.0511 78.52 29.7511 77.51 29.1531C76.519 28.5361 75.733 27.6851 75.153 26.6001C74.593 25.5161 74.312 24.2811 74.312 22.8971C74.312 21.5321 74.602 20.2881 75.182 19.1661C75.78 18.0441 76.65 17.1461 77.791 16.4731C78.931 15.7991 80.325 15.4631 81.971 15.4631C83.542 15.4631 84.898 15.7901 86.039 16.4451C87.1848 17.067 88.1215 18.0132 88.732 19.1651C89.368 20.3251 89.686 21.6911 89.686 23.2621V31.6781C89.686 32.9681 89.303 33.9881 88.536 34.7361C87.788 35.5031 86.75 35.8861 85.422 35.8861L77.174 35.8871ZM81.999 26.4041C82.672 26.4041 83.252 26.2541 83.739 25.9551C84.2195 25.6431 84.6068 25.2071 84.86 24.6931C85.126 24.1521 85.2606 23.5559 85.253 22.9531C85.253 22.2801 85.123 21.6631 84.861 21.1021C84.599 20.5411 84.225 20.1011 83.738 19.7831C83.252 19.4461 82.672 19.2781 81.998 19.2781C81.344 19.2781 80.764 19.4371 80.259 19.7551C79.773 20.0731 79.399 20.5031 79.137 21.0451C78.876 21.5881 78.745 22.1951 78.745 22.8691C78.745 23.5241 78.875 24.1221 79.137 24.6651C79.399 25.1881 79.773 25.6091 80.26 25.9271C80.764 26.2451 81.344 26.4041 81.999 26.4041ZM65.473 30.5281C63.996 30.5281 62.668 30.2011 61.49 29.5461C60.333 28.9123 59.3648 27.9831 58.684 26.8531C58.011 25.7121 57.674 24.4311 57.674 23.0091C57.674 21.5691 58.011 20.2881 58.684 19.1661C59.3648 18.0361 60.333 17.1069 61.49 16.4731C62.668 15.7991 63.996 15.4631 65.473 15.4631C66.951 15.4631 68.269 15.7991 69.429 16.4731C70.5814 17.1028 71.5412 18.0335 72.206 19.1661C72.898 20.2881 73.244 21.5691 73.244 23.0091C73.244 24.4311 72.898 25.7121 72.206 26.8531C71.5412 27.9856 70.5814 28.9164 69.429 29.5461C68.251 30.2011 66.932 30.5281 65.473 30.5281ZM65.473 26.7411C66.165 26.7411 66.763 26.5721 67.269 26.2361C67.7739 25.8992 68.1804 25.4344 68.447 24.8891C68.727 24.3281 68.867 23.6921 68.867 22.9811C68.867 22.2891 68.727 21.6631 68.447 21.1011C68.1803 20.5561 67.7738 20.0916 67.269 19.7551C66.764 19.4181 66.165 19.2501 65.473 19.2501C64.781 19.2501 64.173 19.4181 63.65 19.7551C63.1446 20.0917 62.7377 20.5566 62.471 21.1021C62.1853 21.6871 62.0414 22.3311 62.051 22.9821C62.051 23.6921 62.191 24.3281 62.471 24.8891C62.7378 25.4345 63.1447 25.8994 63.65 26.2361C64.173 26.5721 64.781 26.7411 65.473 26.7411ZM51.547 30.1911C50.331 30.1911 49.265 29.9211 48.349 29.3781C47.4581 28.8615 46.7219 28.1156 46.217 27.2181C45.712 26.3201 45.459 25.3281 45.459 24.2441V10.5531H50.172V24.5801C50.172 25.0301 50.332 25.4221 50.649 25.7591C50.967 26.0951 51.359 26.2641 51.827 26.2641H57.017V30.1911H51.547Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1330_2917">
                                                    <rect width="187" height="40" fill="white" transform="translate(0 0.0380859)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="lg:w-1/2 px-6 lg:px-10 res-about-top-right text-center lg:text-left mt-6 lg:mt-0 w-full ">
                            <p className="font-semibold text-base  lg:text-2xl text-white opacity-80">We provide straight forward tools that maximize financial opportunities.
                                forward tools</p>


                            <div className=" mt-6 justify-center lg:justify-start lg:mt-20 flex gap-4 lg:gap-6">
                                <div className="flex model-nav overflow-hidden group hover:bg-black transition-all duration-500 relative z-50 ease-in-out bg-white lg:pl-7 pl-6 rounded-[36px] p-1 lg:p-[7px] items-center gap-4 lg:gap-6">
                                    <p className="font-semibold group-hover:text-white text-black poppins text-sm lg:text-base">Get Started</p>

                                    <div className="flex relative overflow-hidden group-hover:bg-white transition-all duration-500 ease-in-out items-center justify-center rounded-[50%] bg-[#0075FF] h-[36px] w-[36px]">
                                        <div className="-translate-x-8 absolute transition-all duration-500 ease-in-out group-hover:translate-x-0 ">
                                            <svg className="hover-white" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.1497 8.11336C14.5403 7.72283 14.5403 7.08967 14.1497 6.69914L7.78577 0.335183C7.39525 -0.0553417 6.76208 -0.0553416 6.37156 0.335183C5.98103 0.725707 5.98103 1.35887 6.37156 1.7494L12.0284 7.40625L6.37156 13.0631C5.98104 13.4536 5.98104 14.0868 6.37156 14.4773C6.76208 14.8678 7.39525 14.8678 7.78577 14.4773L14.1497 8.11336ZM1.50221 6.40625C0.949928 6.40625 0.502213 6.85397 0.502213 7.40625C0.502214 7.95854 0.949928 8.40625 1.50221 8.40625L1.50221 6.40625ZM13.4426 6.40625L1.50221 6.40625L1.50221 8.40625L13.4426 8.40625L13.4426 6.40625Z" fill="black" />
                                            </svg>
                                        </div>

                                        <div className="translate-x-0 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 ">
                                            <svg className="hover-white" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.1497 8.11336C14.5403 7.72283 14.5403 7.08967 14.1497 6.69914L7.78577 0.335183C7.39525 -0.0553417 6.76208 -0.0553416 6.37156 0.335183C5.98103 0.725707 5.98103 1.35887 6.37156 1.7494L12.0284 7.40625L6.37156 13.0631C5.98104 13.4536 5.98104 14.0868 6.37156 14.4773C6.76208 14.8678 7.39525 14.8678 7.78577 14.4773L14.1497 8.11336ZM1.50221 6.40625C0.949928 6.40625 0.502213 6.85397 0.502213 7.40625C0.502214 7.95854 0.949928 8.40625 1.50221 8.40625L1.50221 6.40625ZM13.4426 6.40625L1.50221 6.40625L1.50221 8.40625L13.4426 8.40625L13.4426 6.40625Z" fill="white" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="border hover:bg-black hover:border-black transition-all duration-500 relative z-50 ease-in-out  rounded-[36px] px-6 lg:px-10 flex justify-center items-center  border-white">
                                    <p className=" font-semibold text-sm lg:text-base poppins text-white">Read Docs</p>
                                </div>

                            </div>

                            <div className=" lg:hidden block">
                                <div className="flex w-full mt-14 justify-center items-center">
                                    <p className="font-semibold text-sm text-white opacity-70">Powered by</p>
                                </div>

                                <div className="flex justify-center mt-6 w-full gap-6">
                                    <div>
                                        <svg width="123" height="28" viewBox="0 0 123 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1336_4274)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M39.428 2.05116C39.428 1.13839 40.176 0.398438 41.0988 0.398438H44.0095C44.6663 0.398438 45.3028 0.623576 45.8106 1.03553L46.6961 1.75377L46.7182 1.77374C46.7387 1.76692 46.7591 1.76026 46.7796 1.75377C48.377 1.24765 50.3152 1.1514 52.2934 1.1514C54.2715 1.1514 56.2097 1.24765 57.8071 1.75377C57.8276 1.76026 57.848 1.76692 57.8685 1.77374L57.8906 1.75377L58.7761 1.03553C59.2839 0.623576 59.9204 0.398438 60.5772 0.398438H63.4879C64.4107 0.398438 65.1587 1.13839 65.1587 2.05116V3.07284C65.1587 3.86333 64.8221 4.61724 64.2314 5.14964L63.5171 5.79345C63.1684 6.10775 62.7498 6.33649 62.2952 6.46119L62.1262 6.50755C62.7881 8.06974 63.1538 9.7396 63.1538 11.0904C63.1538 16.5244 59.7547 18.8712 56.7598 20.9391C54.4013 22.5675 52.2934 24.0229 52.2934 26.6767C52.2934 24.0229 50.1854 22.5675 47.8269 20.9391C44.832 18.8712 41.4329 16.5244 41.4329 11.0904C41.4329 9.7396 41.7986 8.06974 42.4605 6.50755L42.2915 6.46119C41.8369 6.33649 41.4184 6.10775 41.0696 5.79345L40.3553 5.14964C39.7646 4.61724 39.428 3.86333 39.428 3.07284V2.05116ZM54.4655 15.5329C54.4655 15.7925 54.351 16.0415 54.1473 16.2251C53.9437 16.4086 53.6674 16.5118 53.3794 16.5118C53.1307 16.5118 52.8908 16.4348 52.6988 16.2957C53.0256 17.1609 53.8618 17.9807 55.1338 16.6623C56.2566 15.4373 55.0838 12.8536 53.9413 11.3204C53.5604 10.8093 52.9352 10.5634 52.2934 10.5634C51.6515 10.5634 51.0263 10.8093 50.6454 11.3204C49.5029 12.8536 48.3301 15.4373 49.4529 16.6623C50.7249 17.9807 51.5611 17.1609 51.8879 16.2957C51.6959 16.4348 51.456 16.5118 51.2073 16.5118C50.9193 16.5118 50.643 16.4086 50.4394 16.2251C50.2357 16.0415 50.1213 15.7925 50.1213 15.5329H54.4655ZM48.1344 7.88455H45.1088L47.4932 9.7731C48.0179 10.1886 48.7849 10.0558 49.1095 9.49311C49.5195 8.78267 48.975 7.88455 48.1344 7.88455ZM56.4524 7.88455H59.4779L57.0935 9.7731C56.5688 10.1886 55.8018 10.0558 55.4772 9.49311C55.0672 8.78267 55.6117 7.88455 56.4524 7.88455Z" fill="#83BCFE" />
                                                <path d="M68.7629 19.0126H71.4433V8.90206H68.7629V19.0126ZM68.7629 7.32537H71.4433V4.9209H68.7629V7.32537Z" fill="white" />
                                                <path d="M73.1704 22.3235H75.8508V17.8694H75.8902C76.4618 18.7365 77.3881 19.3081 78.8071 19.3081C81.4086 19.3081 83.1824 17.2387 83.1824 13.967C83.1824 10.8136 81.4678 8.62598 78.7874 8.62598C77.4078 8.62598 76.4618 9.27636 75.8114 10.1633H75.7522V8.9019H73.1704V22.3235ZM78.2355 17.081C76.6391 17.081 75.7917 15.8788 75.7917 14.0459C75.7917 12.2327 76.4618 10.7939 78.137 10.7939C79.7925 10.7939 80.4626 12.1341 80.4626 14.0459C80.4626 15.9576 79.5954 17.081 78.2355 17.081Z" fill="white" />
                                                <path d="M88.5294 19.3081C91.0521 19.3081 92.7865 18.0861 92.7865 16.0562C92.7865 13.6911 90.9142 13.2181 89.2192 12.8633C87.7805 12.5677 86.4403 12.4889 86.4403 11.6217C86.4403 10.8925 87.1301 10.4983 88.1746 10.4983C89.3178 10.4983 90.0075 10.8925 90.1258 11.9765H92.55C92.3529 9.94646 90.8747 8.62598 88.2141 8.62598C85.9081 8.62598 84.0949 9.67054 84.0949 11.8582C84.0949 14.0656 85.8687 14.5583 87.6819 14.913C89.0615 15.189 90.3426 15.2875 90.3426 16.2532C90.3426 16.9628 89.6725 17.4161 88.49 17.4161C87.2878 17.4161 86.46 16.9036 86.2826 15.7408H83.7993C83.957 17.8891 85.5928 19.3081 88.5294 19.3081Z" fill="white" />
                                                <path d="M102.963 19.0129V8.90234H100.283V14.7361C100.283 16.0763 99.5143 17.0223 98.2529 17.0223C97.1098 17.0223 96.5777 16.3719 96.5777 15.1894V8.90234H93.917V15.6427C93.917 17.8501 95.1783 19.2888 97.4251 19.2888C98.8442 19.2888 99.6325 18.7567 100.322 17.8304H100.381V19.0129H102.963Z" fill="white" />
                                                <path d="M104.697 19.0125H107.377V13.1393C107.377 11.7991 108.107 10.9319 109.191 10.9319C110.176 10.9319 110.748 11.5232 110.748 12.6663V19.0125H113.428V13.1393C113.428 11.7991 114.118 10.9319 115.241 10.9319C116.227 10.9319 116.798 11.5232 116.798 12.6663V19.0125H119.479V12.213C119.479 10.0056 118.276 8.62598 116.148 8.62598C114.867 8.62598 113.802 9.29607 113.113 10.3998H113.073C112.58 9.33549 111.556 8.62598 110.275 8.62598C108.875 8.62598 107.89 9.33549 107.338 10.2618H107.279V8.9019H104.697V19.0125Z" fill="white" />
                                                <path d="M1.09253 19.0126H3.77291V4.9209H1.09253V19.0126Z" fill="white" />
                                                <path d="M10.3269 19.3081C13.4606 19.3081 15.6088 16.9825 15.6088 13.967C15.6088 10.9516 13.4606 8.62598 10.3269 8.62598C7.19317 8.62598 5.04492 10.9516 5.04492 13.967C5.04492 16.9825 7.19317 19.3081 10.3269 19.3081ZM10.3269 17.2584C8.67136 17.2584 7.76475 15.9379 7.76475 13.967C7.76475 11.9962 8.67136 10.656 10.3269 10.656C11.9627 10.656 12.889 11.9962 12.889 13.967C12.889 15.9379 11.9627 17.2584 10.3269 17.2584Z" fill="white" />
                                                <path d="M21.3087 22.4615C22.8066 22.4615 24.1073 22.1067 24.9548 21.3184C25.7037 20.6286 26.157 19.6628 26.157 18.2438V8.9019H23.5752V9.96617H23.5358C22.9248 9.11869 21.9985 8.62598 20.7371 8.62598C18.175 8.62598 16.3618 10.5574 16.3618 13.5729C16.3618 16.6277 18.5692 18.4015 20.816 18.4015C22.097 18.4015 22.8657 17.8891 23.4569 17.219H23.5161V18.3227C23.5161 19.7023 22.7869 20.4315 21.2693 20.4315C20.0276 20.4315 19.4561 19.9388 19.2393 19.3081H16.5786C16.8545 21.279 18.5495 22.4615 21.3087 22.4615ZM21.2693 16.2532C19.8897 16.2532 18.9831 15.2481 18.9831 13.5334C18.9831 11.8385 19.8897 10.7742 21.2496 10.7742C22.8657 10.7742 23.654 12.0356 23.654 13.5137C23.654 15.0116 22.9642 16.2532 21.2693 16.2532Z" fill="white" />
                                                <path d="M32.6723 19.3081C35.806 19.3081 37.9542 16.9825 37.9542 13.967C37.9542 10.9516 35.806 8.62598 32.6723 8.62598C29.5386 8.62598 27.3904 10.9516 27.3904 13.967C27.3904 16.9825 29.5386 19.3081 32.6723 19.3081ZM32.6723 17.2584C31.0168 17.2584 30.1102 15.9379 30.1102 13.967C30.1102 11.9962 31.0168 10.656 32.6723 10.656C34.3081 10.656 35.2344 11.9962 35.2344 13.967C35.2344 15.9379 34.3081 17.2584 32.6723 17.2584Z" fill="white" />
                                                <path d="M119.358 6.69424C119.358 6.24071 119.725 5.87305 120.179 5.87305H121.821C122.275 5.87305 122.643 6.24071 122.643 6.69424C122.643 7.14775 122.275 7.51544 121.821 7.51544H120.179C119.725 7.51544 119.358 7.14775 119.358 6.69424Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1336_4274">
                                                    <rect width="122.194" height="26.9352" fill="white" transform="translate(0.643066 0.258789)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </div>

                                    <div>
                                        <svg width="139" height="28" viewBox="0 0 139 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1336_4286)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2443 3.8703L17.189 0.871094L22.7024 3.70612L20.7584 6.70467C20.417 7.2307 20.9281 7.87033 21.5977 7.75541L25.3235 7.11511L26.5293 12.6821L22.8035 13.3217C16.7768 14.3567 12.1756 8.60388 15.2443 3.8703Z" fill="#B0D5FF" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8753 24.1409L9.93057 27.1401L4.4164 24.3057L6.36115 21.3065C6.7026 20.7805 6.19153 20.1408 5.52115 20.2557L1.79612 20.8954L0.590332 15.3291L4.3161 14.6894C10.3428 13.6545 14.9433 19.4073 11.8753 24.1409Z" fill="#2C8EFF" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0435 3.8703L10.0995 0.871094L4.58534 3.70612L6.53009 6.70467C6.8708 7.2307 6.36047 7.87033 5.69009 7.75541L1.96432 7.11511L0.76001 12.6821L4.48504 13.3217C10.5125 14.3567 15.1137 8.60388 12.0443 3.8703H12.0435Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0819 24.1409L17.0251 27.1401L22.5393 24.3057L20.5946 21.3065C20.2538 20.7805 20.7642 20.1408 21.4346 20.2557L25.1596 20.8954L26.3654 15.3291L22.6396 14.6894C16.6129 13.6545 12.0125 19.4073 15.0804 24.1409H15.0819Z" fill="#64ACFF" />
                                                <path d="M120.884 20.6727V15.0906C120.884 14.317 121.084 13.6229 121.484 13.0089C121.898 12.3823 122.484 11.8911 123.243 11.5345C124.002 11.1786 124.905 11.0006 125.953 11.0006C126.442 10.9964 126.93 11.0521 127.402 11.1661C127.843 11.2646 128.243 11.4058 128.601 11.5897C128.974 11.7618 129.291 11.9706 129.554 12.2162H129.595C129.876 11.9671 130.196 11.756 130.546 11.5897C130.931 11.4013 131.341 11.2589 131.768 11.1661C132.247 11.0529 132.741 10.9972 133.237 11.0006C134.285 11.0006 135.188 11.1779 135.947 11.5345C136.705 11.8911 137.291 12.3817 137.705 13.0089C138.119 13.6229 138.326 14.3164 138.326 15.0906V20.6727H135.098V15.1826C135.098 14.8759 135.009 14.5994 134.83 14.3538C134.665 14.0969 134.43 13.8814 134.147 13.7273C133.848 13.5653 133.503 13.4822 133.153 13.4876C132.781 13.4876 132.443 13.5677 132.14 13.7273C131.856 13.8812 131.621 14.0968 131.457 14.3538C131.29 14.6043 131.204 14.8912 131.208 15.1826V20.6727H128.002V15.1826C128.002 14.8759 127.912 14.5994 127.733 14.3538C127.565 14.0932 127.322 13.877 127.029 13.7273C126.73 13.5653 126.386 13.4822 126.036 13.4876C125.663 13.4876 125.326 13.5677 125.022 13.7273C124.739 13.8812 124.504 14.0968 124.34 14.3538C124.173 14.6044 124.087 14.8912 124.091 15.1826V20.6727H120.884ZM113.87 20.894C112.781 20.894 111.836 20.7101 111.036 20.341C110.25 19.9602 109.643 19.4505 109.215 18.8122C108.787 18.1614 108.574 17.4423 108.574 16.6562V11.2213H111.781V16.5827C111.781 16.9143 111.87 17.2217 112.049 17.504C112.229 17.774 112.47 17.9953 112.774 18.1673C113.091 18.3269 113.45 18.407 113.85 18.407C114.236 18.407 114.58 18.3269 114.884 18.1673C115.201 17.9953 115.45 17.774 115.629 17.504C115.808 17.2217 115.898 16.9143 115.898 16.5827V11.2213H119.105V16.6562C119.105 17.4423 118.898 18.1614 118.484 18.8122C118.07 19.4505 117.471 19.9608 116.684 20.341C115.912 20.7095 114.974 20.894 113.87 20.894ZM98.2437 20.6727V18.407H103.354C103.492 18.407 103.616 18.3821 103.727 18.3328C103.837 18.2717 103.927 18.1916 103.995 18.0938C104.063 17.997 104.099 17.8853 104.099 17.7713C104.099 17.6574 104.063 17.5457 103.995 17.4489C103.931 17.3542 103.838 17.2775 103.727 17.2276C103.615 17.1659 103.486 17.134 103.354 17.1356H101.492C100.802 17.1356 100.174 17.0371 99.6095 16.8408C99.0728 16.6428 98.6125 16.3099 98.285 15.8826C97.9679 15.4407 97.8093 14.8693 97.8093 14.1693C97.8093 13.6288 97.9538 13.1376 98.2437 12.6956C98.5452 12.255 98.9645 11.8877 99.4642 11.6265C99.9857 11.357 100.579 11.217 101.182 11.2213H106.292V13.506H101.678C101.495 13.5027 101.317 13.5622 101.182 13.6721C101.121 13.7248 101.074 13.7879 101.041 13.8576C101.009 13.9272 100.994 14.002 100.995 14.0773C100.995 14.2494 101.058 14.3965 101.182 14.5193C101.317 14.6292 101.495 14.6887 101.678 14.6854H103.499C104.271 14.6854 104.933 14.7899 105.485 14.998C106.051 15.195 106.485 15.5142 106.789 15.9568C107.106 16.3988 107.265 16.9695 107.265 17.6695C107.265 18.2225 107.106 18.7262 106.789 19.18C106.488 19.6323 106.06 20.0071 105.547 20.2675C105.037 20.5381 104.458 20.6727 103.809 20.6727H98.2437ZM91.2568 11.0006C92.1535 11.0006 92.9463 11.1293 93.6359 11.3874C94.3132 11.6174 94.9221 11.983 95.4154 12.4559C95.9183 12.9193 96.306 13.4717 96.5534 14.0773C96.8152 14.6914 96.9464 15.373 96.9464 16.1223C96.9464 17.0555 96.7259 17.8849 96.2842 18.6093C95.8762 19.3035 95.2605 19.8837 94.5054 20.2859C93.7465 20.6911 92.8637 20.894 91.8571 20.894C91.4293 20.894 91.0222 20.8447 90.6358 20.7469C90.2698 20.6511 89.9215 20.5081 89.6018 20.3227C89.3005 20.1406 89.0407 19.9093 88.8363 19.641H88.7736V24.6714H85.5671V16.1217C85.5671 15.0775 85.8016 14.1745 86.2706 13.4134C86.7253 12.6642 87.4155 12.0494 88.2567 11.6442C89.1121 11.2147 90.1122 11 91.2568 11V11.0006ZM91.2568 13.4692C90.7604 13.4692 90.326 13.5795 89.9536 13.8008C89.5945 14.0097 89.3186 14.3045 89.1254 14.6854C88.9329 15.0532 88.8363 15.4715 88.8363 15.9378C88.8363 16.4047 88.9329 16.8224 89.1254 17.1908C89.3186 17.5592 89.5945 17.8541 89.9536 18.0754C90.326 18.2842 90.7604 18.3886 91.2568 18.3886C91.7531 18.3886 92.1808 18.2836 92.5392 18.0754C92.8999 17.8525 93.1861 17.5468 93.3674 17.1908C93.5739 16.8224 93.6772 16.4047 93.6772 15.9378C93.6772 15.4715 93.5739 15.0539 93.3674 14.6854C93.1742 14.3045 92.8984 14.009 92.5392 13.8008C92.1808 13.5795 91.7531 13.4692 91.2568 13.4692ZM80.6938 20.6727V11.2213H83.9217V20.6727H80.6938ZM82.3074 10.1528C81.797 10.1528 81.356 9.98732 80.9836 9.65568C80.6112 9.32404 80.4246 8.93067 80.4246 8.47622C80.4246 8.02178 80.6112 7.62907 80.9836 7.29743C81.356 6.95331 81.797 6.78125 82.3074 6.78125C82.8177 6.78125 83.2595 6.95331 83.6319 7.29743C84.0043 7.62907 84.1902 8.02178 84.1902 8.47622C84.1902 8.93067 84.0043 9.32338 83.6319 9.65568C83.2595 9.98732 82.8177 10.1528 82.3074 10.1528ZM73.6788 20.894C72.5896 20.894 71.6102 20.6793 70.7407 20.2491C69.8877 19.8328 69.1739 19.2225 68.672 18.4806C68.1757 17.7313 67.9272 16.89 67.9272 15.9562C67.9272 15.0105 68.1757 14.1693 68.672 13.4324C69.1739 12.6905 69.8877 12.0803 70.7407 11.6639C71.6102 11.2213 72.5896 11.0006 73.6788 11.0006C74.7688 11.0006 75.7408 11.2213 76.5963 11.6639C77.4462 12.0774 78.1541 12.6886 78.6443 13.4324C79.1546 14.1693 79.4098 15.0105 79.4098 15.9562C79.4098 16.89 79.1546 17.7313 78.6443 18.4806C78.1541 19.2244 77.4462 19.8356 76.5963 20.2491C75.7275 20.6793 74.7548 20.894 73.6788 20.894ZM73.6788 18.407C74.1892 18.407 74.6309 18.296 75.0033 18.0754C75.3759 17.8543 75.6757 17.549 75.8721 17.1908C76.0793 16.8224 76.1826 16.4047 76.1826 15.9378C76.1826 15.4833 76.0793 15.0722 75.8721 14.7032C75.6756 14.3452 75.3758 14.0401 75.0033 13.8192C74.6309 13.5979 74.1892 13.4876 73.6788 13.4876C73.1685 13.4876 72.7201 13.5979 72.3344 13.8192C71.9617 14.0403 71.6616 14.3456 71.4649 14.7038C71.2542 15.088 71.148 15.511 71.1551 15.9384C71.1551 16.4047 71.2584 16.8224 71.4649 17.1908C71.6617 17.549 71.9617 17.8543 72.3344 18.0754C72.7201 18.296 73.1685 18.407 73.6788 18.407ZM57.505 24.4133V21.9625H62.8009C63.0082 21.9625 63.1807 21.9014 63.3186 21.7786C63.3859 21.7257 63.4392 21.6602 63.4749 21.5869C63.5106 21.5136 63.5277 21.4342 63.5251 21.3544V19.2726H63.4632C63.2012 19.5439 62.9025 19.7852 62.5738 19.991C62.2699 20.188 61.9248 20.3351 61.5391 20.4336C61.1286 20.5364 60.7036 20.5859 60.2772 20.5807C59.3392 20.5807 58.4977 20.3837 57.7528 19.991C57.022 19.5858 56.4423 19.027 56.0146 18.3144C55.6016 17.6026 55.3944 16.7915 55.3944 15.8826C55.3944 14.9862 55.6082 14.1693 56.036 13.4324C56.477 12.6956 57.1186 12.1059 57.9601 11.6639C58.8008 11.2213 59.8289 11.0006 61.0428 11.0006C62.2013 11.0006 63.2014 11.2154 64.0428 11.6455C64.8878 12.0539 65.5787 12.6753 66.0289 13.4318C66.4979 14.1936 66.7324 15.0906 66.7324 16.1223V21.6492C66.7324 22.4964 66.45 23.1662 65.8843 23.6574C65.3327 24.1611 64.5672 24.4127 63.5878 24.4127L57.505 24.4133ZM61.0634 18.1857C61.5597 18.1857 61.9875 18.0872 62.3466 17.8909C62.701 17.686 62.9866 17.3996 63.1733 17.0621C63.3695 16.7068 63.4688 16.3153 63.4632 15.9194C63.4632 15.4774 63.3673 15.0722 63.1741 14.7038C62.9809 14.3354 62.705 14.0465 62.3459 13.8376C61.9875 13.6163 61.5597 13.506 61.0627 13.506C60.5804 13.506 60.1526 13.6104 59.7802 13.8192C59.4218 14.0281 59.1459 14.3105 58.9527 14.6664C58.7602 15.023 58.6636 15.4216 58.6636 15.8642C58.6636 16.2944 58.7595 16.6871 58.9527 17.0437C59.1459 17.3872 59.4218 17.6636 59.7809 17.8725C60.1526 18.0813 60.5804 18.1857 61.0634 18.1857ZM48.8757 20.894C47.7865 20.894 46.8071 20.6793 45.9383 20.2491C45.0851 19.8329 44.371 19.2227 43.869 18.4806C43.3726 17.7313 43.1241 16.89 43.1241 15.9562C43.1241 15.0105 43.3726 14.1693 43.869 13.4324C44.371 12.6904 45.0851 12.0801 45.9383 11.6639C46.8071 11.2213 47.7865 11.0006 48.8757 11.0006C49.9657 11.0006 50.9377 11.2213 51.7932 11.6639C52.6431 12.0774 53.351 12.6887 53.8412 13.4324C54.3516 14.1693 54.6067 15.0105 54.6067 15.9562C54.6067 16.89 54.3516 17.7313 53.8412 18.4806C53.351 19.2243 52.6431 19.8356 51.7932 20.2491C50.9245 20.6793 49.9517 20.894 48.8757 20.894ZM48.8757 18.407C49.3861 18.407 49.8271 18.296 50.2003 18.0754C50.5726 17.8542 50.8724 17.5489 51.069 17.1908C51.2755 16.8224 51.3788 16.4047 51.3788 15.9378C51.3788 15.4833 51.2755 15.0722 51.069 14.7032C50.8723 14.3453 50.5726 14.0403 50.2003 13.8192C49.8278 13.5979 49.3861 13.4876 48.8757 13.4876C48.3654 13.4876 47.917 13.5979 47.5313 13.8192C47.1586 14.0403 46.8585 14.3456 46.6618 14.7038C46.4511 15.088 46.345 15.511 46.3521 15.9384C46.3521 16.4047 46.4553 16.8224 46.6618 17.1908C46.8586 17.549 47.1586 17.8543 47.5313 18.0754C47.917 18.296 48.3654 18.407 48.8757 18.407ZM38.6055 20.6727C37.7087 20.6727 36.9226 20.4954 36.2471 20.1388C35.59 19.7995 35.0471 19.3097 34.6747 18.7203C34.3023 18.1306 34.1157 17.4791 34.1157 16.7672V7.77617H37.5915V16.9879C37.5915 17.2834 37.7095 17.5408 37.9433 17.7621C38.1778 17.9828 38.4669 18.0938 38.812 18.0938H42.6396V20.6727H38.6055Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1336_4286">
                                                    <rect width="137.91" height="26.2685" fill="white" transform="translate(0.590332 0.871094)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="desk-footer h-full w-full absolute  ">

                            <NewHeaderWrapper>
                                <NewBgWrapp>
                                    <NewBackground>
                                        <img className="h-full w-full absolute" src={"/Images/Bottom.png"} />
                                        <div className="w-full h-full flex absolute z-50 justify-between ">
                                            <div className="h-full items-end pt-24 resp-social-padding-about pl-32 ">
                                                <div className="flex">
                                                    <p className="text-white lg:ml-4 res-follow text-xs lg:text-base font-medium whitespace-nowrap opacity-60">Follow on  socials</p>
                                                    <div className="flex items-center ml-6 gap-6">
                                                       
                                                        <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                                                            <FaXTwitter />
                                                        </Icon>
                                                        <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                                                            <FaTelegramPlane />
                                                        </Icon>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="h-full pb-6 justify-end pr-16 flex items-end w-1/2 ">
                                                <div className="flex group  transition-all duration-500 relative z-50 ease-in-out justify-between items-center gap-10 font-semibold text-base text-white">
                                                    <p className="whitespace-nowrap">Connect with us</p>
                                                    <div>
                                                        <div className="bg-white h-[30px] w-[30px] rounded-[50%] overflow-hidden flex justify-center items-center">
                                                            <div className="-translate-x-8 absolute transition-all duration-500 ease-in-out group-hover:translate-x-0 ">
                                                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.0169 7.50143C12.3489 7.16949 12.3489 6.6313 12.0169 6.29935L6.60757 0.889983C6.27562 0.558038 5.73743 0.558038 5.40549 0.889983C5.07354 1.22193 5.07354 1.76012 5.40549 2.09206L10.2138 6.90039L5.40549 11.7087C5.07354 12.0407 5.07354 12.5789 5.40549 12.9108C5.73743 13.2427 6.27562 13.2427 6.60757 12.9108L12.0169 7.50143ZM1.44426 6.05039C0.974821 6.05039 0.594263 6.43095 0.594263 6.90039C0.594263 7.36983 0.974821 7.75039 1.44426 7.75039L1.44426 6.05039ZM11.4159 6.05039L1.44426 6.05039L1.44426 7.75039L11.4159 7.75039L11.4159 6.05039Z" fill="black" />
                                                                </svg>
                                                            </div>
                                                            <div className="translate-x-0 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 ">
                                                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.0169 7.50143C12.3489 7.16949 12.3489 6.6313 12.0169 6.29935L6.60757 0.889983C6.27562 0.558038 5.73743 0.558038 5.40549 0.889983C5.07354 1.22193 5.07354 1.76012 5.40549 2.09206L10.2138 6.90039L5.40549 11.7087C5.07354 12.0407 5.07354 12.5789 5.40549 12.9108C5.73743 13.2427 6.27562 13.2427 6.60757 12.9108L12.0169 7.50143ZM1.44426 6.05039C0.974821 6.05039 0.594263 6.43095 0.594263 6.90039C0.594263 7.36983 0.974821 7.75039 1.44426 7.75039L1.44426 6.05039ZM11.4159 6.05039L1.44426 6.05039L1.44426 7.75039L11.4159 7.75039L11.4159 6.05039Z" fill="black" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </NewBackground>
                                </NewBgWrapp>
                            </NewHeaderWrapper>

                        </div>
                    </div>
                    <div className="relative w-full md-footer justify-end md:flex hidden lg:hidden">
                        <div className="w-[65%] responsive-width-bottom-about right-0 mt-2">
                            <img src="/Images/Bottom.png"></img>
                        </div>
                        <HeaderWrapper style={{ position: "absolute", right: "0", bottom: "1.5rem" }}>
                            <BgWrapp>
                                <Background>
                                    <IconWrapper style={{ width: "80%", paddingLeft: "10px" }}>
                                        <div className="flex justify-start gap-6 w-full">
                                            <p className="text-white res-mob-footer-ml lg:ml-4 text-xs lg:text-base font-medium opacity-60">Follow on our socials</p>
                                        
                                            <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                                                <FaXTwitter />
                                            </Icon>
                                            <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                                                <FaTelegramPlane />
                                            </Icon>
                                        </div>
                                    </IconWrapper>
                                </Background>
                            </BgWrapp>
                        </HeaderWrapper>
                    </div>
                    <div className="md:hidden sm-footer block">
                        <HeaderWrapper>
                            <BgWrapp>
                                <Background>
                                    
                                    <IconWrapper style={{ width: "80%" }}>
                                        <div className="flex start gap-4 w-full">
                                            <p className="text-white res-mob-footer-ml lg:ml-4 text-xs lg:text-base font-medium opacity-60">Follow on our socials</p>
                                            <div className="flex res-mob-footer-social-gap gap-6">
                                             
                                                <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                                                    <FaXTwitter />
                                                </Icon>
                                                <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                                                    <FaTelegramPlane />
                                                </Icon>
                                            </div>
                                        </div>
                                    </IconWrapper>
                                </Background>
                            </BgWrapp>
                        </HeaderWrapper>
                    </div>

                </div> */}

                <div className="newgradient-background" style={{ opacity: opac }}>

                    <div className="flex justify-between">
                        <Header pathname={pathname} />

                        <div onClick={() => { setIsActive(true) }} className="lg:hidden z-50 flex right-7 top-4 justify-end absolute">
                            <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.914551" y="0.243652" width="30.39" height="30.3931" rx="15.195" fill="#0075FF" />
                                <path d="M10.8301 10.3413H21.3301" stroke="white" stroke-width="2" stroke-linecap="round" />
                                <path d="M10.8301 14.9194H16.0801" stroke="white" stroke-width="2" stroke-linecap="round" />
                                <path d="M10.8301 19.7046H21.3301" stroke="white" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </div>



                    </div>

                    <div className="lg:flex w-full  px-4 lg:pt-0 lg:px-0 lg:pb-20 relative" >
                        <div className="lg:w-1/2 text-center lg:text-left res-about-hero-left lg:pl-32  w-full">
                            <p className="grad-text nexus-hero-head text-white text-[50px] leading-[3rem] font-bold lg:text-7xl">
                                Nexus is the L2 that helps you earn
                            </p>


                            <div className="mt-20 lg:block hidden">
                                <div>
                                    <p className="font-medium text-base text-white opacity-70">Powered by</p>
                                </div>

                                <div className="flex res-gap gap-10 mt-4 res-powerby-mb">
                                    <div>
                                        <svg width="187" height="42" viewBox="0 0 187 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1330_2923)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M59.8896 2.94541C59.8896 1.55602 61.0282 0.429688 62.4329 0.429688H66.8635C67.8632 0.429688 68.8321 0.772386 69.6051 1.39945L70.9529 2.49273L70.9866 2.52314C71.0177 2.51276 71.0488 2.50262 71.08 2.49273C73.5116 1.72234 76.4618 1.57583 79.4729 1.57583C82.484 1.57583 85.4342 1.72234 87.8658 2.49273C87.897 2.50262 87.9281 2.51276 87.9592 2.52314L87.993 2.49273L89.3407 1.39945C90.1137 0.772386 91.0826 0.429688 92.0823 0.429688H96.5129C97.9176 0.429688 99.0562 1.55602 99.0562 2.94541V4.50059C99.0562 5.70384 98.5438 6.85143 97.6446 7.66183L96.5574 8.64182C96.0266 9.12024 95.3895 9.46842 94.6974 9.65824L94.4402 9.7288C95.4477 12.1067 96.0043 14.6485 96.0043 16.7047C96.0043 24.9761 90.8304 28.5484 86.2716 31.696C82.6815 34.1748 79.4729 36.3901 79.4729 40.4297C79.4729 36.3901 76.2643 34.1748 72.6742 31.696C68.1154 28.5484 62.9415 24.9761 62.9415 16.7047C62.9415 14.6485 63.4981 12.1067 64.5056 9.7288L64.2484 9.65824C63.5564 9.46842 62.9193 9.12024 62.3885 8.64182L61.3012 7.66183C60.402 6.85143 59.8896 5.70384 59.8896 4.50059V2.94541ZM82.7793 23.4669C82.7793 23.8621 82.605 24.241 82.295 24.5205C81.985 24.7999 81.5645 24.9569 81.126 24.9569C80.7475 24.9569 80.3823 24.8398 80.0901 24.628C80.5875 25.945 81.8604 27.1929 83.7965 25.1861C85.5057 23.3214 83.7205 19.3885 81.9813 17.0547C81.4016 16.2768 80.4499 15.9024 79.4729 15.9024C78.4959 15.9024 77.5442 16.2768 76.9645 17.0547C75.2253 19.3885 73.4401 23.3214 75.1493 25.1861C77.0854 27.1929 78.3584 25.945 78.8558 24.628C78.5636 24.8398 78.1983 24.9569 77.8198 24.9569C77.3813 24.9569 76.9608 24.7999 76.6508 24.5205C76.3408 24.241 76.1666 23.8621 76.1666 23.4669H82.7793ZM73.1423 11.8248H68.5368L72.1664 14.6995C72.9651 15.332 74.1324 15.1298 74.6266 14.2733C75.2506 13.1919 74.4219 11.8248 73.1423 11.8248ZM85.8036 11.8248H90.409L86.7795 14.6995C85.9808 15.332 84.8134 15.1298 84.3192 14.2733C83.6952 13.1919 84.524 11.8248 85.8036 11.8248Z" fill="#83BCFE" />
                                                <path d="M104.542 28.7635H108.622V13.3735H104.542V28.7635ZM104.542 10.9735H108.622V7.31348H104.542V10.9735Z" fill="white" />
                                                <path d="M111.251 33.8031H115.331V27.0231H115.391C116.261 28.3431 117.671 29.2131 119.831 29.2131C123.791 29.2131 126.491 26.0631 126.491 21.0831C126.491 16.2831 123.881 12.9531 119.801 12.9531C117.701 12.9531 116.261 13.9431 115.271 15.2931H115.181V13.3731H111.251V33.8031ZM118.961 25.8231C116.531 25.8231 115.241 23.9931 115.241 21.2031C115.241 18.4431 116.261 16.2531 118.811 16.2531C121.331 16.2531 122.351 18.2931 122.351 21.2031C122.351 24.1131 121.031 25.8231 118.961 25.8231Z" fill="white" />
                                                <path d="M134.631 29.2131C138.471 29.2131 141.111 27.3531 141.111 24.2631C141.111 20.6631 138.261 19.9431 135.681 19.4031C133.491 18.9531 131.451 18.8331 131.451 17.5131C131.451 16.4031 132.501 15.8031 134.091 15.8031C135.831 15.8031 136.881 16.4031 137.061 18.0531H140.751C140.451 14.9631 138.201 12.9531 134.151 12.9531C130.641 12.9531 127.881 14.5431 127.881 17.8731C127.881 21.2331 130.581 21.9831 133.341 22.5231C135.441 22.9431 137.391 23.0931 137.391 24.5631C137.391 25.6431 136.371 26.3331 134.571 26.3331C132.741 26.3331 131.481 25.5531 131.211 23.7831H127.431C127.671 27.0531 130.161 29.2131 134.631 29.2131Z" fill="white" />
                                                <path d="M156.602 28.763V13.373H152.522V22.253C152.522 24.293 151.352 25.733 149.432 25.733C147.692 25.733 146.882 24.743 146.882 22.943V13.373H142.832V23.633C142.832 26.993 144.752 29.183 148.172 29.183C150.332 29.183 151.532 28.373 152.582 26.963H152.672V28.763H156.602Z" fill="white" />
                                                <path d="M159.24 28.7631H163.32V19.8231C163.32 17.7831 164.43 16.4631 166.08 16.4631C167.58 16.4631 168.45 17.3631 168.45 19.1031V28.7631H172.53V19.8231C172.53 17.7831 173.58 16.4631 175.29 16.4631C176.79 16.4631 177.66 17.3631 177.66 19.1031V28.7631H181.74V18.4131C181.74 15.0531 179.91 12.9531 176.67 12.9531C174.72 12.9531 173.1 13.9731 172.05 15.6531H171.99C171.24 14.0331 169.68 12.9531 167.73 12.9531C165.6 12.9531 164.1 14.0331 163.26 15.4431H163.17V13.3731H159.24V28.7631Z" fill="white" />
                                                <path d="M1.53662 28.7635H5.61662V7.31348H1.53662V28.7635Z" fill="white" />
                                                <path d="M15.5928 29.2131C20.3628 29.2131 23.6328 25.6731 23.6328 21.0831C23.6328 16.4931 20.3628 12.9531 15.5928 12.9531C10.8227 12.9531 7.55273 16.4931 7.55273 21.0831C7.55273 25.6731 10.8227 29.2131 15.5928 29.2131ZM15.5928 26.0931C13.0728 26.0931 11.6928 24.0831 11.6928 21.0831C11.6928 18.0831 13.0728 16.0431 15.5928 16.0431C18.0828 16.0431 19.4928 18.0831 19.4928 21.0831C19.4928 24.0831 18.0828 26.0931 15.5928 26.0931Z" fill="white" />
                                                <path d="M32.3093 34.0131C34.5893 34.0131 36.5693 33.4731 37.8593 32.2731C38.9993 31.2231 39.6893 29.7531 39.6893 27.5931V13.3731H35.7593V14.9931H35.6993C34.7693 13.7031 33.3593 12.9531 31.4393 12.9531C27.5393 12.9531 24.7793 15.8931 24.7793 20.4831C24.7793 25.1331 28.1393 27.8331 31.5593 27.8331C33.5093 27.8331 34.6793 27.0531 35.5793 26.0331H35.6693V27.7131C35.6693 29.8131 34.5593 30.9231 32.2493 30.9231C30.3593 30.9231 29.4893 30.1731 29.1593 29.2131H25.1093C25.5293 32.2131 28.1093 34.0131 32.3093 34.0131ZM32.2493 24.5631C30.1493 24.5631 28.7693 23.0331 28.7693 20.4231C28.7693 17.8431 30.1493 16.2231 32.2193 16.2231C34.6793 16.2231 35.8793 18.1431 35.8793 20.3931C35.8793 22.6731 34.8293 24.5631 32.2493 24.5631Z" fill="white" />
                                                <path d="M49.6064 29.2131C54.3764 29.2131 57.6464 25.6731 57.6464 21.0831C57.6464 16.4931 54.3764 12.9531 49.6064 12.9531C44.8364 12.9531 41.5664 16.4931 41.5664 21.0831C41.5664 25.6731 44.8364 29.2131 49.6064 29.2131ZM49.6064 26.0931C47.0864 26.0931 45.7064 24.0831 45.7064 21.0831C45.7064 18.0831 47.0864 16.0431 49.6064 16.0431C52.0964 16.0431 53.5064 18.0831 53.5064 21.0831C53.5064 24.0831 52.0964 26.0931 49.6064 26.0931Z" fill="white" />
                                                <path d="M181.557 10.0127C181.557 9.32234 182.116 8.7627 182.807 8.7627H185.307C185.997 8.7627 186.557 9.32234 186.557 10.0127C186.557 10.703 185.997 11.2627 185.307 11.2627H182.807C182.116 11.2627 181.557 10.703 181.557 10.0127Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1330_2923">
                                                    <rect width="186" height="41" fill="white" transform="translate(0.852539 0.216797)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>

                                    <div>
                                        <svg width="187" height="41" viewBox="0 0 187 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1330_2917)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.87 4.60509L22.507 0.0380859L29.983 4.35509L27.347 8.92109C26.884 9.72209 27.577 10.6961 28.485 10.5211L33.537 9.54609L35.172 18.0231L30.12 18.9971C21.948 20.5731 15.709 11.8131 19.87 4.60509Z" fill="#B0D5FF" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.302 35.4714L12.665 40.0384L5.188 35.7224L7.825 31.1554C8.288 30.3544 7.595 29.3804 6.686 29.5554L1.635 30.5294L0 22.0534L5.052 21.0794C13.224 19.5034 19.462 28.2634 15.302 35.4714Z" fill="#2C8EFF" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.53 4.60509L12.894 0.0380859L5.41698 4.35509L8.05398 8.92109C8.51598 9.72209 7.82398 10.6961 6.91498 10.5211L1.86298 9.54609L0.22998 18.0231L5.28098 18.9971C13.454 20.5731 19.693 11.8131 15.531 4.60509H15.53Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.65 35.4714L22.285 40.0384L29.762 35.7224L27.125 31.1554C26.663 30.3544 27.355 29.3804 28.264 29.5554L33.315 30.5294L34.95 22.0534L29.898 21.0794C21.726 19.5034 15.488 28.2634 19.648 35.4714H19.65Z" fill="#64ACFF" />
                                                <path d="M163.114 30.1911V21.6911C163.114 20.5131 163.385 19.4561 163.927 18.5211C164.488 17.5671 165.283 16.8191 166.312 16.2761C167.341 15.7341 168.566 15.4631 169.987 15.4631C170.65 15.4566 171.311 15.5414 171.951 15.7151C172.55 15.8651 173.092 16.0801 173.578 16.3601C174.083 16.6221 174.513 16.9401 174.869 17.3141H174.925C175.306 16.9347 175.741 16.6133 176.215 16.3601C176.736 16.0733 177.293 15.8564 177.871 15.7151C178.521 15.5427 179.191 15.4579 179.863 15.4631C181.284 15.4631 182.509 15.7331 183.538 16.2761C184.566 16.8191 185.361 17.5661 185.922 18.5211C186.484 19.4561 186.764 20.5121 186.764 21.6911V30.1911H182.387V21.8311C182.387 21.3641 182.266 20.9431 182.023 20.5691C181.8 20.1779 181.481 19.8497 181.097 19.6151C180.692 19.3684 180.224 19.2419 179.75 19.2501C179.245 19.2501 178.787 19.3721 178.376 19.6151C177.991 19.8494 177.673 20.1777 177.45 20.5691C177.223 20.9505 177.106 21.3874 177.113 21.8311V30.1911H172.765V21.8311C172.765 21.3641 172.643 20.9431 172.4 20.5691C172.172 20.1722 171.843 19.843 171.446 19.6151C171.041 19.3684 170.573 19.2419 170.099 19.2501C169.594 19.2501 169.136 19.3721 168.725 19.6151C168.34 19.8494 168.022 20.1777 167.799 20.5691C167.573 20.9507 167.456 21.3874 167.462 21.8311V30.1911H163.114ZM153.603 30.5281C152.126 30.5281 150.844 30.2481 149.76 29.6861C148.694 29.1061 147.871 28.3301 147.291 27.3581C146.711 26.3671 146.421 25.2721 146.421 24.0751V15.7991H150.77V23.9631C150.77 24.4681 150.891 24.9361 151.134 25.3661C151.377 25.7771 151.705 26.1141 152.116 26.3761C152.546 26.6191 153.033 26.7411 153.575 26.7411C154.099 26.7411 154.566 26.6191 154.978 26.3761C155.408 26.1141 155.745 25.7771 155.988 25.3661C156.231 24.9361 156.353 24.4681 156.353 23.9631V15.7991H160.701V24.0751C160.701 25.2721 160.42 26.3671 159.859 27.3581C159.298 28.3301 158.485 29.1071 157.419 29.6861C156.371 30.2471 155.099 30.5281 153.603 30.5281ZM132.414 30.1911V26.7411H139.344C139.531 26.7411 139.699 26.7031 139.849 26.6281C139.998 26.5351 140.12 26.4131 140.213 26.2641C140.305 26.1167 140.353 25.9466 140.353 25.7731C140.353 25.5995 140.305 25.4295 140.213 25.2821C140.126 25.1379 139.999 25.0211 139.849 24.9451C139.697 24.8512 139.522 24.8026 139.344 24.8051H136.819C135.883 24.8051 135.032 24.6551 134.266 24.3561C133.538 24.0547 132.914 23.5477 132.47 22.8971C132.04 22.2241 131.825 21.3541 131.825 20.2881C131.825 19.4651 132.021 18.7171 132.414 18.0441C132.823 17.3731 133.391 16.8138 134.069 16.4161C134.776 16.0057 135.58 15.7926 136.398 15.7991H143.327V19.2781H137.071C136.823 19.2731 136.582 19.3637 136.398 19.5311C136.316 19.6112 136.251 19.7073 136.208 19.8134C136.164 19.9195 136.143 20.0334 136.145 20.1481C136.145 20.4101 136.23 20.6341 136.398 20.8211C136.582 20.9885 136.823 21.0791 137.071 21.0741H139.54C140.587 21.0741 141.485 21.2331 142.233 21.5501C143 21.8501 143.589 22.3361 144.001 23.0101C144.431 23.6831 144.646 24.5521 144.646 25.6181C144.646 26.4601 144.431 27.2271 144.001 27.9181C143.593 28.6069 143.013 29.1776 142.317 29.5741C141.625 29.9861 140.84 30.1911 139.961 30.1911H132.414ZM122.94 15.4631C124.156 15.4631 125.231 15.6591 126.166 16.0521C127.084 16.4022 127.91 16.9589 128.579 17.6791C129.261 18.3847 129.787 19.2259 130.122 20.1481C130.477 21.0831 130.655 22.1211 130.655 23.2621C130.655 24.6831 130.356 25.9461 129.757 27.0491C129.204 28.1062 128.369 28.9897 127.345 29.6021C126.316 30.2191 125.119 30.5281 123.754 30.5281C123.174 30.5281 122.622 30.4531 122.098 30.3041C121.602 30.1582 121.129 29.9405 120.696 29.6581C120.287 29.3809 119.935 29.0287 119.658 28.6201H119.573V36.2801H115.225V23.2611C115.225 21.6711 115.543 20.2961 116.179 19.1371C116.796 17.9963 117.731 17.06 118.872 16.4431C120.032 15.7891 121.388 15.4621 122.94 15.4621V15.4631ZM122.94 19.2221C122.267 19.2221 121.678 19.3901 121.173 19.7271C120.686 20.0451 120.312 20.4941 120.05 21.0741C119.789 21.6341 119.658 22.2711 119.658 22.9811C119.658 23.6921 119.789 24.3281 120.05 24.8891C120.312 25.4501 120.686 25.8991 121.173 26.2361C121.678 26.5541 122.267 26.7131 122.94 26.7131C123.613 26.7131 124.193 26.5531 124.679 26.2361C125.168 25.8967 125.556 25.4312 125.802 24.8891C126.082 24.3281 126.222 23.6921 126.222 22.9811C126.222 22.2711 126.082 21.6351 125.802 21.0741C125.54 20.4941 125.166 20.0441 124.679 19.7271C124.193 19.3901 123.613 19.2221 122.94 19.2221ZM108.617 30.1911V15.7991H112.994V30.1911H108.617ZM110.805 14.1721C110.113 14.1721 109.515 13.9201 109.01 13.4151C108.505 12.9101 108.252 12.3111 108.252 11.6191C108.252 10.9271 108.505 10.3291 109.01 9.82409C109.515 9.30009 110.113 9.03809 110.805 9.03809C111.497 9.03809 112.096 9.30009 112.601 9.82409C113.106 10.3291 113.358 10.9271 113.358 11.6191C113.358 12.3111 113.106 12.9091 112.601 13.4151C112.096 13.9201 111.497 14.1721 110.805 14.1721ZM99.105 30.5281C97.628 30.5281 96.3 30.2011 95.121 29.5461C93.9644 28.9121 92.9966 27.9829 92.316 26.8531C91.643 25.7121 91.306 24.4311 91.306 23.0091C91.306 21.5691 91.643 20.2881 92.316 19.1661C92.9966 18.0363 93.9644 17.1071 95.121 16.4731C96.3 15.7991 97.628 15.4631 99.105 15.4631C100.583 15.4631 101.901 15.7991 103.061 16.4731C104.213 17.1027 105.173 18.0335 105.838 19.1661C106.53 20.2881 106.876 21.5691 106.876 23.0091C106.876 24.4311 106.53 25.7121 105.838 26.8531C105.173 27.9857 104.213 28.9165 103.061 29.5461C101.883 30.2011 100.564 30.5281 99.105 30.5281ZM99.105 26.7411C99.797 26.7411 100.396 26.5721 100.901 26.2361C101.406 25.8994 101.813 25.4346 102.079 24.8891C102.36 24.3281 102.5 23.6921 102.5 22.9811C102.5 22.2891 102.36 21.6631 102.079 21.1011C101.813 20.5559 101.406 20.0914 100.901 19.7551C100.396 19.4181 99.797 19.2501 99.105 19.2501C98.413 19.2501 97.805 19.4181 97.282 19.7551C96.7766 20.0917 96.3697 20.5566 96.103 21.1021C95.8172 21.6871 95.6734 22.3311 95.683 22.9821C95.683 23.6921 95.823 24.3281 96.103 24.8891C96.3698 25.4345 96.7767 25.8994 97.282 26.2361C97.805 26.5721 98.413 26.7411 99.105 26.7411ZM77.174 35.8871V32.1551H84.355C84.636 32.1551 84.87 32.0621 85.057 31.8751C85.1482 31.7945 85.2205 31.6949 85.2689 31.5832C85.3173 31.4716 85.3405 31.3507 85.337 31.2291V28.0591H85.253C84.8978 28.4722 84.4927 28.8397 84.047 29.1531C83.635 29.4531 83.167 29.6771 82.644 29.8271C82.0874 29.9835 81.5111 30.0589 80.933 30.0511C79.661 30.0511 78.52 29.7511 77.51 29.1531C76.519 28.5361 75.733 27.6851 75.153 26.6001C74.593 25.5161 74.312 24.2811 74.312 22.8971C74.312 21.5321 74.602 20.2881 75.182 19.1661C75.78 18.0441 76.65 17.1461 77.791 16.4731C78.931 15.7991 80.325 15.4631 81.971 15.4631C83.542 15.4631 84.898 15.7901 86.039 16.4451C87.1848 17.067 88.1215 18.0132 88.732 19.1651C89.368 20.3251 89.686 21.6911 89.686 23.2621V31.6781C89.686 32.9681 89.303 33.9881 88.536 34.7361C87.788 35.5031 86.75 35.8861 85.422 35.8861L77.174 35.8871ZM81.999 26.4041C82.672 26.4041 83.252 26.2541 83.739 25.9551C84.2195 25.6431 84.6068 25.2071 84.86 24.6931C85.126 24.1521 85.2606 23.5559 85.253 22.9531C85.253 22.2801 85.123 21.6631 84.861 21.1021C84.599 20.5411 84.225 20.1011 83.738 19.7831C83.252 19.4461 82.672 19.2781 81.998 19.2781C81.344 19.2781 80.764 19.4371 80.259 19.7551C79.773 20.0731 79.399 20.5031 79.137 21.0451C78.876 21.5881 78.745 22.1951 78.745 22.8691C78.745 23.5241 78.875 24.1221 79.137 24.6651C79.399 25.1881 79.773 25.6091 80.26 25.9271C80.764 26.2451 81.344 26.4041 81.999 26.4041ZM65.473 30.5281C63.996 30.5281 62.668 30.2011 61.49 29.5461C60.333 28.9123 59.3648 27.9831 58.684 26.8531C58.011 25.7121 57.674 24.4311 57.674 23.0091C57.674 21.5691 58.011 20.2881 58.684 19.1661C59.3648 18.0361 60.333 17.1069 61.49 16.4731C62.668 15.7991 63.996 15.4631 65.473 15.4631C66.951 15.4631 68.269 15.7991 69.429 16.4731C70.5814 17.1028 71.5412 18.0335 72.206 19.1661C72.898 20.2881 73.244 21.5691 73.244 23.0091C73.244 24.4311 72.898 25.7121 72.206 26.8531C71.5412 27.9856 70.5814 28.9164 69.429 29.5461C68.251 30.2011 66.932 30.5281 65.473 30.5281ZM65.473 26.7411C66.165 26.7411 66.763 26.5721 67.269 26.2361C67.7739 25.8992 68.1804 25.4344 68.447 24.8891C68.727 24.3281 68.867 23.6921 68.867 22.9811C68.867 22.2891 68.727 21.6631 68.447 21.1011C68.1803 20.5561 67.7738 20.0916 67.269 19.7551C66.764 19.4181 66.165 19.2501 65.473 19.2501C64.781 19.2501 64.173 19.4181 63.65 19.7551C63.1446 20.0917 62.7377 20.5566 62.471 21.1021C62.1853 21.6871 62.0414 22.3311 62.051 22.9821C62.051 23.6921 62.191 24.3281 62.471 24.8891C62.7378 25.4345 63.1447 25.8994 63.65 26.2361C64.173 26.5721 64.781 26.7411 65.473 26.7411ZM51.547 30.1911C50.331 30.1911 49.265 29.9211 48.349 29.3781C47.4581 28.8615 46.7219 28.1156 46.217 27.2181C45.712 26.3201 45.459 25.3281 45.459 24.2441V10.5531H50.172V24.5801C50.172 25.0301 50.332 25.4221 50.649 25.7591C50.967 26.0951 51.359 26.2641 51.827 26.2641H57.017V30.1911H51.547Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1330_2917">
                                                    <rect width="187" height="40" fill="white" transform="translate(0 0.0380859)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="lg:w-1/2 px-6 lg:px-10 res-about-top-right text-center lg:text-left mt-6 lg:mt-0 w-full ">
                            <p className="font-semibold text-base res-about-hero-para lg:text-2xl text-white opacity-80">We provide straight forward tools that maximize financial opportunities.
                                forward tools</p>


                            <div className=" mt-6 justify-center lg:justify-start lg:mt-20 flex gap-4 lg:gap-6">
                                <div className="flex model-nav overflow-hidden group hover:bg-black transition-all duration-500 relative z-50 ease-in-out bg-white lg:pl-7 pl-6 rounded-[36px] p-1 lg:p-[7px] items-center gap-4 lg:gap-6">
                                    <p className="font-semibold group-hover:text-white text-black poppins text-sm lg:text-base">Get Started</p>

                                    <div className="flex relative overflow-hidden group-hover:bg-white transition-all duration-500 ease-in-out items-center justify-center rounded-[50%] bg-[#0075FF] h-[36px] w-[36px]">
                                        <div className="-translate-x-8 absolute transition-all duration-500 ease-in-out group-hover:translate-x-0 ">
                                            <svg className="hover-white" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.1497 8.11336C14.5403 7.72283 14.5403 7.08967 14.1497 6.69914L7.78577 0.335183C7.39525 -0.0553417 6.76208 -0.0553416 6.37156 0.335183C5.98103 0.725707 5.98103 1.35887 6.37156 1.7494L12.0284 7.40625L6.37156 13.0631C5.98104 13.4536 5.98104 14.0868 6.37156 14.4773C6.76208 14.8678 7.39525 14.8678 7.78577 14.4773L14.1497 8.11336ZM1.50221 6.40625C0.949928 6.40625 0.502213 6.85397 0.502213 7.40625C0.502214 7.95854 0.949928 8.40625 1.50221 8.40625L1.50221 6.40625ZM13.4426 6.40625L1.50221 6.40625L1.50221 8.40625L13.4426 8.40625L13.4426 6.40625Z" fill="black" />
                                            </svg>
                                        </div>

                                        <div className="translate-x-0 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 ">
                                            <svg className="hover-white" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.1497 8.11336C14.5403 7.72283 14.5403 7.08967 14.1497 6.69914L7.78577 0.335183C7.39525 -0.0553417 6.76208 -0.0553416 6.37156 0.335183C5.98103 0.725707 5.98103 1.35887 6.37156 1.7494L12.0284 7.40625L6.37156 13.0631C5.98104 13.4536 5.98104 14.0868 6.37156 14.4773C6.76208 14.8678 7.39525 14.8678 7.78577 14.4773L14.1497 8.11336ZM1.50221 6.40625C0.949928 6.40625 0.502213 6.85397 0.502213 7.40625C0.502214 7.95854 0.949928 8.40625 1.50221 8.40625L1.50221 6.40625ZM13.4426 6.40625L1.50221 6.40625L1.50221 8.40625L13.4426 8.40625L13.4426 6.40625Z" fill="white" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="border hover:bg-black hover:border-black transition-all duration-500 relative z-50 ease-in-out  rounded-[36px] px-6 lg:px-10 flex justify-center items-center  border-white">
                                    <p className=" font-semibold text-sm lg:text-base poppins text-white">Read Docs</p>
                                </div>

                            </div>

                            <div className=" lg:hidden block">
                                <div className="flex w-full mt-14 justify-center items-center">
                                    <p className="font-semibold text-sm text-white opacity-70">Powered by</p>
                                </div>

                                <div className="flex justify-center mt-6 w-full gap-6">
                                    <div>
                                        <svg width="123" height="28" viewBox="0 0 123 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1336_4274)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M39.428 2.05116C39.428 1.13839 40.176 0.398438 41.0988 0.398438H44.0095C44.6663 0.398438 45.3028 0.623576 45.8106 1.03553L46.6961 1.75377L46.7182 1.77374C46.7387 1.76692 46.7591 1.76026 46.7796 1.75377C48.377 1.24765 50.3152 1.1514 52.2934 1.1514C54.2715 1.1514 56.2097 1.24765 57.8071 1.75377C57.8276 1.76026 57.848 1.76692 57.8685 1.77374L57.8906 1.75377L58.7761 1.03553C59.2839 0.623576 59.9204 0.398438 60.5772 0.398438H63.4879C64.4107 0.398438 65.1587 1.13839 65.1587 2.05116V3.07284C65.1587 3.86333 64.8221 4.61724 64.2314 5.14964L63.5171 5.79345C63.1684 6.10775 62.7498 6.33649 62.2952 6.46119L62.1262 6.50755C62.7881 8.06974 63.1538 9.7396 63.1538 11.0904C63.1538 16.5244 59.7547 18.8712 56.7598 20.9391C54.4013 22.5675 52.2934 24.0229 52.2934 26.6767C52.2934 24.0229 50.1854 22.5675 47.8269 20.9391C44.832 18.8712 41.4329 16.5244 41.4329 11.0904C41.4329 9.7396 41.7986 8.06974 42.4605 6.50755L42.2915 6.46119C41.8369 6.33649 41.4184 6.10775 41.0696 5.79345L40.3553 5.14964C39.7646 4.61724 39.428 3.86333 39.428 3.07284V2.05116ZM54.4655 15.5329C54.4655 15.7925 54.351 16.0415 54.1473 16.2251C53.9437 16.4086 53.6674 16.5118 53.3794 16.5118C53.1307 16.5118 52.8908 16.4348 52.6988 16.2957C53.0256 17.1609 53.8618 17.9807 55.1338 16.6623C56.2566 15.4373 55.0838 12.8536 53.9413 11.3204C53.5604 10.8093 52.9352 10.5634 52.2934 10.5634C51.6515 10.5634 51.0263 10.8093 50.6454 11.3204C49.5029 12.8536 48.3301 15.4373 49.4529 16.6623C50.7249 17.9807 51.5611 17.1609 51.8879 16.2957C51.6959 16.4348 51.456 16.5118 51.2073 16.5118C50.9193 16.5118 50.643 16.4086 50.4394 16.2251C50.2357 16.0415 50.1213 15.7925 50.1213 15.5329H54.4655ZM48.1344 7.88455H45.1088L47.4932 9.7731C48.0179 10.1886 48.7849 10.0558 49.1095 9.49311C49.5195 8.78267 48.975 7.88455 48.1344 7.88455ZM56.4524 7.88455H59.4779L57.0935 9.7731C56.5688 10.1886 55.8018 10.0558 55.4772 9.49311C55.0672 8.78267 55.6117 7.88455 56.4524 7.88455Z" fill="#83BCFE" />
                                                <path d="M68.7629 19.0126H71.4433V8.90206H68.7629V19.0126ZM68.7629 7.32537H71.4433V4.9209H68.7629V7.32537Z" fill="white" />
                                                <path d="M73.1704 22.3235H75.8508V17.8694H75.8902C76.4618 18.7365 77.3881 19.3081 78.8071 19.3081C81.4086 19.3081 83.1824 17.2387 83.1824 13.967C83.1824 10.8136 81.4678 8.62598 78.7874 8.62598C77.4078 8.62598 76.4618 9.27636 75.8114 10.1633H75.7522V8.9019H73.1704V22.3235ZM78.2355 17.081C76.6391 17.081 75.7917 15.8788 75.7917 14.0459C75.7917 12.2327 76.4618 10.7939 78.137 10.7939C79.7925 10.7939 80.4626 12.1341 80.4626 14.0459C80.4626 15.9576 79.5954 17.081 78.2355 17.081Z" fill="white" />
                                                <path d="M88.5294 19.3081C91.0521 19.3081 92.7865 18.0861 92.7865 16.0562C92.7865 13.6911 90.9142 13.2181 89.2192 12.8633C87.7805 12.5677 86.4403 12.4889 86.4403 11.6217C86.4403 10.8925 87.1301 10.4983 88.1746 10.4983C89.3178 10.4983 90.0075 10.8925 90.1258 11.9765H92.55C92.3529 9.94646 90.8747 8.62598 88.2141 8.62598C85.9081 8.62598 84.0949 9.67054 84.0949 11.8582C84.0949 14.0656 85.8687 14.5583 87.6819 14.913C89.0615 15.189 90.3426 15.2875 90.3426 16.2532C90.3426 16.9628 89.6725 17.4161 88.49 17.4161C87.2878 17.4161 86.46 16.9036 86.2826 15.7408H83.7993C83.957 17.8891 85.5928 19.3081 88.5294 19.3081Z" fill="white" />
                                                <path d="M102.963 19.0129V8.90234H100.283V14.7361C100.283 16.0763 99.5143 17.0223 98.2529 17.0223C97.1098 17.0223 96.5777 16.3719 96.5777 15.1894V8.90234H93.917V15.6427C93.917 17.8501 95.1783 19.2888 97.4251 19.2888C98.8442 19.2888 99.6325 18.7567 100.322 17.8304H100.381V19.0129H102.963Z" fill="white" />
                                                <path d="M104.697 19.0125H107.377V13.1393C107.377 11.7991 108.107 10.9319 109.191 10.9319C110.176 10.9319 110.748 11.5232 110.748 12.6663V19.0125H113.428V13.1393C113.428 11.7991 114.118 10.9319 115.241 10.9319C116.227 10.9319 116.798 11.5232 116.798 12.6663V19.0125H119.479V12.213C119.479 10.0056 118.276 8.62598 116.148 8.62598C114.867 8.62598 113.802 9.29607 113.113 10.3998H113.073C112.58 9.33549 111.556 8.62598 110.275 8.62598C108.875 8.62598 107.89 9.33549 107.338 10.2618H107.279V8.9019H104.697V19.0125Z" fill="white" />
                                                <path d="M1.09253 19.0126H3.77291V4.9209H1.09253V19.0126Z" fill="white" />
                                                <path d="M10.3269 19.3081C13.4606 19.3081 15.6088 16.9825 15.6088 13.967C15.6088 10.9516 13.4606 8.62598 10.3269 8.62598C7.19317 8.62598 5.04492 10.9516 5.04492 13.967C5.04492 16.9825 7.19317 19.3081 10.3269 19.3081ZM10.3269 17.2584C8.67136 17.2584 7.76475 15.9379 7.76475 13.967C7.76475 11.9962 8.67136 10.656 10.3269 10.656C11.9627 10.656 12.889 11.9962 12.889 13.967C12.889 15.9379 11.9627 17.2584 10.3269 17.2584Z" fill="white" />
                                                <path d="M21.3087 22.4615C22.8066 22.4615 24.1073 22.1067 24.9548 21.3184C25.7037 20.6286 26.157 19.6628 26.157 18.2438V8.9019H23.5752V9.96617H23.5358C22.9248 9.11869 21.9985 8.62598 20.7371 8.62598C18.175 8.62598 16.3618 10.5574 16.3618 13.5729C16.3618 16.6277 18.5692 18.4015 20.816 18.4015C22.097 18.4015 22.8657 17.8891 23.4569 17.219H23.5161V18.3227C23.5161 19.7023 22.7869 20.4315 21.2693 20.4315C20.0276 20.4315 19.4561 19.9388 19.2393 19.3081H16.5786C16.8545 21.279 18.5495 22.4615 21.3087 22.4615ZM21.2693 16.2532C19.8897 16.2532 18.9831 15.2481 18.9831 13.5334C18.9831 11.8385 19.8897 10.7742 21.2496 10.7742C22.8657 10.7742 23.654 12.0356 23.654 13.5137C23.654 15.0116 22.9642 16.2532 21.2693 16.2532Z" fill="white" />
                                                <path d="M32.6723 19.3081C35.806 19.3081 37.9542 16.9825 37.9542 13.967C37.9542 10.9516 35.806 8.62598 32.6723 8.62598C29.5386 8.62598 27.3904 10.9516 27.3904 13.967C27.3904 16.9825 29.5386 19.3081 32.6723 19.3081ZM32.6723 17.2584C31.0168 17.2584 30.1102 15.9379 30.1102 13.967C30.1102 11.9962 31.0168 10.656 32.6723 10.656C34.3081 10.656 35.2344 11.9962 35.2344 13.967C35.2344 15.9379 34.3081 17.2584 32.6723 17.2584Z" fill="white" />
                                                <path d="M119.358 6.69424C119.358 6.24071 119.725 5.87305 120.179 5.87305H121.821C122.275 5.87305 122.643 6.24071 122.643 6.69424C122.643 7.14775 122.275 7.51544 121.821 7.51544H120.179C119.725 7.51544 119.358 7.14775 119.358 6.69424Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1336_4274">
                                                    <rect width="122.194" height="26.9352" fill="white" transform="translate(0.643066 0.258789)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </div>

                                    <div>
                                        <svg width="139" height="28" viewBox="0 0 139 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1336_4286)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2443 3.8703L17.189 0.871094L22.7024 3.70612L20.7584 6.70467C20.417 7.2307 20.9281 7.87033 21.5977 7.75541L25.3235 7.11511L26.5293 12.6821L22.8035 13.3217C16.7768 14.3567 12.1756 8.60388 15.2443 3.8703Z" fill="#B0D5FF" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8753 24.1409L9.93057 27.1401L4.4164 24.3057L6.36115 21.3065C6.7026 20.7805 6.19153 20.1408 5.52115 20.2557L1.79612 20.8954L0.590332 15.3291L4.3161 14.6894C10.3428 13.6545 14.9433 19.4073 11.8753 24.1409Z" fill="#2C8EFF" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0435 3.8703L10.0995 0.871094L4.58534 3.70612L6.53009 6.70467C6.8708 7.2307 6.36047 7.87033 5.69009 7.75541L1.96432 7.11511L0.76001 12.6821L4.48504 13.3217C10.5125 14.3567 15.1137 8.60388 12.0443 3.8703H12.0435Z" fill="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0819 24.1409L17.0251 27.1401L22.5393 24.3057L20.5946 21.3065C20.2538 20.7805 20.7642 20.1408 21.4346 20.2557L25.1596 20.8954L26.3654 15.3291L22.6396 14.6894C16.6129 13.6545 12.0125 19.4073 15.0804 24.1409H15.0819Z" fill="#64ACFF" />
                                                <path d="M120.884 20.6727V15.0906C120.884 14.317 121.084 13.6229 121.484 13.0089C121.898 12.3823 122.484 11.8911 123.243 11.5345C124.002 11.1786 124.905 11.0006 125.953 11.0006C126.442 10.9964 126.93 11.0521 127.402 11.1661C127.843 11.2646 128.243 11.4058 128.601 11.5897C128.974 11.7618 129.291 11.9706 129.554 12.2162H129.595C129.876 11.9671 130.196 11.756 130.546 11.5897C130.931 11.4013 131.341 11.2589 131.768 11.1661C132.247 11.0529 132.741 10.9972 133.237 11.0006C134.285 11.0006 135.188 11.1779 135.947 11.5345C136.705 11.8911 137.291 12.3817 137.705 13.0089C138.119 13.6229 138.326 14.3164 138.326 15.0906V20.6727H135.098V15.1826C135.098 14.8759 135.009 14.5994 134.83 14.3538C134.665 14.0969 134.43 13.8814 134.147 13.7273C133.848 13.5653 133.503 13.4822 133.153 13.4876C132.781 13.4876 132.443 13.5677 132.14 13.7273C131.856 13.8812 131.621 14.0968 131.457 14.3538C131.29 14.6043 131.204 14.8912 131.208 15.1826V20.6727H128.002V15.1826C128.002 14.8759 127.912 14.5994 127.733 14.3538C127.565 14.0932 127.322 13.877 127.029 13.7273C126.73 13.5653 126.386 13.4822 126.036 13.4876C125.663 13.4876 125.326 13.5677 125.022 13.7273C124.739 13.8812 124.504 14.0968 124.34 14.3538C124.173 14.6044 124.087 14.8912 124.091 15.1826V20.6727H120.884ZM113.87 20.894C112.781 20.894 111.836 20.7101 111.036 20.341C110.25 19.9602 109.643 19.4505 109.215 18.8122C108.787 18.1614 108.574 17.4423 108.574 16.6562V11.2213H111.781V16.5827C111.781 16.9143 111.87 17.2217 112.049 17.504C112.229 17.774 112.47 17.9953 112.774 18.1673C113.091 18.3269 113.45 18.407 113.85 18.407C114.236 18.407 114.58 18.3269 114.884 18.1673C115.201 17.9953 115.45 17.774 115.629 17.504C115.808 17.2217 115.898 16.9143 115.898 16.5827V11.2213H119.105V16.6562C119.105 17.4423 118.898 18.1614 118.484 18.8122C118.07 19.4505 117.471 19.9608 116.684 20.341C115.912 20.7095 114.974 20.894 113.87 20.894ZM98.2437 20.6727V18.407H103.354C103.492 18.407 103.616 18.3821 103.727 18.3328C103.837 18.2717 103.927 18.1916 103.995 18.0938C104.063 17.997 104.099 17.8853 104.099 17.7713C104.099 17.6574 104.063 17.5457 103.995 17.4489C103.931 17.3542 103.838 17.2775 103.727 17.2276C103.615 17.1659 103.486 17.134 103.354 17.1356H101.492C100.802 17.1356 100.174 17.0371 99.6095 16.8408C99.0728 16.6428 98.6125 16.3099 98.285 15.8826C97.9679 15.4407 97.8093 14.8693 97.8093 14.1693C97.8093 13.6288 97.9538 13.1376 98.2437 12.6956C98.5452 12.255 98.9645 11.8877 99.4642 11.6265C99.9857 11.357 100.579 11.217 101.182 11.2213H106.292V13.506H101.678C101.495 13.5027 101.317 13.5622 101.182 13.6721C101.121 13.7248 101.074 13.7879 101.041 13.8576C101.009 13.9272 100.994 14.002 100.995 14.0773C100.995 14.2494 101.058 14.3965 101.182 14.5193C101.317 14.6292 101.495 14.6887 101.678 14.6854H103.499C104.271 14.6854 104.933 14.7899 105.485 14.998C106.051 15.195 106.485 15.5142 106.789 15.9568C107.106 16.3988 107.265 16.9695 107.265 17.6695C107.265 18.2225 107.106 18.7262 106.789 19.18C106.488 19.6323 106.06 20.0071 105.547 20.2675C105.037 20.5381 104.458 20.6727 103.809 20.6727H98.2437ZM91.2568 11.0006C92.1535 11.0006 92.9463 11.1293 93.6359 11.3874C94.3132 11.6174 94.9221 11.983 95.4154 12.4559C95.9183 12.9193 96.306 13.4717 96.5534 14.0773C96.8152 14.6914 96.9464 15.373 96.9464 16.1223C96.9464 17.0555 96.7259 17.8849 96.2842 18.6093C95.8762 19.3035 95.2605 19.8837 94.5054 20.2859C93.7465 20.6911 92.8637 20.894 91.8571 20.894C91.4293 20.894 91.0222 20.8447 90.6358 20.7469C90.2698 20.6511 89.9215 20.5081 89.6018 20.3227C89.3005 20.1406 89.0407 19.9093 88.8363 19.641H88.7736V24.6714H85.5671V16.1217C85.5671 15.0775 85.8016 14.1745 86.2706 13.4134C86.7253 12.6642 87.4155 12.0494 88.2567 11.6442C89.1121 11.2147 90.1122 11 91.2568 11V11.0006ZM91.2568 13.4692C90.7604 13.4692 90.326 13.5795 89.9536 13.8008C89.5945 14.0097 89.3186 14.3045 89.1254 14.6854C88.9329 15.0532 88.8363 15.4715 88.8363 15.9378C88.8363 16.4047 88.9329 16.8224 89.1254 17.1908C89.3186 17.5592 89.5945 17.8541 89.9536 18.0754C90.326 18.2842 90.7604 18.3886 91.2568 18.3886C91.7531 18.3886 92.1808 18.2836 92.5392 18.0754C92.8999 17.8525 93.1861 17.5468 93.3674 17.1908C93.5739 16.8224 93.6772 16.4047 93.6772 15.9378C93.6772 15.4715 93.5739 15.0539 93.3674 14.6854C93.1742 14.3045 92.8984 14.009 92.5392 13.8008C92.1808 13.5795 91.7531 13.4692 91.2568 13.4692ZM80.6938 20.6727V11.2213H83.9217V20.6727H80.6938ZM82.3074 10.1528C81.797 10.1528 81.356 9.98732 80.9836 9.65568C80.6112 9.32404 80.4246 8.93067 80.4246 8.47622C80.4246 8.02178 80.6112 7.62907 80.9836 7.29743C81.356 6.95331 81.797 6.78125 82.3074 6.78125C82.8177 6.78125 83.2595 6.95331 83.6319 7.29743C84.0043 7.62907 84.1902 8.02178 84.1902 8.47622C84.1902 8.93067 84.0043 9.32338 83.6319 9.65568C83.2595 9.98732 82.8177 10.1528 82.3074 10.1528ZM73.6788 20.894C72.5896 20.894 71.6102 20.6793 70.7407 20.2491C69.8877 19.8328 69.1739 19.2225 68.672 18.4806C68.1757 17.7313 67.9272 16.89 67.9272 15.9562C67.9272 15.0105 68.1757 14.1693 68.672 13.4324C69.1739 12.6905 69.8877 12.0803 70.7407 11.6639C71.6102 11.2213 72.5896 11.0006 73.6788 11.0006C74.7688 11.0006 75.7408 11.2213 76.5963 11.6639C77.4462 12.0774 78.1541 12.6886 78.6443 13.4324C79.1546 14.1693 79.4098 15.0105 79.4098 15.9562C79.4098 16.89 79.1546 17.7313 78.6443 18.4806C78.1541 19.2244 77.4462 19.8356 76.5963 20.2491C75.7275 20.6793 74.7548 20.894 73.6788 20.894ZM73.6788 18.407C74.1892 18.407 74.6309 18.296 75.0033 18.0754C75.3759 17.8543 75.6757 17.549 75.8721 17.1908C76.0793 16.8224 76.1826 16.4047 76.1826 15.9378C76.1826 15.4833 76.0793 15.0722 75.8721 14.7032C75.6756 14.3452 75.3758 14.0401 75.0033 13.8192C74.6309 13.5979 74.1892 13.4876 73.6788 13.4876C73.1685 13.4876 72.7201 13.5979 72.3344 13.8192C71.9617 14.0403 71.6616 14.3456 71.4649 14.7038C71.2542 15.088 71.148 15.511 71.1551 15.9384C71.1551 16.4047 71.2584 16.8224 71.4649 17.1908C71.6617 17.549 71.9617 17.8543 72.3344 18.0754C72.7201 18.296 73.1685 18.407 73.6788 18.407ZM57.505 24.4133V21.9625H62.8009C63.0082 21.9625 63.1807 21.9014 63.3186 21.7786C63.3859 21.7257 63.4392 21.6602 63.4749 21.5869C63.5106 21.5136 63.5277 21.4342 63.5251 21.3544V19.2726H63.4632C63.2012 19.5439 62.9025 19.7852 62.5738 19.991C62.2699 20.188 61.9248 20.3351 61.5391 20.4336C61.1286 20.5364 60.7036 20.5859 60.2772 20.5807C59.3392 20.5807 58.4977 20.3837 57.7528 19.991C57.022 19.5858 56.4423 19.027 56.0146 18.3144C55.6016 17.6026 55.3944 16.7915 55.3944 15.8826C55.3944 14.9862 55.6082 14.1693 56.036 13.4324C56.477 12.6956 57.1186 12.1059 57.9601 11.6639C58.8008 11.2213 59.8289 11.0006 61.0428 11.0006C62.2013 11.0006 63.2014 11.2154 64.0428 11.6455C64.8878 12.0539 65.5787 12.6753 66.0289 13.4318C66.4979 14.1936 66.7324 15.0906 66.7324 16.1223V21.6492C66.7324 22.4964 66.45 23.1662 65.8843 23.6574C65.3327 24.1611 64.5672 24.4127 63.5878 24.4127L57.505 24.4133ZM61.0634 18.1857C61.5597 18.1857 61.9875 18.0872 62.3466 17.8909C62.701 17.686 62.9866 17.3996 63.1733 17.0621C63.3695 16.7068 63.4688 16.3153 63.4632 15.9194C63.4632 15.4774 63.3673 15.0722 63.1741 14.7038C62.9809 14.3354 62.705 14.0465 62.3459 13.8376C61.9875 13.6163 61.5597 13.506 61.0627 13.506C60.5804 13.506 60.1526 13.6104 59.7802 13.8192C59.4218 14.0281 59.1459 14.3105 58.9527 14.6664C58.7602 15.023 58.6636 15.4216 58.6636 15.8642C58.6636 16.2944 58.7595 16.6871 58.9527 17.0437C59.1459 17.3872 59.4218 17.6636 59.7809 17.8725C60.1526 18.0813 60.5804 18.1857 61.0634 18.1857ZM48.8757 20.894C47.7865 20.894 46.8071 20.6793 45.9383 20.2491C45.0851 19.8329 44.371 19.2227 43.869 18.4806C43.3726 17.7313 43.1241 16.89 43.1241 15.9562C43.1241 15.0105 43.3726 14.1693 43.869 13.4324C44.371 12.6904 45.0851 12.0801 45.9383 11.6639C46.8071 11.2213 47.7865 11.0006 48.8757 11.0006C49.9657 11.0006 50.9377 11.2213 51.7932 11.6639C52.6431 12.0774 53.351 12.6887 53.8412 13.4324C54.3516 14.1693 54.6067 15.0105 54.6067 15.9562C54.6067 16.89 54.3516 17.7313 53.8412 18.4806C53.351 19.2243 52.6431 19.8356 51.7932 20.2491C50.9245 20.6793 49.9517 20.894 48.8757 20.894ZM48.8757 18.407C49.3861 18.407 49.8271 18.296 50.2003 18.0754C50.5726 17.8542 50.8724 17.5489 51.069 17.1908C51.2755 16.8224 51.3788 16.4047 51.3788 15.9378C51.3788 15.4833 51.2755 15.0722 51.069 14.7032C50.8723 14.3453 50.5726 14.0403 50.2003 13.8192C49.8278 13.5979 49.3861 13.4876 48.8757 13.4876C48.3654 13.4876 47.917 13.5979 47.5313 13.8192C47.1586 14.0403 46.8585 14.3456 46.6618 14.7038C46.4511 15.088 46.345 15.511 46.3521 15.9384C46.3521 16.4047 46.4553 16.8224 46.6618 17.1908C46.8586 17.549 47.1586 17.8543 47.5313 18.0754C47.917 18.296 48.3654 18.407 48.8757 18.407ZM38.6055 20.6727C37.7087 20.6727 36.9226 20.4954 36.2471 20.1388C35.59 19.7995 35.0471 19.3097 34.6747 18.7203C34.3023 18.1306 34.1157 17.4791 34.1157 16.7672V7.77617H37.5915V16.9879C37.5915 17.2834 37.7095 17.5408 37.9433 17.7621C38.1778 17.9828 38.4669 18.0938 38.812 18.0938H42.6396V20.6727H38.6055Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1336_4286">
                                                    <rect width="137.91" height="26.2685" fill="white" transform="translate(0.590332 0.871094)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="desk-footer h-full w-full absolute  ">

                            <NewHeaderWrapper>
                                <NewBgWrapp>
                                    <NewBackground>
                                        <img className="h-full w-full absolute" src={"/Images/Bottom.png"} />
                                        <div className="w-full h-full flex absolute z-50 justify-between ">
                                            <div className="h-full items-end pt-24 resp-social-padding-about pl-32 ">
                                                <div className="flex">
                                                    <p className="text-white lg:ml-4 res-follow text-xs lg:text-base font-medium whitespace-nowrap opacity-60">Follow on  socials</p>
                                                    <div className="flex items-center ml-6 gap-6">

                                                        <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                                                            <FaXTwitter />
                                                        </Icon>
                                                        <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                                                            <FaTelegramPlane />
                                                        </Icon>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="h-full pb-6 justify-end pr-16 flex items-end w-1/2 ">
                                                <div className="flex group  transition-all duration-500 relative z-50 ease-in-out justify-between items-center gap-10 font-semibold text-base text-white">
                                                    <p className="whitespace-nowrap">Connect with us</p>
                                                    <div>
                                                        <div className="bg-white h-[30px] w-[30px] rounded-[50%] overflow-hidden flex justify-center items-center">
                                                            <div className="-translate-x-8 absolute transition-all duration-500 ease-in-out group-hover:translate-x-0 ">
                                                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.0169 7.50143C12.3489 7.16949 12.3489 6.6313 12.0169 6.29935L6.60757 0.889983C6.27562 0.558038 5.73743 0.558038 5.40549 0.889983C5.07354 1.22193 5.07354 1.76012 5.40549 2.09206L10.2138 6.90039L5.40549 11.7087C5.07354 12.0407 5.07354 12.5789 5.40549 12.9108C5.73743 13.2427 6.27562 13.2427 6.60757 12.9108L12.0169 7.50143ZM1.44426 6.05039C0.974821 6.05039 0.594263 6.43095 0.594263 6.90039C0.594263 7.36983 0.974821 7.75039 1.44426 7.75039L1.44426 6.05039ZM11.4159 6.05039L1.44426 6.05039L1.44426 7.75039L11.4159 7.75039L11.4159 6.05039Z" fill="black" />
                                                                </svg>
                                                            </div>
                                                            <div className="translate-x-0 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 ">
                                                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.0169 7.50143C12.3489 7.16949 12.3489 6.6313 12.0169 6.29935L6.60757 0.889983C6.27562 0.558038 5.73743 0.558038 5.40549 0.889983C5.07354 1.22193 5.07354 1.76012 5.40549 2.09206L10.2138 6.90039L5.40549 11.7087C5.07354 12.0407 5.07354 12.5789 5.40549 12.9108C5.73743 13.2427 6.27562 13.2427 6.60757 12.9108L12.0169 7.50143ZM1.44426 6.05039C0.974821 6.05039 0.594263 6.43095 0.594263 6.90039C0.594263 7.36983 0.974821 7.75039 1.44426 7.75039L1.44426 6.05039ZM11.4159 6.05039L1.44426 6.05039L1.44426 7.75039L11.4159 7.75039L11.4159 6.05039Z" fill="black" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </NewBackground>
                                </NewBgWrapp>
                            </NewHeaderWrapper>

                        </div>
                    </div>
                    {/* <div className="relative w-full md-footer justify-end md:flex hidden lg:hidden">
                        <div className="w-[65%] responsive-width-bottom-about right-0 mt-2">
                            <img src="/Images/Bottom.png"></img>
                        </div>
                        <HeaderWrapper style={{ position: "absolute", right: "0", bottom: "1.5rem" }}>
                            <BgWrapp>
                                <Background>
                                    <IconWrapper style={{ width: "80%", paddingLeft: "10px" }}>
                                        <div className="flex justify-start gap-6 w-full">
                                            <p className="text-white res-mob-footer-ml lg:ml-4 text-xs lg:text-base font-medium opacity-60">Follow on our socials</p>

                                            <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                                                <FaXTwitter />
                                            </Icon>
                                            <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                                                <FaTelegramPlane />
                                            </Icon>
                                        </div>
                                    </IconWrapper>
                                </Background>
                            </BgWrapp>
                        </HeaderWrapper>
                    </div>
                    <div className="md:hidden sm-footer block">
                        <HeaderWrapper>
                            <BgWrapp>
                                <Background>

                                    <IconWrapper style={{ width: "80%" }}>
                                        <div className="flex start gap-4 w-full">
                                            <p className="text-white res-mob-footer-ml lg:ml-4 text-xs lg:text-base font-medium opacity-60">Follow on our socials</p>
                                            <div className="flex res-mob-footer-social-gap gap-6">

                                                <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                                                    <FaXTwitter />
                                                </Icon>
                                                <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                                                    <FaTelegramPlane />
                                                </Icon>
                                            </div>
                                        </div>
                                    </IconWrapper>
                                </Background>
                            </BgWrapp>
                        </HeaderWrapper>
                    </div> */}
                    <div className="lg:hidden block">
                        <Footer />
                    </div>

                </div>

                {/* second section */}
                <div className="w-full flex lg:flex-row flex-col lg:px-20 lg:py-20  px-10 py-6">
                    <div className="lg:w-[57%] lg:px-10 lg:text-left text-center w-full">
                        <p className="font-bold text-[25px] leading-6 grad-text-gray lg:leading-[53px] text-white lg:text-5xl">Other L2s don&apos;t have yield, so the value of your assets depreciate over time.</p>

                        <div className="w-full slowly-visible mt-6 flex flex-col lg:hidden">
                            <img src="/Images/graph.png" className="w-full h-full"></img>
                        </div>

                        <p className="text-white mt-10 font-bold text-base leading-5 lg:leading-9 lg:text-2xl grad-text-gray">Nexus is the first L2 that incorporates native yield. Your balance on Blast compounds automatically.
                        </p>

                        <p className="font-bold text-sm lg:text-lg text-white opacity-50 mt-6 lg:mt-14 grad-text-gray">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </p>
                        <p className="font-bold text-sm lg:text-lg text-white opacity-50 mt-6 grad-text-gray">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer </p>
                    </div>

                    <div className="w-[43%] slowly-visible p-6 lg:flex flex-col hidden">
                        <img src="/Images/graph.png" className="w-full h-full"></img>
                    </div>
                </div>

                {/* third section */}
                <div className="w-full hideTopAnimationnodelay lg:mt-10 flex mt-16 flex-col lg:px-20 lg:py-20  px-10 py-6">
                    <div className="flex w-full justify-center items-center">
                        <p className="text-white grad-text-gray font-bold lg:text-6xl text-2xl">How Nexus works</p>
                    </div>

                    <div className="flex w-full lg:py-16 py-6  lg:flex-row flex-col lg:gap-8 gap-3">
                        <div className="flex group hover:scale-105 transition-all duration-500 ease-in-out rounded-[20px] lg:rounded-[38px] lg:min-h-[380px] working-step-box justify-between flex-col lg:px-12 lg:py-10 px-8 py-8">
                            <div className="lg:block hidden">
                                <svg className=" group-hover:scale-90 transition-all duration-500 ease-in-out" width="75" height="78" viewBox="0 0 75 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M37.0898 45.7881L24.5898 58.2881L37.0898 70.7881" stroke="#0075FF" stroke-width="5" />
                                    <path d="M49.7841 25.4756C51.7041 28.801 52.7148 32.5732 52.7148 36.4131C52.7148 40.253 51.7041 44.0252 49.7841 47.3506C47.8642 50.676 45.1028 53.4375 41.7773 55.3574C38.4519 57.2773 34.6797 58.2881 30.8398 58.2881" stroke="#0075FF" stroke-width="5" stroke-linecap="round" />
                                    <path d="M24.5901 27.0391L37.0901 14.5391L24.5901 2.03906" stroke="#0075FF" stroke-width="5" />
                                    <path d="M11.8958 47.3516C9.97585 44.0261 8.96509 40.2539 8.96509 36.4141C8.96509 32.5742 9.97585 28.802 11.8958 25.4766C13.8157 22.1511 16.5772 19.3897 19.9026 17.4698C23.228 15.5498 27.0002 14.5391 30.8401 14.5391" stroke="#0075FF" stroke-width="5" stroke-linecap="round" />
                                </svg>
                            </div>
                            <div className="lg:hidden mb-6 block">
                                <svg width="26" height="38" viewBox="0 0 26 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1004 23.2412L16.9207 25.0614L11.3953 30.5868L16.9207 36.1121L15.1004 37.9323L7.75488 30.5868L15.1004 23.2412Z" fill="#0075FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9026 12.5789C21.287 12.9343 21.0761 13.7215 21.4315 14.3371C22.307 15.8535 22.7679 17.5736 22.7679 19.3246C22.7679 21.0755 22.307 22.7957 21.4315 24.312C20.556 25.8284 19.2968 27.0876 17.7804 27.9631C16.264 28.8386 14.5439 29.2995 12.7929 29.2995C12.0821 29.2995 11.5058 29.8757 11.5058 30.5866C11.5058 31.2974 12.0821 31.8737 12.7929 31.8737C14.9958 31.8737 17.1598 31.2938 19.0675 30.1924C20.9752 29.091 22.5594 27.5068 23.6608 25.5991C24.7622 23.6914 25.342 21.5274 25.342 19.3246C25.342 17.1217 24.7622 14.9577 23.6608 13.05C23.3054 12.4344 22.5182 12.2235 21.9026 12.5789Z" fill="#0075FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4853 15.4072L8.66504 13.587L14.1904 8.06168L8.66504 2.53634L10.4853 0.716124L17.8308 8.06168L10.4853 15.4072Z" fill="#0075FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.68335 26.0695C4.29896 25.7141 4.50988 24.9269 4.15446 24.3113C3.27898 22.795 2.81807 21.0748 2.81807 19.3239C2.81807 17.5729 3.27898 15.8528 4.15446 14.3364C5.02994 12.82 6.28916 11.5608 7.80554 10.6853C9.32192 9.80984 11.042 9.34894 12.793 9.34894C13.5038 9.34894 14.0801 8.77269 14.0801 8.06185C14.0801 7.35101 13.5038 6.77476 12.793 6.77476C10.5902 6.77476 8.42616 7.35461 6.51845 8.45602C4.61075 9.55744 3.02657 11.1416 1.92516 13.0493C0.823744 14.957 0.243897 17.121 0.243896 19.3239C0.243896 21.5267 0.823744 23.6907 1.92516 25.5984C2.28058 26.214 3.06775 26.425 3.68335 26.0695Z" fill="#0075FF" />
                                </svg>
                            </div>
                            <div>
                                <p className="lg:text-4xl text-xl text-white font-bold">Auto Rebasing</p>

                                <p className="lg:text-lg text-xs text-white  font-bold mt-2 lg:mt-4 opacity-50 lg:grad-text-gray">Users transact in ETH. Dapps are built around ETH. Blast was designed from the ground up so that ETH itself is natively rebasing on the L2.
                                </p>
                            </div>
                        </div>

                        <div className="flex group hover:scale-105 transition-all duration-500 ease-in-out rounded-[20px] lg:rounded-[38px] lg:min-h-[380px] working-step-box justify-between flex-col lg:px-12 lg:py-10 px-8 py-8">
                            <div className="lg:block hidden">
                                <svg className="group-hover:scale-90 transition-all duration-500 ease-in-out" width="74" height="75" viewBox="0 0 74 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse cx="37.0001" cy="18.5391" rx="21.5833" ry="9.25" stroke="#0075FF" stroke-width="5" />
                                    <ellipse cx="37.0001" cy="18.5391" rx="21.5833" ry="9.25" stroke="#0075FF" stroke-width="5" />
                                    <ellipse cx="37.0001" cy="43.8984" rx="21.5833" ry="9.25" stroke="#0075FF" stroke-width="5" />
                                    <path d="M58.5834 55.5391C58.5834 56.7538 58.0251 57.9566 56.9405 59.0789C55.8558 60.2011 54.266 61.2209 52.2618 62.0798C50.2576 62.9387 47.8783 63.6201 45.2597 64.0849C42.6411 64.5498 39.8344 64.7891 37.0001 64.7891C34.1657 64.7891 31.3591 64.5498 28.7405 64.0849C26.1219 63.6201 23.7426 62.9387 21.7384 62.0798C19.7342 61.2209 18.1443 60.2011 17.0597 59.0789C15.975 57.9566 15.4167 56.7538 15.4167 55.5391" stroke="#0075FF" stroke-width="5" />
                                    <path d="M58.5833 18.5391V55.5391" stroke="#0075FF" stroke-width="5" />
                                    <path d="M15.4167 18.5391V55.5391" stroke="#0075FF" stroke-width="5" />
                                </svg>
                            </div>
                            <div className="lg:hidden mb-6 block">
                                <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4672 9.22846C10.034 9.66743 9.92676 10.0112 9.92676 10.2504C9.92676 10.4896 10.034 10.8333 10.4672 11.2723C10.9063 11.7172 11.6104 12.1814 12.5898 12.6012C14.5436 13.4385 17.3393 13.9902 20.5 13.9902C23.6606 13.9902 26.4563 13.4385 28.4101 12.6012C29.3895 12.1814 30.0936 11.7172 30.5327 11.2723C30.9659 10.8333 31.0732 10.4896 31.0732 10.2504C31.0732 10.0112 30.9659 9.66743 30.5327 9.22846C30.0936 8.78353 29.3895 8.31932 28.4101 7.89959C26.4563 7.06224 23.6606 6.5105 20.5 6.5105C17.3393 6.5105 14.5436 7.06224 12.5898 7.89959C11.6104 8.31932 10.9063 8.78353 10.4672 9.22846ZM11.4985 5.35331C13.8728 4.33577 17.0562 3.74023 20.5 3.74023C23.9437 3.74023 27.1272 4.33577 29.5014 5.35331C30.6861 5.86102 31.7333 6.50115 32.5044 7.28252C33.2814 8.06984 33.8434 9.07435 33.8434 10.2504C33.8434 11.4264 33.2814 12.4309 32.5044 13.2182C31.7333 13.9996 30.6861 14.6397 29.5014 15.1474C27.1272 16.165 23.9437 16.7605 20.5 16.7605C17.0562 16.7605 13.8728 16.165 11.4985 15.1474C10.3138 14.6397 9.26665 13.9996 8.49551 13.2182C7.71848 12.4309 7.15649 11.4264 7.15649 10.2504C7.15649 9.07435 7.71848 8.06984 8.49551 7.28252C9.26665 6.50115 10.3138 5.86102 11.4985 5.35331Z" fill="#0075FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4672 9.22846C10.034 9.66743 9.92676 10.0112 9.92676 10.2504C9.92676 10.4896 10.034 10.8333 10.4672 11.2723C10.9063 11.7172 11.6104 12.1814 12.5898 12.6012C14.5436 13.4385 17.3393 13.9902 20.5 13.9902C23.6606 13.9902 26.4563 13.4385 28.4101 12.6012C29.3895 12.1814 30.0936 11.7172 30.5327 11.2723C30.9659 10.8333 31.0732 10.4896 31.0732 10.2504C31.0732 10.0112 30.9659 9.66743 30.5327 9.22846C30.0936 8.78353 29.3895 8.31932 28.4101 7.89959C26.4563 7.06224 23.6606 6.5105 20.5 6.5105C17.3393 6.5105 14.5436 7.06224 12.5898 7.89959C11.6104 8.31932 10.9063 8.78353 10.4672 9.22846ZM11.4985 5.35331C13.8728 4.33577 17.0562 3.74023 20.5 3.74023C23.9437 3.74023 27.1272 4.33577 29.5014 5.35331C30.6861 5.86102 31.7333 6.50115 32.5044 7.28252C33.2814 8.06984 33.8434 9.07435 33.8434 10.2504C33.8434 11.4264 33.2814 12.4309 32.5044 13.2182C31.7333 13.9996 30.6861 14.6397 29.5014 15.1474C27.1272 16.165 23.9437 16.7605 20.5 16.7605C17.0562 16.7605 13.8728 16.165 11.4985 15.1474C10.3138 14.6397 9.26665 13.9996 8.49551 13.2182C7.71848 12.4309 7.15649 11.4264 7.15649 10.2504C7.15649 9.07435 7.71848 8.06984 8.49551 7.28252C9.26665 6.50115 10.3138 5.86102 11.4985 5.35331Z" fill="#0075FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4672 23.2783C10.034 23.7172 9.92676 24.061 9.92676 24.3002C9.92676 24.5394 10.034 24.8831 10.4672 25.3221C10.9063 25.767 11.6104 26.2312 12.5898 26.651C14.5436 27.4883 17.3393 28.04 20.5 28.04C23.6606 28.04 26.4563 27.4883 28.4101 26.651C29.3895 26.2312 30.0936 25.767 30.5327 25.3221C30.9659 24.8831 31.0732 24.5394 31.0732 24.3002C31.0732 24.061 30.9659 23.7172 30.5327 23.2783C30.0936 22.8333 29.3895 22.3691 28.4101 21.9494C26.4563 21.112 23.6606 20.5603 20.5 20.5603C17.3393 20.5603 14.5436 21.112 12.5898 21.9494C11.6104 22.3691 10.9063 22.8333 10.4672 23.2783ZM11.4985 19.4031C13.8728 18.3856 17.0562 17.79 20.5 17.79C23.9437 17.79 27.1272 18.3856 29.5014 19.4031C30.6861 19.9108 31.7333 20.551 32.5044 21.3323C33.2814 22.1196 33.8434 23.1242 33.8434 24.3002C33.8434 25.4762 33.2814 26.4807 32.5044 27.268C31.7333 28.0494 30.6861 28.6895 29.5014 29.1972C27.1272 30.2148 23.9437 30.8103 20.5 30.8103C17.0562 30.8103 13.8728 30.2148 11.4985 29.1972C10.3138 28.6895 9.26665 28.0494 8.49551 27.268C7.71848 26.4807 7.15649 25.4762 7.15649 24.3002C7.15649 23.1242 7.71848 22.1196 8.49551 21.3323C9.26665 20.551 10.3138 19.9108 11.4985 19.4031Z" fill="#0075FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.92676 30.75C9.92676 30.9698 10.0225 31.3085 10.4479 31.7486C10.8808 32.1966 11.5861 32.6706 12.5898 33.1008C13.5843 33.527 14.7974 33.8781 16.1658 34.1211C17.5317 34.3635 19.0055 34.4899 20.5 34.4899C21.9945 34.4899 23.4682 34.3635 24.8341 34.1211C26.2025 33.8781 27.4156 33.527 28.4101 33.1008C29.4138 32.6706 30.1191 32.1966 30.552 31.7486C30.9774 31.3085 31.0732 30.9698 31.0732 30.75H33.8434C33.8434 31.8762 33.3206 32.8704 32.544 33.6739C31.775 34.4695 30.7186 35.1254 29.5014 35.6471C28.2751 36.1726 26.8516 36.5765 25.3183 36.8487C23.7825 37.1213 22.1462 37.2601 20.5 37.2601C18.8537 37.2601 17.2174 37.1213 15.6816 36.8487C14.1483 36.5765 12.7248 36.1726 11.4985 35.6471C10.2813 35.1254 9.22491 34.4695 8.45592 33.6739C7.67937 32.8704 7.15649 31.8762 7.15649 30.75L9.92676 30.75Z" fill="#0075FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M31.0732 30.75V10.25H33.8435V30.75H31.0732Z" fill="#0075FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.15649 30.75V10.25H9.92676V30.75H7.15649Z" fill="#0075FF" />
                                </svg>
                            </div>

                            <div>
                                <p className="lg:text-4xl text-xl text-white font-bold">L1 Staking</p>

                                <p className="lg:text-lg text-xs text-white  font-bold mt-2 lg:mt-4 opacity-50 lg:grad-text-gray">Users transact in ETH. Dapps are built around ETH. Blast was designed from the ground up so that ETH itself is natively rebasing on the L2.</p>
                            </div>
                        </div>

                        <div className="flex group hover:scale-105 transition-all duration-500 ease-in-out rounded-[20px] lg:rounded-[38px] lg:min-h-[380px] working-step-box justify-between flex-col lg:px-12 lg:py-10 px-8 py-8">
                            <div className="lg:block hidden">
                                <svg className="group-hover:scale-90 transition-all duration-500 ease-in-out" width="74" height="75" viewBox="0 0 74 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="15.4166" y="12.3721" width="43.1667" height="52.4167" rx="2" stroke="#0075FF" stroke-width="5" />
                                    <path d="M27.75 27.7891H46.25" stroke="#0075FF" stroke-width="5" stroke-linecap="round" />
                                    <path d="M27.75 40.1221H46.25" stroke="#0075FF" stroke-width="5" stroke-linecap="round" />
                                    <path d="M27.75 52.4561H40.0833" stroke="#0075FF" stroke-width="5" stroke-linecap="round" />
                                </svg>
                            </div>
                            <div className="lg:hidden mb-6 block">
                                <svg width="29" height="35" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.14357 0.646498C4.16777 0.646505 4.19193 0.646512 4.21605 0.646512H24.6562C24.6803 0.646512 24.7044 0.646505 24.7286 0.646498C25.213 0.646358 25.7102 0.646215 26.1253 0.70203C26.603 0.766253 27.1829 0.927367 27.6681 1.41259C28.1533 1.89782 28.3144 2.47769 28.3787 2.95538C28.4345 3.37052 28.4343 3.86774 28.4342 4.35206C28.4342 4.37626 28.4342 4.40042 28.4342 4.42454V30.2411C28.4342 30.2652 28.4342 30.2894 28.4342 30.3136C28.4343 30.7979 28.4345 31.2951 28.3787 31.7103C28.3144 32.1879 28.1533 32.7678 27.6681 33.253C27.1829 33.7383 26.603 33.8994 26.1253 33.9636C25.7102 34.0194 25.213 34.0193 24.7286 34.0191C24.7044 34.0191 24.6803 34.0191 24.6562 34.0191H4.21605C4.19193 34.0191 4.16776 34.0191 4.14357 34.0191C3.65925 34.0193 3.16203 34.0194 2.74688 33.9636C2.26919 33.8994 1.68932 33.7383 1.2041 33.253C0.718872 32.7678 0.557757 32.1879 0.493534 31.7103C0.437719 31.2951 0.437862 30.7979 0.438002 30.3136C0.438009 30.2894 0.438016 30.2652 0.438016 30.2411V4.42454C0.438016 4.40043 0.438009 4.37626 0.438002 4.35207C0.437862 3.86775 0.437719 3.37052 0.493534 2.95538C0.557757 2.47769 0.718871 1.89782 1.2041 1.41259C1.68932 0.927368 2.26919 0.766253 2.74688 0.70203C3.16203 0.646215 3.65925 0.646358 4.14357 0.646498ZM3.35536 3.56386C3.35283 3.61423 3.3507 3.67145 3.34905 3.73664C3.34429 3.92536 3.34419 4.14515 3.34419 4.42454V30.2411C3.34419 30.5205 3.34429 30.7403 3.34905 30.929C3.3507 30.9942 3.35283 31.0514 3.35536 31.1018C3.40573 31.1043 3.46295 31.1064 3.52814 31.1081C3.71686 31.1128 3.93665 31.1129 4.21605 31.1129H24.6562C24.9356 31.1129 25.1553 31.1128 25.3441 31.1081C25.4093 31.1064 25.4665 31.1043 25.5168 31.1018C25.5194 31.0514 25.5215 30.9942 25.5232 30.929C25.5279 30.7403 25.528 30.5205 25.528 30.2411V4.42454C25.528 4.14514 25.5279 3.92536 25.5232 3.73664C25.5215 3.67144 25.5194 3.61423 25.5168 3.56386C25.4665 3.56132 25.4093 3.55919 25.3441 3.55755C25.1553 3.55279 24.9356 3.55269 24.6562 3.55269H4.21605C3.93665 3.55269 3.71686 3.55279 3.52814 3.55755C3.46295 3.55919 3.40573 3.56132 3.35536 3.56386Z" fill="#0075FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.60645 11.0595C7.60645 10.257 8.25702 9.60645 9.05953 9.60645H19.8124C20.6149 9.60645 21.2655 10.257 21.2655 11.0595C21.2655 11.8621 20.6149 12.5126 19.8124 12.5126H9.05953C8.25702 12.5126 7.60645 11.8621 7.60645 11.0595Z" fill="#0075FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.60645 18.2285C7.60645 17.426 8.25702 16.7754 9.05953 16.7754H19.8124C20.6149 16.7754 21.2655 17.426 21.2655 18.2285C21.2655 19.031 20.6149 19.6816 19.8124 19.6816H9.05953C8.25702 19.6816 7.60645 19.031 7.60645 18.2285Z" fill="#0075FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.60645 25.3974C7.60645 24.5949 8.25702 23.9443 9.05953 23.9443H16.2281C17.0306 23.9443 17.6812 24.5949 17.6812 25.3974C17.6812 26.1999 17.0306 26.8505 16.2281 26.8505H9.05953C8.25702 26.8505 7.60645 26.1999 7.60645 25.3974Z" fill="#0075FF" />
                                </svg>
                            </div>
                            <div>
                                <p className="lg:text-4xl text-xl text-white font-bold">T-Bill Yield</p>

                                <p className="lg:text-lg text-xs text-white  font-bold mt-2 lg:mt-4 opacity-50 lg:grad-text-gray">Users transact in ETH. Dapps are built around ETH. Blast was designed from the ground up so that ETH itself is natively rebasing on the L2.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 text-center flex w-full justify-center">
                        <p className="text-white lg:w-[60%]  lg:text-base text-sm font-bold opacity-50">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer </p>
                    </div>
                </div>

                {/* forth section */}
                <div className="w-full hideTopAnimationnodelay flex mt-16 flex-col lg:px-20 lg:py-20  px-10 py-6">
                    <div className="flex w-full justify-center items-center">
                        <p className="text-white grad-text-gray font-bold lg:text-6xl text-2xl">Why a new L2?</p>
                    </div>
                    <div className="w-full text-center justify-center flex">
                        <p className="lg:text-2xl text-sm opacity-50 lg:opacity-60 text-white mt-3 lg:mt-6 ">The risk-free rate on existing L2s is 0%. It`&apos;`s time to change that.</p>
                    </div>

                    <div className="flex w-full lg:px-16 mt-6 lg:mt-24 lg:flex-row flex-col gap-6 lg:gap-10 ">
                        <div className="l2-box hover:scale-105 transition-all duration-500 ease-in-out rounded-[20px] lg:rounded-[36px] text-center lg:px-16 lg:py-16 px-6 py-4  border-[1.5px] border-[#FFFFFF] border-opacity-20">
                            <p className="lg:text-xl text-white opacity-50 lg:opacity-80 font-bold text-sm">After the merge, Ethereum provides 4% yield on ETH. On-chain T-Bill protocols provide 15% yield on stablecoins. If users do not match or beat these rates, they are losing money to a form of inflation.
                            </p>
                        </div>

                        <div className="l2-box hover:scale-105 transition-all duration-500 ease-in-out rounded-[20px] lg:rounded-[36px] text-center lg:px-16 lg:py-16 px-6 py-4 border-[1.5px] border-[#FFFFFF] border-opacity-20">
                            <p className="lg:text-xl text-white opacity-50 lg:opacity-80 font-bold text-sm">After the merge, Ethereum provides 4% yield on ETH. On-chain T-Bill protocols provide 15% yield on stablecoins. If users do not match or beat these rates, they are losing money to a form of inflation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* fifth section */}
                {/* <div className="w-full hideTopAnimationnodelay flex mt-16 flex-col lg:px-20 lg:py-20  px-10 py-6">
                    <div className="flex w-full justify-center items-center">
                        <p className="text-white grad-text-gray font-bold lg:text-6xl text-2xl">Who we are</p>
                    </div>

                    <div className="lg:mt-16 mt-6 w-full lg:px-32 flex flex-col  lg:gap-8 relative">
                        <div className="lg:flex res-arrow left-44 top-16 flex-col justify-center hidden absolute">
                            <div>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.50806" cy="7.64819" r="6.89429" fill="#0075FF" />
                                </svg>
                            </div>
                            <div className="ml-[1.5px] res-arrow -mt-[1.5px]">
                                <svg width="12" height="146" viewBox="0 0 12 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.04218 144.945C5.33507 145.238 5.80995 145.238 6.10284 144.945L10.8758 140.172C11.1687 139.88 11.1687 139.405 10.8758 139.112C10.5829 138.819 10.108 138.819 9.81515 139.112L5.57251 143.354L1.32987 139.112C1.03698 138.819 0.562102 138.819 0.269209 139.112C-0.0236845 139.405 -0.0236845 139.88 0.269209 140.172L5.04218 144.945ZM4.82251 0.211914V144.415H6.32251V0.211914H4.82251Z" fill="#0075FF" />
                                </svg>
                            </div>
                        </div>
                        <div className="lg:flex res-arrow-2 left-44 top-60 flex-col justify-center hidden absolute">
                            <div>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.50806" cy="7.64819" r="6.89429" fill="#0075FF" />
                                </svg>
                            </div>
                            <div className="ml-[1.5px] res-arrow-2 -mt-[1.5px]">
                                <svg width="12" height="146" viewBox="0 0 12 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.04218 144.945C5.33507 145.238 5.80995 145.238 6.10284 144.945L10.8758 140.172C11.1687 139.88 11.1687 139.405 10.8758 139.112C10.5829 138.819 10.108 138.819 9.81515 139.112L5.57251 143.354L1.32987 139.112C1.03698 138.819 0.562102 138.819 0.269209 139.112C-0.0236845 139.405 -0.0236845 139.88 0.269209 140.172L5.04218 144.945ZM4.82251 0.211914V144.415H6.32251V0.211914H4.82251Z" fill="#0075FF" />
                                </svg>
                            </div>
                        </div>
                        <div className="who-we-are-steps hover:scale-1 transition-all duration-500 ease-in-out pb-10  rounded-[20px] lg:rounded-[36px] lg:text-left text-center lg:px-10 lg:pl-24 lg:py-10 px-6 py-4  border-[1.5px] border-[#FFFFFF] border-opacity-20">
                            <p className="lg:text-xl text-white opacity-50 lg:opacity-80 font-bold text-sm">Pacman created Blur, the top NFT marketplace protocol on Ethereum with over 333,063 users and $7b worth of NFTs traded. Blur distributed the 5th largest airdrop in Ethereum history.</p>
                        </div>
                        <div className="lg:hidden -mt-6 flex-col flex w-full justify-center items-center">
                            <div>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="5.70776" cy="5.8606" r="5.02368" fill="#0075FF" />
                                </svg>
                            </div>
                            <div className="ml-[1.5px]">
                                <svg width="12" height="51" viewBox="0 0 12 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.04218 50.2715C5.33508 50.5644 5.80995 50.5644 6.10284 50.2715L10.8758 45.4986C11.1687 45.2057 11.1687 44.7308 10.8758 44.4379C10.5829 44.145 10.108 44.145 9.81515 44.4379L5.57251 48.6806L1.32987 44.4379C1.03698 44.145 0.562104 44.145 0.269211 44.4379C-0.0236826 44.7308 -0.0236826 45.2057 0.269211 45.4986L5.04218 50.2715ZM4.82251 0.860352L4.82251 49.7412L6.32251 49.7412L6.32251 0.860352L4.82251 0.860352Z" fill="#0075FF" />
                                </svg>
                            </div>
                        </div>

                        <div className="who-we-are-steps pb-10  rounded-[20px] lg:rounded-[36px] lg:text-left text-center lg:px-10 lg:pl-24 lg:py-10 px-6 py-4  border-[1.5px] border-[#FFFFFF] border-opacity-20">
                            <p className="lg:text-xl text-white opacity-50 lg:opacity-80 font-bold text-sm">Our team members come from FAANG, Yale, MIT, Nanyang Technological University, Seoul National University and have worked on some of the largest protocols in Defi and Web3, primarily on Ethereum but also on other chains like Solana as well.</p>
                        </div>

                        <div className="lg:hidden -mt-6 flex-col flex w-full justify-center items-center">
                            <div>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="5.70776" cy="5.8606" r="5.02368" fill="#0075FF" />
                                </svg>
                            </div>
                            <div className="ml-[1.5px]">
                                <svg width="12" height="51" viewBox="0 0 12 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.04218 50.2715C5.33508 50.5644 5.80995 50.5644 6.10284 50.2715L10.8758 45.4986C11.1687 45.2057 11.1687 44.7308 10.8758 44.4379C10.5829 44.145 10.108 44.145 9.81515 44.4379L5.57251 48.6806L1.32987 44.4379C1.03698 44.145 0.562104 44.145 0.269211 44.4379C-0.0236826 44.7308 -0.0236826 45.2057 0.269211 45.4986L5.04218 50.2715ZM4.82251 0.860352L4.82251 49.7412L6.32251 49.7412L6.32251 0.860352L4.82251 0.860352Z" fill="#0075FF" />
                                </svg>
                            </div>
                        </div>

                        <div className="who-we-are-steps relative pb-10  rounded-[20px] lg:rounded-[36px] lg:text-left text-center lg:px-10 lg:pl-24 lg:py-10 px-6 py-4  border-[1.5px] border-[#FFFFFF] border-opacity-20">
                            <div className="absolute lg:block hidden left-12 top-20">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.50806" cy="7.73315" r="6.89429" fill="#0075FF" />
                                </svg>
                            </div>
                            <p className="lg:text-xl text-white opacity-50 lg:opacity-80 font-bold text-sm">Blast contributors have raised $20m from Paradigm, Standard Crypto, eGirl Capital, Primitive Ventures, Andrew Kang, Hasu, Foobar, Blurr, Will Price, Hsaka, Santiago Santos, Larry Cermak, Manifold, Jeff Lo, and other cryptonatives.</p>
                        </div>
                    </div>
                </div> */}

                <div className="w-full hideTopAnimationnodelay flex mt-16 flex-col lg:px-20 lg:py-20  px-10 py-6">
                    <div className="flex w-full justify-center items-center">
                        <p className="text-white grad-text-gray font-bold lg:text-6xl text-2xl">Who we are</p>
                    </div>

                    <div className="lg:mt-16 mt-6 w-full lg:px-32 flex flex-col  lg:gap-0 relative">
                        {/* <div className="lg:flex res-arrow left-44 top-16 flex-col justify-center hidden absolute">
                            <div>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.50806" cy="7.64819" r="6.89429" fill="#0075FF" />
                                </svg>
                            </div>
                            <div className="ml-[1.5px] res-arrow -mt-[1.5px]">
                                <svg width="12" height="146" viewBox="0 0 12 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.04218 144.945C5.33507 145.238 5.80995 145.238 6.10284 144.945L10.8758 140.172C11.1687 139.88 11.1687 139.405 10.8758 139.112C10.5829 138.819 10.108 138.819 9.81515 139.112L5.57251 143.354L1.32987 139.112C1.03698 138.819 0.562102 138.819 0.269209 139.112C-0.0236845 139.405 -0.0236845 139.88 0.269209 140.172L5.04218 144.945ZM4.82251 0.211914V144.415H6.32251V0.211914H4.82251Z" fill="#0075FF" />
                                </svg>
                            </div>
                        </div> */}
                        {/* <div className="lg:flex res-arrow-2 left-44 top-60 flex-col justify-center hidden absolute">
                            <div>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.50806" cy="7.64819" r="6.89429" fill="#0075FF" />
                                </svg>
                            </div>
                            <div className="ml-[1.5px] res-arrow-2 -mt-[1.5px]">
                                <svg width="12" height="146" viewBox="0 0 12 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.04218 144.945C5.33507 145.238 5.80995 145.238 6.10284 144.945L10.8758 140.172C11.1687 139.88 11.1687 139.405 10.8758 139.112C10.5829 138.819 10.108 138.819 9.81515 139.112L5.57251 143.354L1.32987 139.112C1.03698 138.819 0.562102 138.819 0.269209 139.112C-0.0236845 139.405 -0.0236845 139.88 0.269209 140.172L5.04218 144.945ZM4.82251 0.211914V144.415H6.32251V0.211914H4.82251Z" fill="#0075FF" />
                                </svg>
                            </div>
                        </div> */}
                        <div className="who-we-are-steps hover:scale-1 transition-all duration-500 ease-in-out pb-10  rounded-[20px] lg:rounded-[36px] lg:text-left text-center lg:px-10 lg:pl-24 lg:py-10 px-6 py-4  border-[1.5px] border-[#FFFFFF] border-opacity-20">
                            <p className="lg:text-xl text-white opacity-50 lg:opacity-80 font-bold text-sm">Pacman created Blur, the top NFT marketplace protocol on Ethereum with over 333,063 users and $7b worth of NFTs traded. Blur distributed the 5th largest airdrop in Ethereum history.</p>
                        </div>

                        <div className="lg:hidden -mt-6 flex-col flex w-full justify-center items-center">
                            <div>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="5.70776" cy="5.8606" r="5.02368" fill="#0075FF" />
                                </svg>
                            </div>
                            <div className="ml-[1.5px]">
                                <svg width="12" height="51" viewBox="0 0 12 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.04218 50.2715C5.33508 50.5644 5.80995 50.5644 6.10284 50.2715L10.8758 45.4986C11.1687 45.2057 11.1687 44.7308 10.8758 44.4379C10.5829 44.145 10.108 44.145 9.81515 44.4379L5.57251 48.6806L1.32987 44.4379C1.03698 44.145 0.562104 44.145 0.269211 44.4379C-0.0236826 44.7308 -0.0236826 45.2057 0.269211 45.4986L5.04218 50.2715ZM4.82251 0.860352L4.82251 49.7412L6.32251 49.7412L6.32251 0.860352L4.82251 0.860352Z" fill="#0075FF" />
                                </svg>
                            </div>
                        </div>

                        <div className="lg:flex -mt-20 flex-col justify-center items-center w-[10%] res-path-width  hidden">
                            <div>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.50806" cy="7.64819" r="6.89429" fill="#0075FF" />
                                </svg>
                            </div>
                            <div>
                                <svg width="12" height="146" viewBox="0 0 12 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.04218 144.945C5.33507 145.238 5.80995 145.238 6.10284 144.945L10.8758 140.172C11.1687 139.88 11.1687 139.405 10.8758 139.112C10.5829 138.819 10.108 138.819 9.81515 139.112L5.57251 143.354L1.32987 139.112C1.03698 138.819 0.562102 138.819 0.269209 139.112C-0.0236845 139.405 -0.0236845 139.88 0.269209 140.172L5.04218 144.945ZM4.82251 0.211914V144.415H6.32251V0.211914H4.82251Z" fill="#0075FF" />
                                </svg>
                            </div>
                        </div>

                        <div className="who-we-are-steps pb-10 lg:-mt-16 rounded-[20px] lg:rounded-[36px] lg:text-left text-center lg:px-10 lg:pl-24 lg:py-10 px-6 py-4  border-[1.5px] border-[#FFFFFF] border-opacity-20">
                            <p className="lg:text-xl text-white opacity-50 lg:opacity-80 font-bold text-sm">Our team members come from FAANG, Yale, MIT, Nanyang Technological University, Seoul National University and have worked on some of the largest protocols in Defi and Web3, primarily on Ethereum but also on other chains like Solana as well.</p>
                        </div>

                        <div className="lg:hidden -mt-6 flex-col flex w-full justify-center items-center">
                            <div>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="5.70776" cy="5.8606" r="5.02368" fill="#0075FF" />
                                </svg>
                            </div>
                            <div className="ml-[1.5px]">
                                <svg width="12" height="51" viewBox="0 0 12 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.04218 50.2715C5.33508 50.5644 5.80995 50.5644 6.10284 50.2715L10.8758 45.4986C11.1687 45.2057 11.1687 44.7308 10.8758 44.4379C10.5829 44.145 10.108 44.145 9.81515 44.4379L5.57251 48.6806L1.32987 44.4379C1.03698 44.145 0.562104 44.145 0.269211 44.4379C-0.0236826 44.7308 -0.0236826 45.2057 0.269211 45.4986L5.04218 50.2715ZM4.82251 0.860352L4.82251 49.7412L6.32251 49.7412L6.32251 0.860352L4.82251 0.860352Z" fill="#0075FF" />
                                </svg>
                            </div>
                        </div>

                        <div className="lg:flex new-res-who-we-are-sec -mt-20 flex-col justify-center items-center w-[10%] res-path-width  hidden">
                            <div>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.50806" cy="7.64819" r="6.89429" fill="#0075FF" />
                                </svg>
                            </div>
                            <div>
                                <svg width="12" height="146" viewBox="0 0 12 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.04218 144.945C5.33507 145.238 5.80995 145.238 6.10284 144.945L10.8758 140.172C11.1687 139.88 11.1687 139.405 10.8758 139.112C10.5829 138.819 10.108 138.819 9.81515 139.112L5.57251 143.354L1.32987 139.112C1.03698 138.819 0.562102 138.819 0.269209 139.112C-0.0236845 139.405 -0.0236845 139.88 0.269209 140.172L5.04218 144.945ZM4.82251 0.211914V144.415H6.32251V0.211914H4.82251Z" fill="#0075FF" />
                                </svg>
                            </div>
                        </div>

                        <div className="who-we-are-steps lg:-mt-16 relative pb-10  rounded-[20px] lg:rounded-[36px] lg:text-left text-center lg:px-10 lg:pl-24 lg:py-10 px-6 py-4  border-[1.5px] border-[#FFFFFF] border-opacity-20">
                            {/* <div className="absolute lg:block hidden left-12 top-20">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.50806" cy="7.73315" r="6.89429" fill="#0075FF" />
                                </svg>
                            </div> */}


                            <p className="lg:text-xl text-white opacity-50 lg:opacity-80 font-bold text-sm">Blast contributors have raised $20m from Paradigm, Standard Crypto, eGirl Capital, Primitive Ventures, Andrew Kang, Hasu, Foobar, Blurr, Will Price, Hsaka, Santiago Santos, Larry Cermak, Manifold, Jeff Lo, and other cryptonatives.</p>
                        </div>
                        <div className="lg:flex new-res-who-we-are-third -mt-20 flex-col justify-center items-center w-[10%] res-path-width  hidden">
                            <div>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="7.50806" cy="7.64819" r="6.89429" fill="#0075FF" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>


                {/* sixth section */}
                <div className="w-full hideTopAnimationnodelay flex mt-16 flex-col lg:px-20 lg:py-20  px-10 py-6">
                    <div className="flex w-full justify-center items-center">
                        <p className="text-white grad-text-gray font-bold lg:text-6xl text-2xl">Airdrop timeline</p>
                    </div>
                    <div className="w-full text-center justify-center flex">
                        <p className="lg:text-2xl lg:w-[60%] text-sm opacity-70 lg:opacity-70 text-white mt-3 lg:mt-6 ">The Blast Community Airdrop is split between Early Access Members (50%) and Developers (50%).</p>
                    </div>
                    <div className="mt-4 text-center flex w-full justify-center">
                        <p className="text-white lg:w-[55%]  lg:text-base text-sm font-bold opacity-50">The Early Access airdrop is now live. You can earn airdrop points by bridging to Blast and inviting friends. Airdrop points can be redeemed in May.</p>
                    </div>

                    <div className="flex justify-center relaive w-full lg:px-16 mt-6 lg:mt-24 lg:flex-row flex-col gap-10 lg:gap-10 ">
                        <div className="relative timeline-box hover:scale-105 transition-all duration-500 ease-in-out">
                            <div className="l2-box res-airdrop-box rounded-[20px] lg:rounded-[36px] text-center lg:px-20 lg:pb-20 pb-16 lg:pt-10 px-6 py-8  border-[1.5px] border-[#FFFFFF] border-opacity-20">
                                <p className="text-white lg:text-4xl text-3xl grad-text-gray whitespace-nowrap font-bold">Early Access</p>
                                <p className="lg:text-xl text-base opacity-50 text-white mt-2">Bridging Enabled</p>
                            </div>
                            <div className="flex absolute -bottom-4 lg:-bottom-6 w-full justify-center items-center">
                                <div className="bg-[#0075FF] w-[70%] text-white text-xl lg:text-2xl font-bold flex justify-center items-center rounded-[36px] py-2 lg:py-4 px-6">
                                    Now
                                </div>
                            </div>
                            <div className="absolute lg:block hidden -bottom-4 -right-10">
                                <div className="rotate-360">
                                    <svg width="42" height="15" viewBox="0 0 42 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M41.0533 8.09968C41.4438 7.70916 41.4438 7.07599 41.0533 6.68547L34.6893 0.321507C34.2988 -0.069017 33.6656 -0.0690169 33.2751 0.321507C32.8846 0.712032 32.8846 1.3452 33.2751 1.73572L38.932 7.39257L33.2751 13.0494C32.8846 13.44 32.8846 14.0731 33.2751 14.4636C33.6656 14.8542 34.2988 14.8542 34.6893 14.4636L41.0533 8.09968ZM0.89502 8.39258L40.3462 8.39257L40.3462 6.39257L0.895019 6.39258L0.89502 8.39258Z" fill="#0075FF" />
                                    </svg>
                                </div>
                            </div>
                        </div>



                        <div className="relative timeline-box hover:scale-105 transition-all duration-500 ease-in-out">
                            <div className="l2-box res-airdrop-box rounded-[20px] lg:rounded-[36px] text-center lg:px-20 lg:pb-20 pb-16 lg:pt-10 px-6 py-8  border-[1.5px] border-[#FFFFFF] border-opacity-20">
                                <p className="text-white lg:text-4xl text-3xl grad-text-gray whitespace-nowrap font-bold">Mainnet Launch</p>
                                <p className="lg:text-xl text-base opacity-50 text-white mt-2">Withdrawals enabled</p>

                            </div>
                            <div className="flex absolute -bottom-4 lg:-bottom-6 w-full justify-center items-center">
                                <div className="bg-[#0075FF] w-[70%] text-white text-xl lg:text-2xl font-bold flex justify-center items-center rounded-[36px] py-2 lg:py-4 px-6">
                                    February
                                </div>
                            </div>
                            <div className="absolute lg:block hidden -bottom-4 -right-10">
                                <div className="rotate-360">
                                    <svg width="42" height="15" viewBox="0 0 42 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M41.0533 8.09968C41.4438 7.70916 41.4438 7.07599 41.0533 6.68547L34.6893 0.321507C34.2988 -0.069017 33.6656 -0.0690169 33.2751 0.321507C32.8846 0.712032 32.8846 1.3452 33.2751 1.73572L38.932 7.39257L33.2751 13.0494C32.8846 13.44 32.8846 14.0731 33.2751 14.4636C33.6656 14.8542 34.2988 14.8542 34.6893 14.4636L41.0533 8.09968ZM0.89502 8.39258L40.3462 8.39257L40.3462 6.39257L0.895019 6.39258L0.89502 8.39258Z" fill="#0075FF" />
                                    </svg>
                                </div>
                            </div>
                        </div>


                        <div className="relative timeline-box hover:scale-105 transition-all duration-500 ease-in-out">
                            <div className="l2-box res-airdrop-box rounded-[20px] lg:rounded-[36px] text-center lg:px-20 lg:pb-20 pb-16 lg:pt-10 px-6 py-8  border-[1.5px] border-[#FFFFFF] border-opacity-20">
                                <p className="text-white lg:text-4xl text-3xl grad-text-gray font-bold">Redemption</p>
                                <p className="lg:text-xl text-base opacity-50 text-white mt-2">Airdrop Distributed</p>

                            </div>
                            <div className="flex absolute -bottom-4 lg:-bottom-6 w-full justify-center items-center">
                                <div className="bg-[#0075FF] w-[70%] text-white text-xl lg:text-2xl font-bold flex justify-center items-center rounded-[36px] py-2 lg:py-4 px-6">
                                    May
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-20 text-center flex w-full justify-center">
                        <p className="text-white lg:w-[55%]  lg:text-base text-sm font-bold opacity-50">The developer airdrop goes live in January when the Blast Testnet launches. Learn more in our developer docs.</p>
                    </div>
                </div>

                {/* about footer */}
                <div className="w-full">
                    <div className="footergradient-bg pt-8 pb-10 lg:pt-14 lg:pb-8 lg:px-20 flex flex-col">
                        <div className="lg:flex-row lg:justify-between flex-col flex">
                            <div>
                                <p className="font-bold grad-text text-3xl text-center lg:text-left lg:text-5xl">Have an Early Access invite?</p>
                            </div>

                            <div className="px-10 lg:px-0">
                                <div className="flex group  justify-between mt-6 lg:mt-0 items-center gap-10 lg:p-2 p-1 pl-6 lg:pl-6 transition-all hover:bg-black group duration-500 ease-in-out rounded-[36px] bg-white">
                                    <p className="font-semibold whitespace-nowrap lg:block hidden group-hover:text-white  duration-500 ease-in-out transition-all text-xl text-black">Claim your Airdrop</p>
                                    <p className="font-semibold group-hover:text-white  duration-500 ease-in-out transition-all lg:hidden block text-xl text-black">Claim your Airdrop</p>
                                    <div className="h-[43px] overflow-hidden relative flex justify-center items-center w-[43px] group-hover:bg-white rounded-[50%] bg-[#0075FF]">
                                        <div className="-translate-x-8 absolute transition-all duration-500 ease-in-out group-hover:translate-x-0 ">
                                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.8241 8.35945C17.2146 7.96893 17.2146 7.33576 16.8241 6.94524L10.4601 0.581276C10.0696 0.190752 9.4364 0.190752 9.04587 0.581277C8.65535 0.971801 8.65535 1.60497 9.04588 1.99549L14.7027 7.65234L9.04588 13.3092C8.65535 13.6997 8.65535 14.3329 9.04588 14.7234C9.4364 15.1139 10.0696 15.1139 10.4601 14.7234L16.8241 8.35945ZM1.73761 6.65235C1.18532 6.65235 0.737607 7.10006 0.737607 7.65235C0.737607 8.20463 1.18532 8.65235 1.73761 8.65235L1.73761 6.65235ZM16.1169 6.65234L1.73761 6.65235L1.73761 8.65235L16.1169 8.65234L16.1169 6.65234Z" fill="black" />
                                            </svg>
                                        </div>
                                        <div className="translate-x-0 absolute transition-all duration-500 ease-in-out group-hover:translate-x-8 ">
                                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.8241 8.35945C17.2146 7.96893 17.2146 7.33576 16.8241 6.94524L10.4601 0.581276C10.0696 0.190752 9.4364 0.190752 9.04587 0.581277C8.65535 0.971801 8.65535 1.60497 9.04588 1.99549L14.7027 7.65234L9.04588 13.3092C8.65535 13.6997 8.65535 14.3329 9.04588 14.7234C9.4364 15.1139 10.0696 15.1139 10.4601 14.7234L16.8241 8.35945ZM1.73761 6.65235C1.18532 6.65235 0.737607 7.10006 0.737607 7.65235C0.737607 8.20463 1.18532 8.65235 1.73761 8.65235L1.73761 6.65235ZM16.1169 6.65234L1.73761 6.65235L1.73761 8.65235L16.1169 8.65234L16.1169 6.65234Z" fill="white" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:flex items-center mt-14 justify-between hidden">
                            <div className="hover:scale-105 transition-all duration-500 ease-in-out">
                                <svg width="155" height="22" viewBox="0 0 155 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M134.386 19.4752C133.825 19.4752 133.37 19.0204 133.37 18.4594V17.1474C133.37 16.5857 133.826 16.1306 134.388 16.1316L148.167 16.1556C148.922 16.1556 149.497 15.984 149.891 15.6409C150.303 15.2806 150.509 14.7059 150.509 13.9168C150.509 13.1276 150.303 12.5614 149.891 12.2183C149.497 11.8581 148.922 11.6779 148.167 11.6779H138.955C137.05 11.6779 135.566 11.2233 134.503 10.314C133.456 9.38764 132.933 8.03234 132.933 6.24814C132.933 4.46395 133.456 3.11723 134.503 2.20797C135.566 1.28156 137.05 0.818359 138.955 0.818359H152.401C152.962 0.818359 153.417 1.27315 153.417 1.83416V3.14606C153.417 3.7078 152.961 4.16289 152.399 4.16186L139.392 4.13799C138.654 4.13799 138.08 4.30955 137.668 4.65266C137.256 4.97862 137.05 5.51045 137.05 6.24814C137.05 6.98584 137.256 7.52625 137.668 7.86936C138.08 8.19532 138.654 8.3583 139.392 8.3583H148.605C150.509 8.3583 151.984 8.83008 153.031 9.77365C154.094 10.7001 154.626 12.0811 154.626 13.9168C154.626 15.7353 154.094 17.1163 153.031 18.0599C151.984 19.0034 150.509 19.4752 148.605 19.4752H134.386Z" fill="white" />
                                    <path d="M115.284 19.4754C113.414 19.4754 111.939 19.2353 110.858 18.7549C109.777 18.2574 109.005 17.5111 108.542 16.5161C108.079 15.521 107.847 14.2687 107.847 12.759V1.96306C107.847 1.40205 108.302 0.947266 108.863 0.947266H110.948C111.51 0.947266 111.964 1.40205 111.964 1.96306V12.759C111.964 14.0628 112.265 14.9549 112.865 15.4353C113.483 15.8985 114.52 16.1301 115.979 16.1301H120.945C122.404 16.1301 123.433 15.8985 124.033 15.4353C124.651 14.9549 124.96 14.0628 124.96 12.759V1.96306C124.96 1.40205 125.415 0.947266 125.976 0.947266H128.061C128.622 0.947266 129.077 1.40205 129.077 1.96306V12.759C129.077 14.2687 128.846 15.521 128.382 16.5161C127.919 17.5111 127.147 18.2574 126.066 18.7549C124.985 19.2353 123.51 19.4754 121.64 19.4754H115.284Z" fill="white" />
                                    <path d="M83.075 19.3468C82.2377 19.3468 81.76 18.3907 82.2626 17.7211L87.4817 10.7689C87.7526 10.408 87.753 9.91156 87.4825 9.55028L82.2584 2.57182C81.757 1.90205 82.235 0.947266 83.0716 0.947266H85.5458C85.8692 0.947266 86.1734 1.10132 86.3647 1.36212L91.2886 8.07235C91.48 8.33314 91.7841 8.4872 92.1076 8.4872H93.446C93.7694 8.4872 94.0736 8.33314 94.2649 8.07235L99.1888 1.36212C99.3802 1.10132 99.6843 0.947266 100.008 0.947266H102.482C103.319 0.947266 103.797 1.90205 103.295 2.57182L98.071 9.55028C97.8006 9.91156 97.8009 10.408 98.0719 10.7689L103.291 17.7211C103.794 18.3907 103.316 19.3468 102.479 19.3468H99.9824C99.6588 19.3468 99.3545 19.1925 99.1631 18.9314L94.2649 12.2479C94.0736 11.9868 93.7693 11.8326 93.4456 11.8326H92.108C91.7843 11.8326 91.48 11.9868 91.2886 12.2479L86.3904 18.9314C86.1991 19.1925 85.8948 19.3468 85.5711 19.3468H83.075Z" fill="white" />
                                    <path d="M59.3198 19.3468C58.7587 19.3468 58.304 18.892 58.304 18.331V1.96307C58.304 1.40205 58.7587 0.947266 59.3198 0.947266H77.4633C78.0243 0.947266 78.4791 1.40205 78.4791 1.96306V3.27683C78.4791 3.83784 78.0243 4.29263 77.4633 4.29263H63.4371C62.8761 4.29263 62.4213 4.74742 62.4213 5.30843V7.34274C62.4213 7.90375 62.8761 8.35854 63.4371 8.35854H75.9707C76.5317 8.35854 76.9865 8.81332 76.9865 9.37434V10.6881C76.9865 11.2491 76.5317 11.7039 75.9707 11.7039H63.4371C62.8761 11.7039 62.4213 12.1587 62.4213 12.7197V14.9856C62.4213 15.5466 62.8761 16.0014 63.4371 16.0014H77.4633C78.0243 16.0014 78.4791 16.4562 78.4791 17.0172V18.331C78.4791 18.892 78.0243 19.3468 77.4633 19.3468H59.3198Z" fill="white" />
                                    <path d="M33.1283 19.3468C32.5673 19.3468 32.1125 18.892 32.1125 18.331V1.96307C32.1125 1.40205 32.5673 0.947266 33.1283 0.947266H35.856C36.1281 0.947266 36.3889 1.05649 36.5798 1.25044L47.5629 12.4071C48.2005 13.0548 49.3026 12.6033 49.3026 11.6945V1.96307C49.3026 1.40206 49.7574 0.947266 50.3184 0.947266H52.4042C52.9652 0.947266 53.4199 1.40205 53.4199 1.96306V18.331C53.4199 18.892 52.9652 19.3468 52.4042 19.3468H49.6771C49.4046 19.3468 49.1435 19.2373 48.9525 19.0429L37.9703 7.86531C37.333 7.2167 36.2299 7.66793 36.2299 8.57724V18.331C36.2299 18.892 35.7751 19.3468 35.2141 19.3468H33.1283Z" fill="white" />
                                    <path d="M21.0422 1.91128C21.0422 1.0551 20.048 0.582966 19.3845 1.12403L15.6688 4.15393C15.4322 4.34684 15.2949 4.63591 15.2949 4.94117V12.6465C15.2949 13.4624 14.3816 13.9454 13.7072 13.486L9.59632 10.6855C8.92199 10.2261 8.00861 10.709 8.00861 11.525V15.1166C8.00861 15.437 8.15972 15.7386 8.41632 15.9303L15.0245 20.8688C15.2001 21.0001 15.4134 21.071 15.6326 21.071H20.0264C20.5874 21.071 21.0422 20.6162 21.0422 20.0552V1.91128Z" fill="white" />
                                    <path d="M0.936768 19.9793C0.936768 20.8355 1.93098 21.3077 2.59451 20.7666L6.31021 17.7367C6.54679 17.5438 6.68407 17.2547 6.68407 16.9495V9.24415C6.68407 8.42822 7.59745 7.94527 8.27177 8.40465L12.3827 11.2052C13.057 11.6645 13.9704 11.1816 13.9704 10.3657V6.77398C13.9704 6.45364 13.8193 6.15206 13.5627 5.9603L6.95452 1.02178C6.77894 0.890564 6.56563 0.819662 6.34643 0.819662H1.95257C1.39156 0.819662 0.936768 1.27445 0.936768 1.83546V19.9793Z" fill="white" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0426 2.91067C23.5475 2.91067 23.9568 2.50137 23.9568 1.99646C23.9568 1.49156 23.5475 1.08225 23.0426 1.08225C22.5377 1.08225 22.1284 1.49156 22.1284 1.99646C22.1284 2.50137 22.5377 2.91067 23.0426 2.91067ZM23.0426 3.04566C23.6221 3.04566 24.0918 2.57592 24.0918 1.99646C24.0918 1.41701 23.6221 0.947266 23.0426 0.947266C22.4631 0.947266 21.9934 1.41701 21.9934 1.99646C21.9934 2.57592 22.4631 3.04566 23.0426 3.04566Z" fill="white" />
                                    <path d="M23.5115 1.64941H23.6513V2.32433H23.5202V1.87696L23.3187 2.20381H23.2753L23.0728 1.87696V2.32433H22.9426V1.64941H23.0815L23.2965 1.99652L23.5115 1.64941Z" fill="white" />
                                    <path d="M22.8565 1.64941V1.7709H22.6945V2.32433H22.5633V1.7709H22.4014V1.64941H22.8565Z" fill="white" />
                                </svg>
                            </div>

                            <div>
                                <p className="font-medium text-lg opacity-60 text-white">All rights are reserved</p>
                            </div>

                            <div className="bg-black rounded-[36px] flex items-center justify-between gap-6 px-8 py-6">
                                <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                                    <FaXTwitter />
                                </Icon>
                                <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                                    <FaTelegramPlane />
                                </Icon>

                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden justify-between pt-2 pb-8 px-10 flex">
                        <div>
                            <svg width="73" height="11" viewBox="0 0 73 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M63.3365 9.72374C63.0722 9.72374 62.8579 9.50949 62.8579 9.2452V8.62713C62.8579 8.36251 63.0727 8.14813 63.3373 8.14859L69.8287 8.15988C70.1843 8.15988 70.455 8.07906 70.6409 7.91742C70.8349 7.7477 70.9319 7.47695 70.9319 7.10518C70.9319 6.73341 70.8349 6.4667 70.6409 6.30506C70.455 6.13534 70.1843 6.05048 69.8287 6.05048H65.4886C64.5915 6.05048 63.8924 5.8363 63.3914 5.40796C62.8984 4.97153 62.6519 4.33305 62.6519 3.49252C62.6519 2.65199 62.8984 2.01756 63.3914 1.58921C63.8924 1.15278 64.5915 0.93457 65.4886 0.93457H71.8232C72.0875 0.93457 72.3018 1.14882 72.3018 1.41311V2.03114C72.3018 2.29578 72.087 2.51017 71.8223 2.50968L65.6947 2.49844C65.3472 2.49844 65.0765 2.57926 64.8825 2.7409C64.6885 2.89445 64.5915 3.145 64.5915 3.49252C64.5915 3.84005 64.6885 4.09463 64.8825 4.25627C65.0765 4.40983 65.3472 4.48661 65.6947 4.48661H70.0348C70.9319 4.48661 71.6269 4.70886 72.1199 5.15337C72.621 5.5898 72.8715 6.2404 72.8715 7.10518C72.8715 7.96187 72.621 8.61247 72.1199 9.05698C71.6269 9.50149 70.9319 9.72374 70.0348 9.72374H63.3365Z" fill="white" />
                                <path d="M54.3378 9.72368C53.4568 9.72368 52.7618 9.61053 52.2526 9.38423C51.7435 9.14986 51.3798 8.79829 51.1615 8.32953C50.9433 7.86078 50.8342 7.27079 50.8342 6.55957V1.47366C50.8342 1.20937 51.0485 0.995117 51.3128 0.995117H52.2954C52.5597 0.995117 52.7739 1.20937 52.7739 1.47366V6.55957C52.7739 7.17381 52.9153 7.59407 53.1982 7.82037C53.4892 8.03858 53.9781 8.14769 54.6651 8.14769H57.0048C57.6918 8.14769 58.1767 8.03858 58.4596 7.82037C58.7505 7.59407 58.896 7.17381 58.896 6.55957V1.47366C58.896 1.20937 59.1103 0.995117 59.3746 0.995117H60.3572C60.6214 0.995117 60.8357 1.20937 60.8357 1.47366V6.55957C60.8357 7.27079 60.7266 7.86078 60.5084 8.32953C60.2902 8.79829 59.9265 9.14986 59.4173 9.38423C58.9081 9.61053 58.2131 9.72368 57.3322 9.72368H54.3378Z" fill="white" />
                                <path d="M39.1641 9.66306C38.7697 9.66306 38.5446 9.21267 38.7814 8.89723L41.2401 5.62205C41.3677 5.45202 41.3679 5.21817 41.2405 5.04797L38.7794 1.76044C38.5432 1.44491 38.7684 0.995117 39.1625 0.995117H40.3281C40.4805 0.995117 40.6237 1.06769 40.7139 1.19055L43.0335 4.35172C43.1237 4.47458 43.267 4.54716 43.4193 4.54716H44.0498C44.2022 4.54716 44.3455 4.47458 44.4357 4.35172L46.7553 1.19055C46.8454 1.06769 46.9887 0.995117 47.1411 0.995117H48.3067C48.7008 0.995117 48.926 1.44491 48.6898 1.76044L46.2287 5.04797C46.1013 5.21817 46.1014 5.45202 46.2291 5.62204L48.6878 8.89723C48.9246 9.21267 48.6995 9.66306 48.3051 9.66306H47.1292C46.9767 9.66306 46.8333 9.59039 46.7432 9.4674L44.4356 6.31881C44.3455 6.19582 44.2022 6.12315 44.0497 6.12315H43.4195C43.267 6.12315 43.1237 6.19582 43.0335 6.31881L40.726 9.4674C40.6359 9.59039 40.4925 9.66306 40.34 9.66306H39.1641Z" fill="white" />
                                <path d="M27.9732 9.66306C27.7089 9.66306 27.4946 9.44881 27.4946 9.18452V1.47366C27.4946 1.20937 27.7089 0.995117 27.9732 0.995117H36.5205C36.7848 0.995117 36.9991 1.20937 36.9991 1.47366V2.09257C36.9991 2.35686 36.7848 2.57111 36.5205 2.57111H29.9128C29.6486 2.57111 29.4343 2.78536 29.4343 3.04965V4.008C29.4343 4.27229 29.6486 4.48654 29.9128 4.48654H35.8174C36.0817 4.48654 36.2959 4.70079 36.2959 4.96508V5.58399C36.2959 5.84828 36.0817 6.06253 35.8174 6.06253H29.9128C29.6486 6.06253 29.4343 6.27678 29.4343 6.54107V7.60853C29.4343 7.87282 29.6486 8.08707 29.9128 8.08707H36.5205C36.7848 8.08707 36.9991 8.30132 36.9991 8.56561V9.18452C36.9991 9.44881 36.7848 9.66306 36.5205 9.66306H27.9732Z" fill="white" />
                                <path d="M15.6345 9.66306C15.3703 9.66306 15.156 9.44881 15.156 9.18452V1.47366C15.156 1.20937 15.3703 0.995117 15.6345 0.995117H16.9195C17.0477 0.995117 17.1706 1.04657 17.2605 1.13794L22.4346 6.39382C22.735 6.69893 23.2542 6.48625 23.2542 6.05811V1.47366C23.2542 1.20937 23.4684 0.995117 23.7327 0.995117H24.7153C24.9796 0.995117 25.1938 1.20937 25.1938 1.47366V9.18452C25.1938 9.44881 24.9796 9.66306 24.7153 9.66306H23.4306C23.3022 9.66306 23.1792 9.61148 23.0893 9.51991L17.9156 4.25419C17.6154 3.94863 17.0957 4.1612 17.0957 4.58957V9.18452C17.0957 9.44881 16.8814 9.66306 16.6171 9.66306H15.6345Z" fill="white" />
                                <path d="M9.94092 1.44917C9.94092 1.04583 9.47255 0.823409 9.15996 1.0783L7.40951 2.50568C7.29806 2.59656 7.23338 2.73274 7.23338 2.87654V6.50648C7.23338 6.89087 6.80309 7.11838 6.48542 6.90197L4.54878 5.58266C4.23111 5.36624 3.80082 5.59376 3.80082 5.97815V7.67017C3.80082 7.82109 3.87201 7.96316 3.99289 8.0535L7.10597 10.38C7.18869 10.4418 7.28918 10.4752 7.39244 10.4752H9.46238C9.72667 10.4752 9.94092 10.261 9.94092 9.99669V1.44917Z" fill="white" />
                                <path d="M0.469238 9.96196C0.469238 10.3653 0.937606 10.5877 1.2502 10.3328L3.00065 8.90546C3.1121 8.81458 3.17677 8.67839 3.17677 8.53459V4.90465C3.17677 4.52027 3.60706 4.29275 3.92473 4.50916L5.86137 5.82848C6.17904 6.04489 6.60933 5.81737 6.60933 5.43299V3.74096C6.60933 3.59005 6.53815 3.44798 6.41726 3.35764L3.30418 1.03112C3.22147 0.969301 3.12097 0.935899 3.01771 0.935899H0.947778C0.683488 0.935899 0.469238 1.15015 0.469238 1.41444V9.96196Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8832 1.92007C11.121 1.92007 11.3139 1.72725 11.3139 1.48939C11.3139 1.25153 11.121 1.05871 10.8832 1.05871C10.6453 1.05871 10.4525 1.25153 10.4525 1.48939C10.4525 1.72725 10.6453 1.92007 10.8832 1.92007ZM10.8832 1.98366C11.1562 1.98366 11.3775 1.76237 11.3775 1.48939C11.3775 1.21641 11.1562 0.995117 10.8832 0.995117C10.6102 0.995117 10.3889 1.21641 10.3889 1.48939C10.3889 1.76237 10.6102 1.98366 10.8832 1.98366Z" fill="white" />
                                <path d="M11.1042 1.32617H11.17V1.64412H11.1083V1.43337L11.0133 1.58735H10.9929L10.8975 1.43337V1.64412H10.8362V1.32617H10.9016L11.0029 1.48969L11.1042 1.32617Z" fill="white" />
                                <path d="M10.7954 1.32617V1.3834H10.7191V1.64412H10.6574V1.3834H10.5811V1.32617H10.7954Z" fill="white" />
                            </svg>

                        </div>

                        <div className="flex items-center gap-4">
                            {/* <div>
                                <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.3845 10.0296C10.3845 10.0296 12.2222 2.6089 12.2908 1.61613L12.2918 1.61505C12.2918 1.50153 12.3025 1.43299 12.3025 1.37516C12.3025 1.27235 12.2908 1.18132 12.2801 1.13527C12.234 1.02174 12.1879 0.987473 12.1087 0.953203C11.9373 0.896442 11.6514 0.987473 11.6514 0.987473C11.6514 0.987473 1.52442 4.6298 0.941815 5.04105C0.816513 5.1203 0.782242 5.17813 0.759752 5.23489C0.65694 5.51977 0.965375 5.64507 0.965375 5.64507L3.57958 6.50184C3.57958 6.50184 3.6824 6.51255 3.71667 6.49113C4.30998 6.11415 9.68833 2.71172 9.99677 2.6089C10.0535 2.58641 10.0867 2.6089 10.076 2.63139C9.95072 3.07691 5.28134 7.23223 5.28134 7.23223C5.28134 7.23223 5.25778 7.24401 5.246 7.27828L5.23529 7.30184V7.32433L4.99539 9.93854C4.99539 10.0981 5.04144 10.4066 5.48589 10.0414C5.55829 9.98438 5.6273 9.92323 5.69259 9.85822L5.7033 9.84751C5.83342 9.71868 5.96661 9.59298 6.10276 9.47054C6.43369 9.15139 6.74213 8.88793 6.94775 8.70587C6.98848 8.67453 7.02679 8.64016 7.06234 8.60306C7.96409 9.23064 8.9226 9.91605 9.34562 10.2695C9.41369 10.3388 9.49561 10.3929 9.58605 10.4283C9.67648 10.4638 9.77338 10.4797 9.87039 10.4751C10.2699 10.4644 10.3845 10.0296 10.3845 10.0296Z" fill="white" />
                                </svg>
                            </div>

                            <div>
                                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.03771 10.4869C8.28727 10.4869 10.6136 6.82249 10.6136 3.6468C10.6136 3.54512 10.6136 3.44343 10.6073 3.3354C11.062 2.994 11.4528 2.5728 11.7614 2.09168C11.3465 2.28234 10.9002 2.40944 10.4302 2.47299C10.9165 2.16633 11.2784 1.69284 11.4504 1.1384C11.0041 1.41803 10.5097 1.61504 9.97834 1.72308C9.76703 1.48138 9.50769 1.28788 9.21739 1.15534C8.9271 1.02279 8.61245 0.954209 8.29416 0.954102C7.01678 0.954102 5.97849 2.03385 5.97849 3.36082C5.97849 3.55147 6.0029 3.72942 6.03982 3.90736C4.1222 3.81204 2.41862 2.84668 1.27706 1.39261C1.07148 1.76256 0.964075 2.1804 0.965379 2.60518C0.965379 3.43771 1.37469 4.17428 1.99178 4.6058C1.62498 4.59318 1.26662 4.4907 0.94723 4.30711V4.33888C0.94723 5.50188 1.74707 6.47931 2.79726 6.69539C2.60199 6.75259 2.40047 6.77801 2.18643 6.77801C2.03997 6.77801 1.89352 6.7653 1.75333 6.73352C2.04623 7.69252 2.90115 8.3846 3.91441 8.40367C3.10228 9.0705 2.08928 9.43395 1.04486 9.43321C0.861487 9.43321 0.672479 9.42686 0.495361 9.40143C1.54482 10.1102 2.77732 10.4879 4.03771 10.4869Z" fill="white" />
                                </svg>
                            </div>


                            <div>
                                <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.4525 1.74517C9.68015 1.37274 8.86501 1.10707 8.0275 0.954796C8.01983 0.953253 8.0119 0.954297 8.00483 0.95778C7.99777 0.961262 7.99193 0.967003 7.98817 0.97418C7.8839 1.1699 7.76772 1.42439 7.68668 1.62511C6.78362 1.48116 5.86503 1.48116 4.96197 1.62511C4.87114 1.4026 4.7687 1.1855 4.65512 0.974805C4.65126 0.967869 4.64551 0.962311 4.6386 0.958854C4.63169 0.955397 4.62395 0.954201 4.61639 0.955421C3.77884 1.10719 2.96366 1.37267 2.19138 1.74517C2.18449 1.74797 2.17865 1.75301 2.17469 1.75955C0.629716 4.18133 0.206679 6.54433 0.414622 8.87731C0.415201 8.88304 0.41687 8.8886 0.419531 8.89365C0.422192 8.8987 0.42579 8.90313 0.430114 8.9067C1.32958 9.60608 2.33576 10.14 3.40567 10.4856C3.41319 10.488 3.42123 10.4879 3.42869 10.4853C3.43616 10.4827 3.44269 10.4778 3.44738 10.4712C3.67677 10.1423 3.88114 9.79587 4.05631 9.43195C4.05874 9.42695 4.06013 9.42147 4.06038 9.41588C4.06063 9.41028 4.05973 9.40469 4.05776 9.39948C4.05579 9.39427 4.05278 9.38956 4.04893 9.38567C4.04508 9.38178 4.04049 9.3788 4.03546 9.37692C3.7144 9.24787 3.4036 9.09231 3.10597 8.9117C3.10056 8.9084 3.09601 8.90377 3.09271 8.89819C3.08941 8.89261 3.08747 8.88627 3.08706 8.87972C3.08665 8.87318 3.08778 8.86662 3.09035 8.86064C3.09292 8.85466 3.09685 8.84943 3.1018 8.84542C3.16436 8.79602 3.22692 8.74537 3.28651 8.69347C3.29181 8.68882 3.29826 8.68583 3.3051 8.68484C3.31195 8.68384 3.31892 8.68488 3.32523 8.68784C5.27537 9.62266 7.38698 9.62266 9.31388 8.68784C9.32022 8.68467 9.32728 8.68346 9.33424 8.68434C9.3412 8.68523 9.34778 8.68818 9.35321 8.69285C9.41279 8.74475 9.47476 8.79602 9.53792 8.84542C9.54292 8.84933 9.54693 8.85448 9.5496 8.8604C9.55227 8.86633 9.55351 8.87285 9.55322 8.87939C9.55292 8.88593 9.5511 8.8923 9.54792 8.89794C9.54473 8.90357 9.54027 8.9083 9.53494 8.9117C9.23762 9.09366 8.92898 9.24748 8.60485 9.3763C8.59985 9.37831 8.59531 9.3814 8.59153 9.38538C8.58774 9.38936 8.5848 9.39413 8.58289 9.39938C8.58098 9.40463 8.58014 9.41024 8.58044 9.41585C8.58073 9.42146 8.58215 9.42695 8.58459 9.43195C8.76334 9.79587 8.96771 10.1417 9.19234 10.4699C9.19681 10.4768 9.20326 10.4821 9.21076 10.4849C9.21826 10.4877 9.22641 10.4879 9.23404 10.4856C10.3061 10.1412 11.3142 9.60721 12.215 8.9067C12.2193 8.90334 12.223 8.89903 12.2257 8.89407C12.2283 8.88911 12.23 8.88361 12.2305 8.87793C12.4789 6.1804 11.814 3.83741 10.4686 1.75955C10.4652 1.75297 10.4591 1.74787 10.4525 1.74517ZM4.34767 7.45663C3.76078 7.45663 3.27697 6.89074 3.27697 6.19603C3.27697 5.50196 3.75125 4.93606 4.34767 4.93606C4.94946 4.93606 5.4285 5.50633 5.41897 6.19603C5.41897 6.89074 4.94469 7.45663 4.34767 7.45663ZM8.30753 7.45663C7.72005 7.45663 7.23683 6.89074 7.23683 6.19603C7.23683 5.50196 7.71111 4.93606 8.30753 4.93606C8.90872 4.93606 9.38777 5.50633 9.37823 6.19603C9.37823 6.89074 8.90872 7.45663 8.30753 7.45663Z" fill="white" />
                                </svg>
                            </div> */}
                            <Icon href="https://twitter.com/NexusLaunchpad" target="_blank">
                                <FaXTwitter />
                            </Icon>
                            <Icon href="https://t.me/NexusLaunchpad" target="_blank">
                                <FaTelegramPlane />
                            </Icon>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default About;
