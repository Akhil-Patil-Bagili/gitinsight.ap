import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import { RiChatNewLine as ChatIcon, RiMore2Fill, RiLoader4Line as SpinnerIcon } from 'react-icons/ri';
import { Appbar } from '../components/Appbar';
import '../index.css';

const quickQuestions = [
    'What is my latest commit?',
    'How many commits in the last month?',
    'Who has done the latest commit?',
    'What is the total number of commits?',
];

export const ChatBot = () => {
    const [input, setInput] = useState('');
    const [promptVisible, setPromptVisible] = useState(true);
    const [sessionOptionsVisible, setSessionOptionsVisible] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [chatSessions, setChatSessions] = useState({});
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const sessionOptionsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sessionOptionsRef.current && !sessionOptionsRef.current.contains(event.target)) {
                setSessionOptionsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNewChat = () => {
        const newSessionId = new Date().toISOString();
        setSelectedSessionId(newSessionId);
        setChatSessions({ ...chatSessions, [newSessionId]: { messages: [] } });
        setMessages([]);
        setPromptVisible(true);
    };

    const handleSelectSession = (sessionId) => {
        setSelectedSessionId(sessionId);
        setMessages(chatSessions[sessionId].messages);
        setPromptVisible(false);
        setSessionOptionsVisible(false);
    };

    const handleDeleteSession = (sessionId) => {
        const updatedSessions = { ...chatSessions };
        delete updatedSessions[sessionId];
        setChatSessions(updatedSessions);
        setMessages([]);
        setPromptVisible(true);
        setSessionOptionsVisible(false);
    };

    const handleRenameSession = (sessionId) => {
        const newName = window.prompt('Enter new name for the session:', sessionId);
        if (newName) {
            const updatedSessions = {
                ...chatSessions,
                [newName]: chatSessions[sessionId]
            };
            delete updatedSessions[sessionId];
            setChatSessions(updatedSessions);
            setSelectedSessionId(newName);
            setSessionOptionsVisible(false);
        }
    };

    const toggleSessionOptions = () => {
        setSessionOptionsVisible(!sessionOptionsVisible);
    };

    const handleQuickQuestion = async (quickQuestion) => {
        const userMessage = { text: quickQuestion, user: true };
        setMessages(messages => [...messages, userMessage]);
        setIsLoading(true);
        setPromptVisible(false); // Close quick access questions
        try {
            const response = await fetch('https://34.229.180.222/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: quickQuestion })
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            const aiMessage = { text: data.answer, user: false };
            setMessages(messages => [...messages, aiMessage]);
        } catch (error) {
            console.error('Error communicating with the API:', error);
            setMessages(messages => [...messages, { text: 'Error fetching response', user: false }]);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleQuickQuestion(input);
        setInput('');
        setPromptVisible(false); // Close quick access questions on submitting the first query
    };

    return (
        <div className="flex flex-col h-screen font-poppins">
            <Appbar />
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/4 bg-gray-100 text-black flex flex-col">
                    <div className="p-4 flex items-center justify-between border-b-2 border-gray-300 hover:bg-gray-300 cursor-pointer" onClick={handleNewChat}>
                        <h2 className="text-lg font-semibold flex items-center">
                            New Chat
                            <ChatIcon className="w-6 h-6 ml-2"/>
                        </h2>
                    </div>
                    <div className="overflow-y-auto flex-1">
                        {Object.keys(chatSessions).map((sessionId) => (
                            <div key={sessionId} className="flex justify-between p-2 hover:bg-gray-300 hover:text-black cursor-pointer">
                                <div onClick={() => handleSelectSession(sessionId)}>
                                    {sessionId}
                                </div>
                                <div className="relative">
                                    <RiMore2Fill onClick={toggleSessionOptions} className="inline w-6 h-6 ml-2"/>
                                    {sessionOptionsVisible && selectedSessionId === sessionId && (
                                        <div className="absolute right-0 bg-white shadow-lg rounded p-2" ref={sessionOptionsRef}>
                                            <div className="cursor-pointer p-1 hover:bg-gray-100" onClick={() => handleRenameSession(sessionId)}>Rename</div>
                                            <div className="cursor-pointer p-1 hover:bg-gray-100" onClick={() => handleDeleteSession(sessionId)}>Delete</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-3/4 flex flex-col">
                    {promptVisible && (
                        <div className="flex-grow flex items-center justify-center p-4">
                            <div className="text-center">
                                <div className="text-xl font-semibold mb-4">How can I help you today?</div>
                            </div>
                        </div>
                    )}
                    <div className="flex-grow overflow-y-auto">
                        {messages.map((message, index) => (
                            <div key={index} className={`p-2 ${message.user ? 'text-right' : 'text-left'}`}>
                                <span className={`inline-block p-2 rounded ${message.user ? 'bg-gray-400 text-black' : 'bg-gray-600 text-white'}`}>
                                    {message.text}
                                </span>
                            </div>
                        ))}
                        {isLoading && <div className="text-center flex justify-center"><SpinnerIcon className="animate-spin text-lg" /></div>}
                    </div>
                    {promptVisible && (
                        <div className="mb-16 px-4">
                            <div className="grid grid-cols-2 gap-4">
                                {quickQuestions.map((question, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => handleQuickQuestion(question)}
                                        className="bg-white hover:bg-gray-200 text-black font-medium py-2 px-4 rounded-lg transition ease-in-out duration-300 border-2"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="p-2 bg-white border-t-2 border-gray-200">
                        <form onSubmit={handleSubmit} className="flex">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 p-2 mr-2 rounded border-2 border-gray-300"
                                placeholder="Type your message..."
                            />
                            <button type="submit" className="p-2 bg-black text-white rounded">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
