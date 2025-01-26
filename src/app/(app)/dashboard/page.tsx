"use client";
import React, { useEffect, useState } from 'react';
import ChatArea from '../(components)/chat';
import { useUser } from '@clerk/nextjs';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/firebaseConfig';

const INITIAL_ASSISTANT_MESSAGE = "Hi! I'm Annette, and I'll be your interviewer today. Let’s start with a quick introduction—tell me a bit about yourself!"
const ERROR_ASSISTANT_MESSAGE = "I'm sorry, but I encountered an error. Please try again."


interface Context {
    company: string,
    values: string;
    position: string;
    interviewer: string;
    resume: string;
    personalinfo: string;
}

export type MessageRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
    content: string;
    role: MessageRole;
}

const DashboardPage: React.FC = () => {
    const [company, setCompany] = useState<string>("");
    const [values, setValues] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [interviewer, setInterviewer] = useState<string>("");

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState('');
    const { user } = useUser();

    const [chatStarted, setChatStarted] = useState<boolean>(false);;

    const userID = user?.id || "";

    const [context, setContext] = useState<Context | undefined>(undefined);

    const db = getFirestore(app);
    const usersDataRef = collection(db, "usersData");

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

    const contextCollection = async () => {
        try {
            console.log(userID)
            const userDoc = await getDoc(doc(usersDataRef, userID));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const context: Context = {
                    company,
                    values,
                    position,
                    interviewer,
                    resume: userData.resumeData,
                    personalinfo: userData.personalInfo,
                };
                console.log(context);
                return context;
            } else {
                console.error("No such document!");
                console.error(userID)
                const context_half: Context = {
                    company,
                    values,
                    position,
                    interviewer,
                    resume: '',
                    personalinfo: ''
                }
                return context_half
            }
        } catch (error) {
            console.error("Error getting document:", error);
        }
    };

    const startNewConversation = async () => {
        const initialAssistantMessage: ChatMessage = {
            role: 'assistant',
            content: INITIAL_ASSISTANT_MESSAGE,
        };
        setMessages([initialAssistantMessage]);

    }

    const sendMessages = async () => {
        if (!message.trim()) {
            setMessage('');
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-sm bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg shadow-lg`}
                    style={{ animationDuration: '1s' }}
                >
                    <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-yellow-800" />
                        <div className="ml-2">
                            Oops! It looks like you forgot to type something.
                        </div>
                    </div>
                </div>
            ), { duration: 1500 });
            return;
        }

        const userMessage: ChatMessage = {
            role: 'user',
            content: message,
        };

        setMessages((prevMessages) => [
            ...prevMessages,
            userMessage,
            { role: 'assistant', content: '' }
        ]);
        setMessage('');

        try {
            // Send the user's message to the API endpoint for processing
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //body: JSON.stringify({ messages: [...messages, userMessage] }),
                body: JSON.stringify({ question: userMessage.content, messages, context }),
            });

            if (!response.ok) {
                toast.error('Failed to send the message.');
                console.error('Error:', response.statusText);
                return;
            }

            const reader = response.body!.getReader(); // Create a reader to process the streamed response
            const decoder = new TextDecoder(); // Create a decoder to convert the streamed response into text
            let assistantResponse = '';

            // Process the text from the response
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const text = decoder.decode(value, { stream: true }); // Decode the streamed response
                assistantResponse += text;
                setMessages((messages) => {
                    let lastMessage = messages[messages.length - 1];  // Get the last message (assistant's placeholder)
                    let otherMessages = messages.slice(0, messages.length - 1);  // Get all other messages
                    return [
                        ...otherMessages,
                        { ...lastMessage, content: assistantResponse },  // Append the decoded text to the assistant's message
                    ]
                })
            }

        } catch (error) {
            const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: ERROR_ASSISTANT_MESSAGE,
            };
            setMessages((messages) => [
                ...messages,
                assistantMessage
            ]);
            console.error('Error:', error);
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                startNewConversation();
                if (chatStarted) {
                    const new_context = await contextCollection();
                    setContext(new_context)
                    console.log(context)

                }
            }
        };
        fetchData();
    }, [user, chatStarted]);

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
                <ChatArea
                    sendMessages={sendMessages}
                    message={message}
                    messages={messages}
                    setMessages={setMessages}
                    setMessage={setMessage}
                    user={user}
                    setChatStarted={setChatStarted}
                />
            </div>


        </div>
    );
};

export default DashboardPage;