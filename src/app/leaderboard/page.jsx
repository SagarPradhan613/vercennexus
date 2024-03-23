'use client'

import React, { useState } from "react"
import styled from "styled-components"
import { usePathname } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'


const LeaderBoard = () => {
    const [expand, setExpand] = useState(false);
    const [showmore, setShowMore] = useState(false);
    const pathname = usePathname()

    const handleClick = (index) => {
        setExpand(index === expand ? null : index)
    }

    const Card = ({ rank, name, invitedBy, points }) => {
        const [expand, setExpand] = useState(false);

        return (
            <div onClick={() => setExpand(!expand)} className="border-b border-white border-opacity-10">
                <div className="flex items-end pb-1 justify-between gap-8">
                    <div className="flex gap-6">
                        <div className="flex gap-3 flex-col justify-between">
                            <div>
                                <p className="font-bold text-xs opacity-40 text-white">Rank</p>
                            </div>
                            <div>
                                <p className="font-bold text-base text-white">{rank}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between">
                            <div>
                                <p className="font-bold text-xs opacity-40 text-white">Name</p>
                            </div>
                            <div className="flex gap-2">
                                <div>
                                    <img src="/Images/profile.png" className="max-h-[25px] max-w-[25px]" alt="Profile" />
                                </div>
                                <p className="font-bold text-base text-white">{name}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10.9568" cy="11.0469" r="10.8335" transform="rotate(-180 10.9568 11.0469)" fill="#0075FF" />
                            <path d="M10.5328 15.2587C10.7671 15.4931 11.147 15.4931 11.3813 15.2587L15.1997 11.4404C15.434 11.206 15.434 10.8261 15.1997 10.5918C14.9654 10.3575 14.5855 10.3575 14.3511 10.5918L10.957 13.9859L7.56292 10.5918C7.3286 10.3575 6.94871 10.3575 6.71439 10.5918C6.48008 10.8261 6.48008 11.206 6.71439 11.4404L10.5328 15.2587ZM11.557 7.69698C11.557 7.36561 11.2884 7.09698 10.957 7.09698C10.6257 7.09698 10.357 7.36561 10.357 7.69698L11.557 7.69698ZM11.557 14.8345L11.557 7.69698L10.357 7.69698L10.357 14.8345L11.557 14.8345Z" fill="white" />
                        </svg>
                    </div>
                </div>

                {/* expand */}
                <div className={`${expand ? 'pb-4 h-full pt-1 flex opacity-100 transition-all duration-200 ease-in-out justify-between' : 'pb-4 pt-1 transition-all duration-200 ease-in-out  opacity-0 h-0 flex justify-between'}`}>
                    <div className="flex flex-col">
                        <p className="font-bold text-xs text-white  text-opacity-40">Invited By</p>
                        <p className="font-bold text-base text-white">{invitedBy}</p>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-bold text-xs text-white  text-opacity-40">Points</p>
                        <p className="font-bold text-base text-white">{points}</p>
                    </div>
                </div>
            </div>
        );
    };


    const data = [
        { rank: '01', name: '@beijingduck2023', invitedBy: 'Flytogalaxy', points: '1,321,590,915' },
        { rank: '02', name: '@exampleuser', invitedBy: 'Flytothegalaxy', points: '1,123,456,789' },
        { rank: '03', name: '@sampleuser', invitedBy: 'Flytothegalaxy', points: '987,654,321' },
        { rank: '04', name: '@exampleuser', invitedBy: 'Flytothegalaxy', points: '1,123,456,789' },
        { rank: '05', name: '@sampleuser', invitedBy: 'Flytothegalaxy', points: '987,654,321' },
        { rank: '06', name: '@beijingduck2023', invitedBy: 'Flytogalaxy', points: '1,321,590,915' },
        { rank: '07', name: '@exampleuser', invitedBy: 'Flytothegalaxy', points: '1,123,456,789' },
        { rank: '08', name: '@sampleuser', invitedBy: 'Flytothegalaxy', points: '987,654,321' },
        { rank: '09', name: '@exampleuser', invitedBy: 'Flytothegalaxy', points: '1,123,456,789' },
        { rank: '10', name: '@sampleuser', invitedBy: 'Flytothegalaxy', points: '987,654,321' }
    ];


    return (
        <>
            <div className="overflow-hidden sen  relative" style={{ minHeight: "100vh", minWidth: "100vw", position: "relative" }}>
                <div className="lg:block hidden" style={{ position: "absolute", height: "100%", width: "100%", top: "0", left: "0" }}>
                    <img className="opacity-70" style={{ height: "100%", width: "100%" }} src="/Images/topmask.png"></img>
                </div>
                <div className="lg:hidden block absolute h-full w-full right-0 top-0">
                    <img className="h-full w-full" src="/Images/mobtopmask.png"></img>
                </div>

                <div className="h-full w-full p-5 ">
                    <div className="lg:bg-[#0E111480] responsive-footer-space mainpage-bg px-4" style={{ height: "100%", width: "100%", backgroundColor: "" }} >

                        {/* head */}

                        <Nav />

                        <div className="flex gap-8 lg:px-10 responsive-flex-leaderboard flex-col mt-10 w-full lg:flex-row">

                            {/* leaderboard */}

                            <div className="lg:w-[70%] responsive-leaderboard-width w-full">
                                <div className="lg:px-6 resp-flex-col-leaderboard-head flex flex-col items-center lg:items-end justify-between lg:flex-row lg:justify-between w-full ">
                                    <p className="font-bold text-2xl lg:text-5xl text-white">Leaderboard</p>
                                    <p className="font-bold mt-2 lg:mt-0 lg:text-base text-sm opacity-60 text-white">Bridge, use Dapps, & invite friends to rank up.</p>
                                </div>

                                {/* desk table */}

                                <div className="w-full responsive-leaderboard-table-height  hidden lg:block relative z-50 rounded-[28px] mt-8 bg-[#191F25] p-2 border-2 border-[#FFFFFF0D]">
                                    <table class="table-auto relative z-50  w-full">
                                        <thead>
                                            <tr className="text-left bg-[#0E1114] text-white text-opacity-60 rounded-[17px] ">
                                                <th className="rounded-l-[17px] py-4 px-8">Rank</th>
                                                <th>Name</th>
                                                <th>Invited By</th>
                                                <th className="rounded-r-[17px]">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b hover:bg-[#0E111480] transition-all duration-300 ease-in-out rounded-[36px] border-opacity-10 border-white">
                                                <td className="font-bold text-white rounded-l-[18px] py-4 px-8 responsive-table-text text-lg">01</td>
                                                <td className="font-bold py-4 text-white text-lg">
                                                    <div className="responsive-table-text flex items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile.png"></img>
                                                        </div>
                                                        @beijingduck2023
                                                    </div>

                                                </td>

                                                <td className="font-bold   text-white text-lg">
                                                    <div className="flex responsive-table-text items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile.png"></img>
                                                        </div>
                                                        Flytogalaxy
                                                    </div>
                                                </td>
                                                <td className="font-bold responsive-table-text text-white text-lg rounded-r-[18px]">1,321,590,915</td>
                                            </tr>
                                            <tr className="border-b border-opacity-10 hover:bg-[#0E111480] transition-all duration-300 ease-in-out border-white">
                                                <td className="font-bold text-white responsive-table-text py-4 px-8 text-lg rounded-l-[18px]">02</td>
                                                <td className="font-bold py-4 text-white text-lg">
                                                    <div className="responsive-table-text flex items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile2.png"></img>
                                                        </div>
                                                        @Ag89642196
                                                    </div>

                                                </td>

                                                <td className="font-bold   text-white text-lg">
                                                    <div className="flex responsive-table-text items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile3.png"></img>
                                                        </div>
                                                        Flytogalaxy
                                                    </div>
                                                </td>
                                                <td className="font-bold responsive-table-text text-white text-lg rounded-r-[18px]">1,321,590,915</td>
                                            </tr>
                                            <tr className="border-b border-opacity-10 hover:bg-[#0E111480] transition-all duration-300 ease-in-out border-white">
                                                <td className="font-bold responsive-table-text text-white py-4 px-8 text-lg rounded-l-[18px]">03</td>
                                                <td className="font-bold py-4 text-white text-lg">
                                                    <div className="responsive-table-text flex items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile3.png"></img>
                                                        </div>
                                                        @beijingduck2023
                                                    </div>

                                                </td>

                                                <td className="font-bold   text-white text-lg">
                                                    <div className="flex responsive-table-text items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile2.png"></img>
                                                        </div>
                                                        Flytogalaxy
                                                    </div>
                                                </td>
                                                <td className="font-bold responsive-table-text text-white text-lg rounded-r-[18px]">1,321,590,915</td>
                                            </tr>
                                            <tr className="border-b border-opacity-10 hover:bg-[#0E111480] transition-all duration-300 ease-in-out border-white">
                                                <td className="font-bold text-white py-4 px-8 text-lg rounded-l-[18px]">04</td>
                                                <td className="font-bold py-4 text-white text-lg">
                                                    <div className="responsive-table-text flex items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile.png"></img>
                                                        </div>
                                                        @beijingduck2023
                                                    </div>

                                                </td>

                                                <td className="font-bold   text-white text-lg">
                                                    <div className="flex responsive-table-text items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile.png"></img>
                                                        </div>
                                                        Flytogalaxy
                                                    </div>
                                                </td>
                                                <td className="font-bold responsive-table-text text-white text-lg rounded-r-[18px]">1,321,590,915</td>
                                            </tr>
                                            <tr className="border-b border-opacity-10 hover:bg-[#0E111480] transition-all duration-300 ease-in-out border-white">
                                                <td className="font-bold text-white py-4 px-8 text-lg rounded-l-[18px]">05</td>
                                                <td className="font-bold py-4 text-white text-lg">
                                                    <div className="responsive-table-text flex items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile2.png"></img>
                                                        </div>
                                                        @Ag89642196
                                                    </div>

                                                </td>

                                                <td className="font-bold   text-white text-lg">
                                                    <div className="flex responsive-table-text items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile3.png"></img>
                                                        </div>
                                                        Flytogalaxy
                                                    </div>
                                                </td>
                                                <td className="font-bold responsive-table-text text-white text-lg rounded-r-[18px]">1,321,590,915</td>
                                            </tr>
                                            <tr className="border-b border-opacity-10 hover:bg-[#0E111480] transition-all duration-300 ease-in-out border-white">
                                                <td className="font-bold text-white responsive-table-text py-4 px-8 text-lg rounded-l-[18px]">06</td>
                                                <td className="font-bold py-4 text-white text-lg">
                                                    <div className="responsive-table-text flex items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile3.png"></img>
                                                        </div>
                                                        @beijingduck2023
                                                    </div>

                                                </td>

                                                <td className="font-bold   text-white text-lg">
                                                    <div className="flex responsive-table-text items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile2.png"></img>
                                                        </div>
                                                        Flytogalaxy
                                                    </div>
                                                </td>
                                                <td className="font-bold responsive-table-text text-white text-lg rounded-r-[18px]">1,321,590,915</td>
                                            </tr>
                                            <tr className="border-b border-opacity-10 hover:bg-[#0E111480] transition-all duration-300 ease-in-out border-white">
                                                <td className="font-bold responsive-table-text text-white py-4 px-8 text-lg rounded-l-[18px]">03</td>
                                                <td className="font-bold py-4 text-white text-lg">
                                                    <div className="responsive-table-text flex items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile.png"></img>
                                                        </div>
                                                        @beijingduck2023
                                                    </div>

                                                </td>

                                                <td className="font-bold   text-white text-lg">
                                                    <div className="flex responsive-table-text items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile.png"></img>
                                                        </div>
                                                        Flytogalaxy
                                                    </div>
                                                </td>
                                                <td className="font-bold responsive-table-text text-white text-lg rounded-r-[18px]">1,321,590,915</td>
                                            </tr>
                                            <tr className="border-b border-opacity-10 hover:bg-[#0E111480] transition-all duration-300 ease-in-out border-white">
                                                <td className="font-bold responsive-table-text text-white py-4 px-8 text-lg rounded-l-[18px]">04</td>
                                                <td className="font-bold py-4 text-white text-lg">
                                                    <div className=" flex items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile2.png"></img>
                                                        </div>
                                                        @Ag89642196
                                                    </div>

                                                </td>

                                                <td className="font-bold   text-white text-lg">
                                                    <div className="flex responsive-table-text items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile3.png"></img>
                                                        </div>
                                                        Flytogalaxy
                                                    </div>
                                                </td>
                                                <td className="font-bold responsive-table-text text-white text-lg rounded-r-[18px]">1,321,590,915</td>
                                            </tr>
                                            <tr className="hover:bg-[#0E111480] transition-all duration-300 ease-in-out">
                                                <td className="font-bold responsive-table-text text-white py-4 px-8 text-lg rounded-l-[18px]">05</td>
                                                <td className="font-bold py-4 text-white text-lg">
                                                    <div className="responsive-table-text flex items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile3.png"></img>
                                                        </div>
                                                        @beijingduck2023
                                                    </div>

                                                </td>

                                                <td className="font-bold   text-white text-lg">
                                                    <div className="flex responsive-table-text items-center gap-4">
                                                        <div className="max-w-[35px]">
                                                            <img src="/Images/profile2.png"></img>
                                                        </div>
                                                        Flytogalaxy
                                                    </div>
                                                </td>
                                                <td className="font-bold responsive-table-text text-white text-lg rounded-r-[18px]">1,321,590,915</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                                {/* mobile table */}

                                <div className="bg-[#191F25] flex flex-col gap-4 rounded-[25px] border border-white border-opacity-5 lg:hidden  px-4 py-4 mt-6 relative z-50">
                                    {/* <div onClick={() => { setExpand(!expand) }} className="border-b border-white border-opacity-10">
                                        <div className="flex items-end  pb-1  justify-between gap-8">
                                            <div className="flex gap-6">
                                                <div className="flex gap-3 flex-col justify-between">
                                                    <div>
                                                        <p className="font-bold text-xs opacity-40 text-white">Rank</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-base text-white">01</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-between">
                                                    <div>
                                                        <p className="font-bold text-xs opacity-40 text-white">Name</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div>
                                                            <img src="/Images/profile.png" className="max-h-[25px] max-w-[25px]"></img>
                                                        </div>
                                                        <p className="font-bold text-base text-white">@beijingduck2023</p>
                                                    </div>
                                                </div>
                                            </div>


                                            <div>
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="10.9568" cy="11.0469" r="10.8335" transform="rotate(-180 10.9568 11.0469)" fill="#0075FF" />
                                                    <path d="M10.5328 15.2587C10.7671 15.4931 11.147 15.4931 11.3813 15.2587L15.1997 11.4404C15.434 11.206 15.434 10.8261 15.1997 10.5918C14.9654 10.3575 14.5855 10.3575 14.3511 10.5918L10.957 13.9859L7.56292 10.5918C7.3286 10.3575 6.94871 10.3575 6.71439 10.5918C6.48008 10.8261 6.48008 11.206 6.71439 11.4404L10.5328 15.2587ZM11.557 7.69698C11.557 7.36561 11.2884 7.09698 10.957 7.09698C10.6257 7.09698 10.357 7.36561 10.357 7.69698L11.557 7.69698ZM11.557 14.8345L11.557 7.69698L10.357 7.69698L10.357 14.8345L11.557 14.8345Z" fill="white" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className={`${expand ? 'pb-4 h-full pt-1 flex opacity-100 transition-all duration-200 ease-in-out justify-between' : 'pb-4 pt-1 transition-all duration-200 ease-in-out  opacity-0 h-0 flex justify-between'}`}>
                                            <div className="flex flex-col">
                                                <p className="font-bold text-xs text-white  text-opacity-40">Invited By</p>
                                                <p className="font-bold text-base text-white">Flytogalaxy</p>
                                            </div>

                                            <div className="flex flex-col">
                                                <p className="font-bold text-xs text-white  text-opacity-40">Points</p>
                                                <p className="font-bold text-base text-white">1,321,590,915</p>
                                            </div>
                                        </div>
                                    </div> */}
                                    {data.slice(0, 5).map((item, index) => (
                                        <Card key={index} {...item} />
                                    ))}


                                    {showmore ?
                                        <>
                                            {data.slice(5).map((item, index) => (
                                                <Card key={index + 5} {...item} />
                                            ))}
                                        </>
                                        :
                                        null
                                    }

                                    <div onClick={() => { setShowMore(!showmore) }} className="flex rounded-[36px] justify-between bg-[#000000] py-2 px-4">
                                        {/* <p className="font-semibold text-base text-white">View more</p> */}
                                        {showmore ?
                                            <>
                                                <p className="font-semibold text-base text-white">View less</p>
                                            </>
                                            :
                                            <>
                                                <p className="font-semibold text-base text-white">View more</p>
                                            </>

                                        }
                                        {showmore ?
                                            <>
                                                <div className="rotate-180">
                                                    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="10.9568" cy="11.7427" r="10.8335" transform="rotate(-180 10.9568 11.7427)" fill="#0075FF" />
                                                        <path d="M10.5328 15.9545C10.7671 16.1889 11.147 16.1889 11.3813 15.9545L15.1997 12.1362C15.434 11.9018 15.434 11.5219 15.1997 11.2876C14.9654 11.0533 14.5855 11.0533 14.3511 11.2876L10.957 14.6817L7.56292 11.2876C7.3286 11.0533 6.94871 11.0533 6.71439 11.2876C6.48008 11.5219 6.48008 11.9018 6.71439 12.1362L10.5328 15.9545ZM11.557 8.39278C11.557 8.06141 11.2884 7.79278 10.957 7.79278C10.6257 7.79278 10.357 8.06141 10.357 8.39278L11.557 8.39278ZM11.557 15.5303L11.557 8.39278L10.357 8.39278L10.357 15.5303L11.557 15.5303Z" fill="white" />
                                                    </svg>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="10.9568" cy="11.7427" r="10.8335" transform="rotate(-180 10.9568 11.7427)" fill="#0075FF" />
                                                    <path d="M10.5328 15.9545C10.7671 16.1889 11.147 16.1889 11.3813 15.9545L15.1997 12.1362C15.434 11.9018 15.434 11.5219 15.1997 11.2876C14.9654 11.0533 14.5855 11.0533 14.3511 11.2876L10.957 14.6817L7.56292 11.2876C7.3286 11.0533 6.94871 11.0533 6.71439 11.2876C6.48008 11.5219 6.48008 11.9018 6.71439 12.1362L10.5328 15.9545ZM11.557 8.39278C11.557 8.06141 11.2884 7.79278 10.957 7.79278C10.6257 7.79278 10.357 8.06141 10.357 8.39278L11.557 8.39278ZM11.557 15.5303L11.557 8.39278L10.357 8.39278L10.357 15.5303L11.557 15.5303Z" fill="white" />
                                                </svg>
                                            </>

                                        }


                                    </div>
                                </div>



                            </div>



                            {/* recents */}
                            <div className="lg:w-[30%] responsive-recent-width pb-20 relative z-50 w-full">
                                <div className="w-full flex justify-center lg:justify-start">
                                    <p className="font-bold text-2xl lg:text-5xl text-white">Recent Joins</p>
                                </div>

                                <div className="w-full mt-6 lg:mt-10  lg:py-6   bg-[#191F25] border-2 border-[#FFFFFF0D] rounded-[28px]">
                                    <div className="lg:h-[60vh]   custom-scroller px-4 lg:px-8 lg:overflow-auto">
                                        <div className="flex border-b hover:scale-105 transition-all duration-500 ease-in-out  border-[#FFFFFF] border-opacity-20 py-6 justify-between">
                                            <div className="flex gap-4">
                                                <div className="max-h-[40px] max-w-[40px]">
                                                    <img src="/Images/profile.png" className="h-full w-full"></img>
                                                </div>
                                                <div>
                                                    <p className="lg:text-base text-sm text-white">@beijingduck2023</p>
                                                    <p className="lg:text-sm opacity-60 text-xs text-white">invited by Flytogalaxy </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-white font-500 lg:text-sm opacity-60 text-xs">5 min ago</p>
                                            </div>
                                        </div>

                                        <div className="flex border-b border-[#FFFFFF] hover:scale-105 transition-all duration-500 ease-in-out border-opacity-20 py-6 justify-between">
                                            <div className="flex gap-4">
                                                <div className="max-h-[40px] max-w-[40px]">
                                                    <img src="/Images/profile2.png" className="h-full w-full"></img>
                                                </div>
                                                <div>
                                                    <p className="lg:text-base text-sm text-white">Flytogalaxy</p>
                                                    <p className="lg:text-sm opacity-60 text-xs text-white">invited by Flytogalaxy </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-white font-500 lg:text-sm opacity-60 text-xs">5 min ago</p>
                                            </div>
                                        </div>

                                        <div className="flex border-b border-[#FFFFFF] hover:scale-105 transition-all duration-500 ease-in-out border-opacity-20 py-6 justify-between">
                                            <div className="flex gap-4">
                                                <div className="max-h-[40px] max-w-[40px]">
                                                    <img src="/Images/profile3.png" className="h-full w-full"></img>
                                                </div>
                                                <div>
                                                    <p className="lg:text-base text-sm text-white">@beijingduck2023</p>
                                                    <p className="lg:text-sm opacity-60 text-xs text-white">invited by Flytogalaxy </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-white font-500 lg:text-sm opacity-60 text-xs">5 min ago</p>
                                            </div>
                                        </div>

                                        <div className="flex border-b border-[#FFFFFF] hover:scale-105 transition-all duration-500 ease-in-out border-opacity-20 py-6 justify-between">
                                            <div className="flex gap-4">
                                                <div className="max-h-[40px] max-w-[40px]">
                                                    <img src="/Images/profile.png" className="h-full w-full"></img>
                                                </div>
                                                <div>
                                                    <p className="lg:text-base text-sm text-white">@beijingduck2023</p>
                                                    <p className="lg:text-sm opacity-60 text-xs text-white">invited by Flytogalaxy </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-white font-500 lg:text-sm opacity-60 text-xs">5 min ago</p>
                                            </div>
                                        </div>


                                        <div className="flex border-b border-[#FFFFFF] hover:scale-105 transition-all duration-500 ease-in-out border-opacity-20 py-6 justify-between">
                                            <div className="flex gap-4">
                                                <div className="max-h-[40px] max-w-[40px]">
                                                    <img src="/Images/profile3.png" className="h-full w-full"></img>
                                                </div>
                                                <div>
                                                    <p className="lg:text-base text-sm text-white">@beijingduck2023</p>
                                                    <p className="lg:text-sm opacity-60 text-xs text-white">invited by Flytogalaxy </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-white font-500 lg:text-sm opacity-60 text-xs">5 min ago</p>
                                            </div>
                                        </div>

                                        <div className="flex border-b border-[#FFFFFF] hover:scale-105 transition-all duration-500 ease-in-out border-opacity-20 py-6 justify-between">
                                            <div className="flex gap-4">
                                                <div className="max-h-[40px] max-w-[40px]">
                                                    <img src="/Images/profile2.png" className="h-full w-full"></img>
                                                </div>
                                                <div>
                                                    <p className="lg:text-base text-sm text-white">Flytogalaxy</p>
                                                    <p className="lg:text-sm opacity-60 text-xs text-white">invited by Flytogalaxy </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-white font-500 lg:text-sm opacity-60 text-xs">5 min ago</p>
                                            </div>
                                        </div>

                                        <div className="flex border-b border-[#FFFFFF] hover:scale-105 transition-all duration-500 ease-in-out border-opacity-20 py-6 justify-between">
                                            <div className="flex gap-4">
                                                <div className="max-h-[40px] max-w-[40px]">
                                                    <img src="/Images/profile.png" className="h-full w-full"></img>
                                                </div>
                                                <div>
                                                    <p className="lg:text-base text-sm text-white">@beijingduck2023</p>
                                                    <p className="lg:text-sm opacity-60 text-xs text-white">invited by Flytogalaxy </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-white font-500 lg:text-sm opacity-60 text-xs">5 min ago</p>
                                            </div>
                                        </div>

                                        <div className="flex  border-opacity-20 py-6 justify-between">
                                            <div className="flex gap-4">
                                                <div className="max-h-[40px] max-w-[40px]">
                                                    <img src="/Images/profile3.png" className="h-full w-full"></img>
                                                </div>
                                                <div>
                                                    <p className="lg:text-base text-sm text-white">@beijingduck2023</p>
                                                    <p className="lg:text-sm opacity-60 text-xs text-white">invited by Flytogalaxy </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-white font-500 lg:text-sm opacity-60 text-xs">5 min ago</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    {/* footer */}
                    <div className="lg:flex relative z-50  hidden footer-resp-margin -mt-10 items-center w-full justify-end gap-6">
                        <div>
                            <p className="text-white text-xs lg:font-medium lg:text-base responsive-social-text-hide opacity-60">Follow on our socials</p>
                        </div>
                        <div className="flex gap-6 items-center">
                            <div className="hover:scale-125 transition-all duration-500 ease-in-out">
                                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.725904 2.02111C0.460938 2.54228 0.460938 3.22417 0.460938 4.58797V10.4328C0.460938 11.7966 0.460938 12.4785 0.725904 12.9997C0.959596 13.4578 1.33231 13.8302 1.79064 14.0634C2.31181 14.3294 2.99371 14.3294 4.3575 14.3294H16.0472C17.411 14.3294 18.0929 14.3294 18.6141 14.0634C19.072 13.83 19.4444 13.4577 19.6778 12.9997C19.9438 12.4785 19.9438 11.7966 19.9438 10.4328V4.58797C19.9438 3.22417 19.9438 2.54228 19.6778 2.02111C19.4446 1.56278 19.0722 1.19006 18.6141 0.956373C18.0929 0.691406 17.411 0.691406 16.0472 0.691406H4.3575C2.99371 0.691406 2.31181 0.691406 1.79064 0.956373C1.33216 1.1899 0.95943 1.56263 0.725904 2.02111ZM3.03949 2.63969H17.3652C17.4698 2.63956 17.5716 2.6731 17.6557 2.73534C17.7397 2.79759 17.8015 2.88523 17.8319 2.98531C17.8623 3.08539 17.8596 3.19258 17.8243 3.29104C17.7891 3.38949 17.723 3.47398 17.636 3.532L10.744 8.14164C10.5837 8.24886 10.3952 8.30609 10.2024 8.30609C10.0095 8.30609 9.82102 8.24886 9.66073 8.14164L2.76868 3.532C2.68166 3.47398 2.61564 3.38949 2.58036 3.29104C2.54509 3.19258 2.54244 3.08539 2.57281 2.98531C2.60319 2.88523 2.66497 2.79759 2.74901 2.73534C2.83306 2.6731 2.93491 2.63956 3.03949 2.63969Z" fill="white" />
                                </svg>
                            </div>

                            <div className="hover:scale-125 transition-all duration-500 ease-in-out">

                                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7533 15.469C16.7533 15.469 19.8076 3.13618 19.9215 1.48623L19.9233 1.48445C19.9233 1.29578 19.9411 1.18187 19.9411 1.08576C19.9411 0.914887 19.9215 0.763596 19.9037 0.687061C19.8272 0.498394 19.7507 0.441438 19.6189 0.384482C19.3342 0.290148 18.8589 0.441438 18.8589 0.441438C18.8589 0.441438 2.02836 6.49482 1.06011 7.17829C0.851862 7.31 0.794905 7.40612 0.757527 7.50045C0.586659 7.9739 1.09926 8.18215 1.09926 8.18215L5.44396 9.60605C5.44396 9.60605 5.61483 9.62385 5.67178 9.58825C6.65784 8.96174 15.5964 3.30705 16.109 3.13618C16.2034 3.0988 16.2585 3.13618 16.2407 3.17356C16.0325 3.91399 8.27219 10.8199 8.27219 10.8199C8.27219 10.8199 8.23304 10.8395 8.21346 10.8965L8.19566 10.9356V10.973L7.79696 15.3177C7.79696 15.5829 7.8735 16.0955 8.61215 15.4886C8.73247 15.3939 8.84717 15.2922 8.95567 15.1842L8.97347 15.1664C9.18973 14.9523 9.41109 14.7434 9.63736 14.5399C10.1873 14.0095 10.7 13.5716 11.0417 13.2691C11.1094 13.217 11.173 13.1599 11.2321 13.0982C12.7308 14.1412 14.3238 15.2803 15.0268 15.8677C15.14 15.9828 15.2761 16.0728 15.4264 16.1317C15.5767 16.1906 15.7378 16.2171 15.899 16.2094C16.5629 16.1916 16.7533 15.469 16.7533 15.469Z" fill="white" />
                                </svg>
                            </div>
                            <div className="hover:scale-125 transition-all duration-500 ease-in-out">

                                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.73682 16.2298C13.7994 16.2298 17.6656 10.1397 17.6656 4.86186C17.6656 4.69287 17.6656 4.52387 17.6552 4.34432C18.4108 3.77693 19.0604 3.07692 19.5732 2.27733C18.8836 2.59419 18.142 2.80543 17.3609 2.91105C18.169 2.40139 18.7706 1.61446 19.0563 0.693018C18.3147 1.15775 17.493 1.48517 16.6099 1.66473C16.2587 1.26303 15.8277 0.941448 15.3452 0.721165C14.8628 0.500882 14.3398 0.386897 13.8108 0.386719C11.6879 0.386719 9.96231 2.18121 9.96231 4.38657C9.96231 4.70343 10.0029 4.99916 10.0642 5.2949C6.87724 5.13647 4.04597 3.5321 2.14875 1.1155C1.80708 1.73034 1.62859 2.42477 1.63076 3.13074C1.63076 4.51437 2.31101 5.73851 3.33659 6.45567C2.72698 6.43469 2.1314 6.26438 1.60059 5.95925V6.01206C1.60059 7.94492 2.9299 9.56936 4.67526 9.92847C4.35073 10.0235 4.01581 10.0658 3.66008 10.0658C3.41668 10.0658 3.17329 10.0447 2.9403 9.99184C3.42709 11.5857 4.84792 12.7359 6.53192 12.7676C5.18219 13.8758 3.49863 14.4798 1.76286 14.4786C1.45809 14.4786 1.14397 14.468 0.849609 14.4258C2.59376 15.6038 4.64212 16.2314 6.73682 16.2298Z" fill="white" />
                                </svg>
                            </div>
                            <div className="hover:scale-125 transition-all duration-500 ease-in-out">

                                <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.2724 1.70144C15.9888 1.08248 14.634 0.640943 13.2421 0.387873C13.2294 0.385308 13.2162 0.387044 13.2045 0.392831C13.1927 0.398619 13.183 0.408161 13.1768 0.420088C13.0035 0.745362 12.8104 1.16832 12.6757 1.50191C11.1749 1.26267 9.64821 1.26267 8.14737 1.50191C7.99642 1.13209 7.82617 0.771286 7.6374 0.421127C7.63099 0.4096 7.62142 0.400363 7.60994 0.394617C7.59847 0.388872 7.58561 0.386884 7.57304 0.388912C6.18106 0.641147 4.82627 1.08236 3.54278 1.70144C3.53134 1.70609 3.52162 1.71447 3.51505 1.72534C0.947368 5.75022 0.244301 9.67741 0.589893 13.5547C0.590855 13.5643 0.593629 13.5735 0.598051 13.5819C0.602474 13.5903 0.608454 13.5976 0.615639 13.6036C2.11052 14.7659 3.78273 15.6532 5.56088 16.2276C5.57337 16.2316 5.58673 16.2314 5.59914 16.2271C5.61155 16.2229 5.62239 16.2147 5.63019 16.2037C6.01143 15.657 6.35108 15.0813 6.64221 14.4765C6.64625 14.4682 6.64855 14.4591 6.64897 14.4498C6.64938 14.4405 6.6479 14.4312 6.64462 14.4225C6.64134 14.4139 6.63633 14.4061 6.62994 14.3996C6.62355 14.3931 6.61592 14.3882 6.60755 14.3851C6.07397 14.1706 5.55743 13.912 5.06279 13.6119C5.0538 13.6064 5.04623 13.5987 5.04075 13.5894C5.03527 13.5802 5.03205 13.5696 5.03136 13.5587C5.03068 13.5479 5.03255 13.537 5.03683 13.527C5.0411 13.5171 5.04763 13.5084 5.05586 13.5017C5.15983 13.4196 5.26381 13.3354 5.36283 13.2492C5.37165 13.2415 5.38236 13.2365 5.39374 13.2348C5.40511 13.2332 5.41671 13.2349 5.42719 13.2398C8.66824 14.7935 12.1776 14.7935 15.3801 13.2398C15.3906 13.2346 15.4023 13.2326 15.4139 13.234C15.4255 13.2355 15.4364 13.2404 15.4454 13.2481C15.5444 13.3344 15.6474 13.4196 15.7524 13.5017C15.7607 13.5082 15.7674 13.5168 15.7718 13.5266C15.7762 13.5365 15.7783 13.5473 15.7778 13.5582C15.7773 13.5691 15.7743 13.5796 15.769 13.589C15.7637 13.5984 15.7563 13.6062 15.7474 13.6119C15.2533 13.9143 14.7404 14.1699 14.2017 14.384C14.1934 14.3874 14.1858 14.3925 14.1795 14.3991C14.1732 14.4057 14.1683 14.4136 14.1652 14.4224C14.162 14.4311 14.1606 14.4404 14.1611 14.4498C14.1616 14.4591 14.1639 14.4682 14.168 14.4765C14.4651 15.0813 14.8047 15.656 15.178 16.2016C15.1855 16.2131 15.1962 16.2218 15.2087 16.2265C15.2211 16.2311 15.2347 16.2315 15.2474 16.2276C17.029 15.6552 18.7045 14.7678 20.2015 13.6036C20.2088 13.598 20.2149 13.5908 20.2193 13.5826C20.2237 13.5743 20.2265 13.5652 20.2273 13.5558C20.6402 9.07259 19.5351 5.17865 17.2991 1.72534C17.2935 1.7144 17.2834 1.70592 17.2724 1.70144ZM7.12644 11.1936C6.15106 11.1936 5.34699 10.2531 5.34699 9.09857C5.34699 7.94504 6.13521 7.00455 7.12644 7.00455C8.12658 7.00455 8.92273 7.95231 8.90688 9.09857C8.90688 10.2531 8.11865 11.1936 7.12644 11.1936ZM13.7075 11.1936C12.7312 11.1936 11.9281 10.2531 11.9281 9.09857C11.9281 7.94504 12.7163 7.00455 13.7075 7.00455C14.7067 7.00455 15.5028 7.95231 15.487 9.09857C15.487 10.2531 14.7067 11.1936 13.7075 11.1936Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex lg:hidden  footer-resp-margin -mt-10 items-center w-full justify-end gap-6">
                        <div>
                            <p className="text-white text-xs lg:font-medium lg:text-base opacity-60">Follow on our socials</p>
                        </div>
                        <div className="flex gap-6 items-center">
                            <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.07834 1.08025C0.889648 1.4514 0.889648 1.93702 0.889648 2.90825V7.07067C0.889648 8.0419 0.889648 8.52751 1.07834 8.89866C1.24477 9.22491 1.5102 9.4901 1.8366 9.65622C2.20775 9.84561 2.69336 9.84561 3.66459 9.84561H11.9894C12.9607 9.84561 13.4463 9.84561 13.8174 9.65622C14.1436 9.48998 14.4087 9.2248 14.575 8.89866C14.7644 8.52751 14.7644 8.0419 14.7644 7.07067V2.90825C14.7644 1.93702 14.7644 1.4514 14.575 1.08025C14.4089 0.753852 14.1437 0.488421 13.8174 0.321997C13.4463 0.133301 12.9607 0.133301 11.9894 0.133301H3.66459C2.69336 0.133301 2.20775 0.133301 1.8366 0.321997C1.51009 0.488303 1.24465 0.753746 1.07834 1.08025ZM2.72597 1.52077H12.9281C13.0025 1.52068 13.0751 1.54457 13.1349 1.58889C13.1948 1.63322 13.2388 1.69564 13.2604 1.76691C13.282 1.83818 13.2801 1.91452 13.255 1.98463C13.2299 2.05475 13.1829 2.11492 13.1209 2.15624L8.21273 5.439C8.09858 5.51535 7.96434 5.55611 7.82701 5.55611C7.68968 5.55611 7.55544 5.51535 7.44129 5.439L2.53311 2.15624C2.47114 2.11492 2.42412 2.05475 2.399 1.98463C2.37388 1.91452 2.37199 1.83818 2.39362 1.76691C2.41525 1.69564 2.45925 1.63322 2.5191 1.58889C2.57896 1.54457 2.65149 1.52068 2.72597 1.52077Z" fill="white" />
                            </svg>


                            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0945 10.9452C12.0945 10.9452 14.2696 2.16234 14.3507 0.987328L14.352 0.98606C14.352 0.8517 14.3647 0.770577 14.3647 0.70213C14.3647 0.580445 14.3507 0.472704 14.338 0.418199C14.2835 0.283839 14.229 0.243278 14.1352 0.202716C13.9324 0.135537 13.594 0.243278 13.594 0.243278C13.594 0.243278 1.60808 4.5542 0.918539 5.04094C0.770236 5.13474 0.729675 5.20319 0.703056 5.27037C0.581372 5.60753 0.946425 5.75584 0.946425 5.75584L4.04051 6.76987C4.04051 6.76987 4.16219 6.78255 4.20275 6.7572C4.90497 6.31102 11.2706 2.28403 11.6356 2.16234C11.7028 2.13572 11.7421 2.16234 11.7294 2.18896C11.5811 2.71626 6.05464 7.63434 6.05464 7.63434C6.05464 7.63434 6.02675 7.64828 6.01281 7.68884L6.00013 7.71673V7.74335L5.7162 10.8374C5.7162 11.0263 5.77071 11.3913 6.29674 10.9591C6.38242 10.8917 6.46411 10.8193 6.54137 10.7424L6.55405 10.7297C6.70806 10.5772 6.8657 10.4284 7.02684 10.2835C7.41852 9.90578 7.78357 9.59396 8.02694 9.37848C8.07515 9.34139 8.12048 9.30072 8.16257 9.2568C9.22984 9.99958 10.3643 10.8108 10.865 11.2291C10.9455 11.3111 11.0425 11.3752 11.1495 11.4171C11.2566 11.4591 11.3712 11.4779 11.4861 11.4725C11.9589 11.4598 12.0945 10.9452 12.0945 10.9452Z" fill="white" />
                            </svg>


                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.43233 11.4868C9.46196 11.4868 12.2153 7.14971 12.2153 3.39108C12.2153 3.27073 12.2153 3.15038 12.2079 3.02251C12.746 2.61845 13.2086 2.11993 13.5738 1.5505C13.0827 1.77615 12.5546 1.92659 11.9983 2.00181C12.5738 1.63885 13.0022 1.07844 13.2057 0.422233C12.6775 0.753191 12.0923 0.986366 11.4634 1.11424C11.2133 0.828168 10.9064 0.599153 10.5628 0.442278C10.2192 0.285403 9.84682 0.204228 9.47011 0.204102C7.95826 0.204102 6.72937 1.48205 6.72937 3.0526C6.72937 3.27825 6.75826 3.48886 6.80196 3.69947C4.53233 3.58664 2.51604 2.44409 1.16493 0.723104C0.921613 1.16096 0.794498 1.6555 0.796042 2.15826C0.796042 3.14361 1.28049 4.01539 2.01086 4.52611C1.57672 4.51117 1.15258 4.38989 0.77456 4.17259V4.2102C0.77456 5.58669 1.72123 6.74353 2.96419 6.99927C2.73308 7.06697 2.49456 7.09706 2.24123 7.09706C2.06789 7.09706 1.89456 7.08201 1.72863 7.0444C2.0753 8.17944 3.08715 8.99856 4.28641 9.02113C3.3252 9.81037 2.12625 10.2405 0.890116 10.2397C0.673079 10.2397 0.449376 10.2321 0.239746 10.202C1.48184 11.0409 2.94059 11.4879 4.43233 11.4868Z" fill="white" />
                            </svg>


                            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5141 1.14038C11.6 0.699592 10.6352 0.385147 9.64396 0.204923C9.63489 0.203097 9.6255 0.204333 9.61714 0.208455C9.60877 0.212576 9.60187 0.219372 9.59742 0.227866C9.47401 0.45951 9.33649 0.760722 9.24059 0.998287C8.17176 0.827909 7.08455 0.827909 6.01572 0.998287C5.90822 0.734922 5.78698 0.477972 5.65254 0.228606C5.64798 0.220396 5.64116 0.213818 5.63299 0.209727C5.62481 0.205635 5.61566 0.204219 5.6067 0.205663C4.61541 0.385293 3.65059 0.699502 2.73655 1.14038C2.7284 1.1437 2.72148 1.14966 2.7168 1.1574C0.888225 4.02373 0.387535 6.82048 0.633649 9.58171C0.634334 9.5885 0.63631 9.59508 0.639459 9.60105C0.642608 9.60703 0.646867 9.61228 0.651984 9.6165C1.71656 10.4443 2.90743 11.0761 4.17374 11.4852C4.18264 11.488 4.19216 11.4879 4.20099 11.4849C4.20983 11.4818 4.21755 11.476 4.22311 11.4682C4.49461 11.0789 4.73649 10.6689 4.94382 10.2382C4.94669 10.2323 4.94833 10.2258 4.94863 10.2191C4.94892 10.2125 4.94787 10.2059 4.94553 10.1997C4.94319 10.1936 4.93963 10.188 4.93508 10.1834C4.93053 10.1788 4.92509 10.1753 4.91914 10.173C4.53914 10.0203 4.17129 9.83618 3.81903 9.62242C3.81263 9.61852 3.80724 9.61303 3.80333 9.60643C3.79943 9.59983 3.79714 9.59232 3.79665 9.58457C3.79616 9.57682 3.7975 9.56906 3.80054 9.56198C3.80358 9.5549 3.80823 9.54872 3.81409 9.54397C3.88814 9.4855 3.96218 9.42556 4.0327 9.36413C4.03898 9.35863 4.04661 9.35509 4.05471 9.35391C4.06282 9.35274 4.07107 9.35397 4.07854 9.35747C6.38665 10.4639 8.88587 10.4639 11.1665 9.35747C11.174 9.35371 11.1823 9.35228 11.1906 9.35333C11.1988 9.35438 11.2066 9.35787 11.213 9.36339C11.2835 9.42482 11.3569 9.4855 11.4316 9.54397C11.4376 9.5486 11.4423 9.55469 11.4455 9.5617C11.4486 9.56871 11.4501 9.57643 11.4497 9.58418C11.4494 9.59192 11.4472 9.59946 11.4435 9.60613C11.4397 9.61279 11.4344 9.61839 11.4281 9.62242C11.0762 9.83778 10.7109 10.0198 10.3273 10.1723C10.3214 10.1747 10.316 10.1783 10.3115 10.183C10.307 10.1878 10.3036 10.1934 10.3013 10.1996C10.299 10.2058 10.2981 10.2125 10.2984 10.2191C10.2987 10.2258 10.3004 10.2322 10.3033 10.2382C10.5149 10.6689 10.7568 11.0781 11.0226 11.4667C11.0279 11.4749 11.0356 11.4811 11.0444 11.4844C11.0533 11.4877 11.063 11.488 11.072 11.4852C12.3408 11.0776 13.534 10.4456 14.6001 9.6165C14.6053 9.61252 14.6096 9.60742 14.6128 9.60155C14.6159 9.59568 14.6179 9.58917 14.6184 9.58245C14.9125 6.38975 14.1255 3.61668 12.5332 1.1574C12.5292 1.14961 12.522 1.14358 12.5141 1.14038ZM5.28866 7.90025C4.59404 7.90025 4.02142 7.23048 4.02142 6.40826C4.02142 5.58677 4.58276 4.917 5.28866 4.917C6.00091 4.917 6.56789 5.59195 6.5566 6.40826C6.5566 7.23048 5.99527 7.90025 5.28866 7.90025ZM9.9754 7.90025C9.28008 7.90025 8.70816 7.23048 8.70816 6.40826C8.70816 5.58677 9.2695 4.917 9.9754 4.917C10.6869 4.917 11.2539 5.59195 11.2426 6.40826C11.2426 7.23048 10.6869 7.90025 9.9754 7.90025Z" fill="white" />
                            </svg>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeaderBoard