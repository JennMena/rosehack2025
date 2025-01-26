"use client";
import React, { useEffect, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { Timestamp } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_ASSISTANT_MESSAGE = "Hi! I'm Annette, and I'll be your interviewer today. Let’s start with a quick introduction—tell me a bit about yourself!"
const ERROR_ASSISTANT_MESSAGE = "I'm sorry, but I encountered an error. Please try again."


export type MessageRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
    content: string;
    role: MessageRole;
    createdAt?: Timestamp;
}

const ChatArea: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState('');
    const { user } = useUser();

    const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { content: message, role: 'user' }]);
            setMessage("");
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
            createdAt: Timestamp.now(),
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
                body: JSON.stringify({ question: userMessage.content, messages }),
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
                createdAt: Timestamp.now(),
            };
            setMessages((messages) => [
                ...messages,
                assistantMessage
            ]);
            console.error('Error:', error);
        }

    };

    useEffect(() => {
        if (user) {
            startNewConversation();
        }
    }, [user]);

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
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} gap-4`}>
                            <div className={`flex items-center ${msg.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                                <img
                                    src={msg.sender === 'user' ? "https://via.placeholder.com/40" : "Annetter.png"} // Update path to your user image or profile pic
                                    alt={msg.sender === 'user' ? 'User' : 'Annette'}
                                    className="w-[40px] h-[40px] rounded-full border-2 border-[#412207]"
                                />
                            </div>
                            <div
                                className={`bg-${msg.sender === 'user' ? '-[#dda15e]' : '#f7ca98'} dark:bg-${msg.sender === 'user' ? '#888' : '#555'} text-[#412207] dark:text-gray-300 text-lg  rounded-lg p-4 max-w-[70%]`}
                            >
                                {msg.text}
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
