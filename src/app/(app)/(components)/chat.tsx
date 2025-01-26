"use client";
import React, { useEffect, useState } from 'react';
import { MdSend } from 'react-icons/md';

export type MessageRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
    content: string;
    role: MessageRole;
}


interface ChatAreaProps {
    message: string;
    messages: ChatMessage[];
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    user: any;
    sendMessages: () => Promise<void>;
    setChatStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatArea: React.FC<ChatAreaProps> = ({ message, messages, setMessages, setMessage, user, sendMessages, setChatStarted }) => {
    const userImage = user?.imageUrl;

    const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
        setChatStarted(true);
    };

    const handleSendMessage = async () => {
        if (message.trim()) {
            setMessages([...messages]);
            setMessage("");
        }
        await sendMessages();
    };


    return (
        <div className="relative w-full max-w-4xl mx-auto px-4 py-8 mt-20">

            {/* Chat Header */}
            <div className="text-[#412207] dark:text-gray-300 text-3xl font-normal  mb-4">
                Let's practice
            </div>

            {/* Chat Messages */}
            <div className="bg-[#f3f3f3] dark:bg-[#444] p-4 rounded-lg h-[400px] overflow-auto">
                <div className="flex flex-col gap-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-4`}>
                            <div className={`flex items-center ${msg.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                                <img
                                    src={msg.role === 'user' ? userImage : "Annette.png"} 
                                    alt={msg.role === 'user' ? 'User' : 'Annette'}
                                    className="w-[40px] h-[40px] rounded-full border-2 border-[#412207]"
                                />
                            </div>
                            <div
                                className={`bg-${msg.role === 'user' ? '-[#dda15e]' : '#f7ca98'} dark:bg-${msg.role === 'user' ? '#888' : '#555'} text-[#412207] dark:text-gray-300 text-lg  rounded-lg p-4 max-w-[70%]`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Input Area */}
            <div className="flex flex-row items-center gap-4 mt-4">
                <textarea
                    value={message}
                    onChange={handleMessageChange}
                    className="w-full h-20 p-4 bg-[#f3f3f3] dark:bg-[#444] border border-[#606c38] rounded-lg text-lg text-[#412207] dark:text-gray-300  resize-none"
                    placeholder="Type your message..."
                ></textarea>
                <button
                    onClick={handleSendMessage}
                    className="bg-[#dda15e] dark:bg-[#888] text-[#412207] dark:text-gray-300  py-3 px-6 rounded-full border-4 border-[#402207] hover:bg-[#f7ca98] dark:hover:bg-[#555] flex items-center justify-center"
                >
                    <MdSend size={24} />
                </button>
            </div>
        </div>
    );
};

export default ChatArea;
