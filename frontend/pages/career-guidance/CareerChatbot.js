'use client';

import React, { useState, useEffect, useRef } from "react";
import { Send, XCircle, CornerDownLeft, User, Bot, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";

const CareerChatbot = () => {
    const [isClient, setIsClient] = useState(false);
    const [messages, setMessages] = useState([{
        role: 'bot',
        content: "Hello! I'm your Career Coach AI. I can help with career advice, professional development, resume tips, and job search strategies. What would you like assistance with today?"
    }]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Handle client-side initialization
    useEffect(() => {
        setIsClient(true);
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    // Auto-scroll to the bottom when new messages appear
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('chatMessages', JSON.stringify(messages));
        }
    }, [messages, isClient]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');

        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        // Show loading state
        setIsLoading(true);

        try {
            // Make API call to your backend
            const response = await fetch("http://localhost:8000/api/career-guidance/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.map(msg => ({ role: msg.role, content: msg.content }))
                }),
            });

            const data = await response.json();

            if (data.error) {
                setMessages(prev => [...prev, { role: 'bot', content: "I'm sorry, I encountered an error. Please try again later." }]);
            } else {
                setMessages(prev => [...prev, { role: 'bot', content: data.response || "I'm here to help with your career questions. Could you provide more details?" }]);
            }
        } catch (error) {
            console.error("Error communicating with chatbot API:", error);
            setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I'm having trouble connecting right now. Please try again soon." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const clearChat = () => {
        const initialMessage = {
            role: 'bot',
            content: "Hello! I'm your Career Coach AI. I can help with career advice, professional development, resume tips, and job search strategies. What would you like assistance with today?"
        };
        setMessages([initialMessage]);
        localStorage.setItem('chatMessages', JSON.stringify([initialMessage]));
    };

    // Mock messages for initial development/demo
    const generateMockResponse = (userMessage) => {
        const lowerCaseMessage = userMessage.toLowerCase();

        if (lowerCaseMessage.includes('resume') || lowerCaseMessage.includes('cv')) {
            return "For resume improvement, focus on quantifiable achievements rather than just listing responsibilities. Tailor your resume to each job application by matching keywords from the job description. Would you like specific tips for a particular section of your resume?";
        } else if (lowerCaseMessage.includes('interview')) {
            return "Preparing for interviews? Research the company thoroughly, practice the STAR method (Situation, Task, Action, Result) for behavioral questions, and prepare thoughtful questions to ask your interviewer. Is there a specific interview scenario you're concerned about?";
        } else if (lowerCaseMessage.includes('skill') || lowerCaseMessage.includes('learn')) {
            return "Continuous learning is crucial for career growth. Consider both technical and soft skills in your field. Sites like Coursera, LinkedIn Learning, and industry-specific certifications can help. What specific skills are you looking to develop?";
        } else if (lowerCaseMessage.includes('salary') || lowerCaseMessage.includes('negotiation')) {
            return "When negotiating salary, research industry standards using sites like Glassdoor and PayScale. Highlight your value with specific achievements, and consider the entire compensation package, not just base salary. Would you like tips on how to start the negotiation conversation?";
        } else {
            return "I'm focused on helping with your career development questions. Could you share more details about your professional goals or challenges you're facing in your career journey?";
        }
    };

    return (
        <>
            {/* Chat toggle button */}
            <button
                onClick={toggleChat}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#1F2937', // Dark gray background
                    color: '#FFFFFF', // White text/icon
                    border: 'none',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 999,
                    transition: 'transform 0.3s ease, background-color 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
            >
                {isOpen ? <XCircle size={24} /> : <MessageSquare size={24} />}
            </button>

            {/* Chat window */}
            {isOpen && (
                <div
                    className="chatbot-window"
                    style={{
                        position: 'fixed',
                        bottom: '90px',
                        right: '20px',
                        width: '350px',
                        height: '500px',
                        backgroundColor: 'hsl(var(--background))',
                        borderRadius: '12px',
                        boxShadow: '0 6px 24px hsl(var(--muted) / 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        zIndex: 998,
                        border: '1px solid hsl(var(--border))'
                    }}
                >
                    {/* Chat header */}
                    <div
                        style={{
                            padding: '16px',
                            borderBottom: '1px solid hsl(var(--border))',
                            backgroundColor: '#1F2937', // Dark gray background
                            color: '#FFFFFF', // White text
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Bot size={20} />
                            <span>Career Coach AI</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={clearChat}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#FFFFFF', // White text
                                    cursor: 'pointer',
                                    opacity: 0.8,
                                    padding: '4px',
                                    fontSize: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                Clear Chat
                            </button>
                            <XCircle
                                size={20}
                                onClick={toggleChat}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>

                    {/* Messages area */}
                    <div
                        className="chatbot-messages"
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            backgroundColor: 'hsl(var(--background))'
                        }}
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.role}`}
                                style={{
                                    maxWidth: '80%',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    backgroundColor: msg.role === 'user'
                                        ? 'hsl(var(--primary))'
                                        : 'hsl(var(--muted))',
                                    color: msg.role === 'user'
                                        ? 'hsl(var(--primary-foreground))'
                                        : 'hsl(var(--foreground))',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'flex-start',
                                    fontWeight: msg.role === 'bot' ? 500 : 400,
                                    lineHeight: 1.6
                                }}
                            >
                                {msg.role === 'bot' && <Bot size={16} style={{ marginTop: '4px' }} />}
                                <div style={{
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word'
                                }}>
                                    <ReactMarkdown
                                        components={{
                                            p: ({ children }) => (
                                                <p style={{ margin: '0.5em 0' }}>{children}</p>
                                            ),
                                            a: ({ children, href }) => (
                                                <a
                                                    href={href}
                                                    style={{
                                                        color: msg.role === 'user'
                                                            ? 'hsl(var(--primary-foreground))'
                                                            : 'hsl(var(--primary))',
                                                        textDecoration: 'underline'
                                                    }}
                                                >
                                                    {children}
                                                </a>
                                            ),
                                            ul: ({ children }) => (
                                                <ul style={{
                                                    marginLeft: '1.5em',
                                                    marginTop: '0.5em',
                                                    marginBottom: '0.5em'
                                                }}>
                                                    {children}
                                                </ul>
                                            ),
                                            ol: ({ children }) => (
                                                <ol style={{
                                                    marginLeft: '1.5em',
                                                    marginTop: '0.5em',
                                                    marginBottom: '0.5em'
                                                }}>
                                                    {children}
                                                </ol>
                                            ),
                                            li: ({ children }) => (
                                                <li style={{ marginBottom: '0.25em' }}>{children}</li>
                                            ),
                                            code: ({ children }) => (
                                                <code style={{
                                                    backgroundColor: msg.role === 'user'
                                                        ? 'hsl(var(--primary-foreground) / 0.2)'
                                                        : 'hsl(var(--muted-foreground) / 0.2)',
                                                    padding: '0.2em 0.4em',
                                                    borderRadius: '4px',
                                                    fontSize: '0.9em'
                                                }}>
                                                    {children}
                                                </code>
                                            )
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                                {msg.role === 'user' && <User size={16} style={{ marginTop: '4px' }} />}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="typing-dots" style={{
                                alignSelf: 'flex-start',
                                backgroundColor: 'hsl(var(--muted))',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                color: 'hsl(var(--foreground))'
                            }}>
                                <span className="dot" style={{ animationDelay: '0s' }}>•</span>
                                <span className="dot" style={{ animationDelay: '0.2s' }}>•</span>
                                <span className="dot" style={{ animationDelay: '0.4s' }}>•</span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input area */}
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            padding: '12px',
                            borderTop: '1px solid hsl(var(--border))',
                            backgroundColor: 'hsl(var(--background))',
                            display: 'flex',
                            gap: '8px'
                        }}
                    >
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about career development..."
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                borderRadius: '20px',
                                border: '1px solid hsl(var(--border))',
                                outline: 'none',
                                fontSize: '14px',
                                resize: 'none',
                                backgroundColor: 'hsl(var(--background))',
                                color: 'hsl(var(--foreground))',
                                lineHeight: '1.5',
                                maxHeight: '100px',
                                minHeight: '44px'
                            }}
                            rows={1}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            style={{
                                backgroundColor: 'hsl(var(--primary))',
                                color: 'hsl(var(--primary-foreground))',
                                borderRadius: '50%',
                                width: '44px',
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'none',
                                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                                opacity: input.trim() && !isLoading ? 1 : 0.6,
                                flexShrink: 0
                            }}
                            title="Send message"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Add styling for typing dots animation */}
            <style jsx global>{`
                .typing-dots {
                    display: flex;
                }
                .typing-dots .dot {
                    font-size: 24px;
                    line-height: 10px;
                    margin-right: 3px;
                    animation: blink 1.5s infinite;
                }
                @keyframes blink {
                    0% { opacity: 0.2; }
                    20% { opacity: 1; }
                    100% { opacity: 0.2; }
                }
                .chatbot-messages a {
                    color: hsl(var(--primary));
                    text-decoration: underline;
                }
                .chatbot-messages ul, .chatbot-messages ol {
                    margin-left: 20px;
                }
            `}</style>
        </>
    );
};

export default CareerChatbot;