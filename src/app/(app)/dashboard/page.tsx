"use client";
import React, { useState } from 'react';
import ChatArea from '../(components)/chat';

const DashboardPage: React.FC = () => {
    const [company, setCompany] = useState<string>("");
    const [values, setValues] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [interviewer, setInterviewer] = useState<string>("");

    const handleCompany = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCompany(event.target.value);
    };

    const handleValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValues(event.target.value);
    };

    const handlePosition = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPosition(event.target.value);
    };

    const handleInterviewer = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInterviewer(event.target.value);
    };

    return (
        <div className=" relative">

            {/* Top section */}
            <div className="flex flex-col justify-center items-center">
                <div className="w-full h-auto max-w-full">
                    <img src="Sparkle.png" alt="Sparkle" />
                </div>
                <div className="text-center text-[#412207] dark:text-gray-300 text-6xl p-4 font-bold font-['Lexend']">
                    Prepare for Success
                </div>
                <div className="w-full h-auto max-w-full">
                    <img src="Sparkle.png" alt="Sparkle" />
                </div>
            </div>



            {/* Info section */}
            <div className="w-full max-w-4xl mx-auto px-4 py-8">
                <div className="flex flex-col gap-6">
                    <div className="text-[#412207] dark:text-gray-300 text-3xl font-normal font-['Lexend']">
                        How it works:
                    </div>
                    <div className="text-[#412207] dark:text-gray-300 text-2xl font-light font-['Lexend']">
                        Let us assist you in preparing for your interview by guiding your research. Follow the prompts and questions to organize key information. <br></br><br></br>Based on your interests, resume, and the provided scenario details, you'll have a mock interview with our chatbot.
                    </div>
                </div>
            </div>

            {/* Annette's section */}
            <div className="relative w-full max-w-4xl mx-auto">
                <div className="w-full h-auto">
                    <img className="w-full h-auto max-w-full" src="Vine.png" alt="Vine" />
                </div>
            </div>
            <div className="relative w-full max-w-4xl mx-auto px-4 py-12 h-[300px]">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row items-center gap-6">
                        <div className='absolute right-0 z-0 mt-36 '>
                            <img className="w-[250px] h-[357.14px]" src="Annette.png" alt="Annette" />
                        </div>
                        <div className="flex flex-col">
                            <div className="absolute w-2/4 ml-[14rem]  bg-[#f7ca98] rounded-[40px] border-4 border-[#402207] p-6">
                                <span className="text-[#402207] text-2xl font-semibold font-['Lexend']">
                                    Hello, I’m Annette.
                                </span>
                                <span className="text-[#402207] text-2xl font-light font-['Lexend']">
                                    {" "} I'll be taking notes with you and helping you organize your practice.
                                </span>
                            </div>
                            <div className="absolute w-4/7 mt-40 ml-[9rem]  bg-[#dda15e] rounded-[40px] border-4 border-[#402207] p-6">
                                <span className="text-[#402207] text-xl font-light font-['Lexend']">
                                    When you're ready, I'll hold  your mock interview.
                                </span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div className="relative w-full max-w-4xl mx-auto mb-5">
                <div className="absolute inset-0 z-0">
                    <img className="w-full h-auto max-w-full" src="SparkleVine.png" alt="Vine" />
                </div>
            </div>


            {/* Main content section */}
            <div className="relative w-full max-w-4xl mx-auto px-4 py-8 mt-20 ">
                <div className="flex flex-col gap-8">
                    {/* Start with basics */}
                    <div className="flex flex-col gap-4">
                        <div className="text-[#412207] dark:text-gray-300 text-3xl font-normal font-['Lexend']">
                            Start with the essentials:
                        </div>
                        <div className="text-[#412207] dark:text-gray-300 text-2xl font-light font-['Lexend']">
                            Which company are you applying to?
                        </div>
                        <textarea
                            onChange={handleCompany}
                            className="w-full h-[100px] p-4 mt-2 bg-[#f3f3f3] dark:bg-[#444] border border-[#606c38] rounded-lg text-lg text-[#412207] dark:text-gray-300  resize-none"
                            placeholder="Enter the company's name..."
                        ></textarea>
                    </div>

                    {/* Next question */}
                    <div className="flex flex-col gap-4 mt-3">
                        <div className="text-[#412207] dark:text-gray-300 text-2xl font-light font-['Lexend']">
                            What are the core values of the company?
                        </div>
                        <textarea
                            onChange={handleValues}
                            className="w-full h-[100px] p-4 mt-2 bg-[#f3f3f3] dark:bg-[#444] border border-[#606c38] rounded-lg text-lg text-[#412207] dark:text-gray-300  resize-none"
                            placeholder="Visit the company website, and take a look at the “About” or “Meet the Team” section for insights."
                        ></textarea>
                    </div>

                    {/* Job-related question */}
                    <div className="flex flex-col gap-4 mt-3">
                        <div className="text-[#412207] dark:text-gray-300 text-2xl font-light font-['Lexend']">
                            What position are you applying for?
                        </div>
                        <textarea
                            onChange={handlePosition}
                            className="w-full h-[100px] p-4 mt-2 bg-[#f3f3f3] dark:bg-[#444] border border-[#606c38] rounded-lg text-lg text-[#412207] dark:text-gray-300  resize-none"
                            placeholder="Consider the type of candidate the company is seeking. What are the key qualifications and skills they prioritize?"
                        ></textarea>
                    </div>

                    {/* Additional question */}
                    <div className="flex flex-col gap-4 mt-3">
                        <div className="text-[#412207] dark:text-gray-300 text-2xl font-light font-['Lexend']">
                            Do you know anything about the interviewer?
                        </div>
                        <textarea
                            onChange={handleInterviewer}
                            className="w-full h-[100px] p-4 mt-2 bg-[#f3f3f3] dark:bg-[#444] border border-[#606c38] rounded-lg text-lg text-[#412207] dark:text-gray-300  resize-none"
                            placeholder="If possible, gather information such as their LinkedIn profile or articles they’ve written to tailor your responses."
                        ></textarea>
                    </div>
                </div>
            </div>

            {/*Chat Area*/}
            <div className="relative w-full max-w-4xl mx-auto">
                <div className="w-full h-auto">
                    <img className="w-full h-auto max-w-full" src="Vine.png" alt="Vine" />
                </div>
            </div>
            <div className='mt-[-5rem]'>
                <ChatArea />
            </div>


        </div>
    );
};

export default DashboardPage;