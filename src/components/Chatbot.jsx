import { useState } from "react";
import { Coffee, Book, Globe, Users, Palette, Leaf, Clock, Utensils, User, ArrowLeft, Home, Award, BarChart, Play, FileText, Image, Lock, Star, Download, ThumbsUp, MessageSquare, Bookmark, Share2, Heart, Target, Send, X, MessageCircle } from 'lucide-react';
// Add chatbot conversation data
const CHATBOT_INITIAL_MESSAGES = [
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your Zendaya Coffee Studio assistant. How can I help you today?",
      time: '12:00 PM'
    }
  ];
  
  const QUICK_RESPONSES = [
    "How do I start a course?",
    "what events do you have ",
    "What brewing methods do you teach?",
    "Tell me about membership options",
    "I need technical support"
  ];
  
  // New Chatbot Components
  const ChatMessage = ({ message }) => (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-brown-600 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs mt-1 opacity-70">{message.time}</span>
      </div>
    </div>
  );
  
  const QuickResponse = ({ text, onClick }) => (
    <button 
      onClick={onClick}
      className="text-sm px-4 py-2 rounded-full border border-brown-600 text-brown-600 hover:bg-brown-50 whitespace-nowrap"
    >
      {text}
    </button>
  );
  
  export const ChatbotAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(CHATBOT_INITIAL_MESSAGES);
    const [newMessage, setNewMessage] = useState('');
  
    const sendMessage = (content) => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
      // Add user message
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'user',
        content,
        time: timeString
      }]);
  
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          type: 'bot',
          content: `Thanks for your message about "${content}". I'll help you with that. What specific information would you like to know?`,
          time: timeString
        }]);
      }, 1000);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newMessage.trim()) {
        sendMessage(newMessage);
        setNewMessage('');
      }
    };
  
    return (
      <>
        {/* Chat Toggle Button */}
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="fixed bottom-6 right-6 bg-[rgb(234,182,118)] text-white p-4 rounded-full shadow-lg hover:bg-brown-700 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
  
        {/* Chat Window */}
        {isOpen && (
          <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
            {/* Chat Header */}
            <div className="bg-brown-600 text-white p-4">
              <h3 className="font-semibold">Coffee Assistant</h3>
              <p className="text-sm opacity-90">Ask me anything about coffee or our courses</p>
            </div>
  
            {/* Chat Messages */}
            <div className="h-96 p-4 overflow-y-auto">
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
  
            {/* Quick Responses */}
            <div className="px-4 pb-2">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {QUICK_RESPONSES.map((response, index) => (
                  <QuickResponse 
                    key={index} 
                    text={response} 
                    onClick={() => sendMessage(response)} 
                  />
                ))}
              </div>
            </div>
  
            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-brown-600"
                />
                <button 
                  type="submit"
                  className="bg-brown-600 text-white p-2 rounded-lg hover:bg-brown-700"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </>
    );
  };