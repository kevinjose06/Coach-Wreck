import React, { useState, useRef, useEffect } from 'react';
import { Send, Brain, RefreshCw } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const sarcasticResponses = [
  "Oh sure, just quit your job and start a llama farm. What could go wrong? 🦙",
  "Have you tried ignoring all your problems until they magically disappear? Works 0% of the time, every time! ✨",
  "Why face your fears when you can just move to a different country and pretend they don't exist? 🌍",
  "Here's a wild idea: Make all your major life decisions based on what your horoscope says. Mercury retrograde energy! 🔮",
  "You know what solves everything? Buying more stuff you don't need. Retail therapy is totally a real thing, right? 💳",
  "Just ghost everyone in your life and start fresh. Social connections are overrated anyway! 👻",
  "Why communicate when you can just assume everyone can read your mind? Telepathy is the future! 🧠",
  "Pro tip: Always take advice from random strangers on the internet. We're basically certified experts! 🎓",
  "Have you considered becoming a professional couch potato? I hear Netflix is hiring! 📺",
  "Just wing it! Who needs planning when you have anxiety-induced decision making? 🦋"
];

const easterEggResponses = {
  help: "Help? I'm literally giving you the worst advice possible. You're beyond help! But hey, at least you're self-aware enough to ask! 🤷‍♀️",
  life: "Life is like a box of chocolates... if the chocolates were all expired and covered in ants. Enjoy! 🍫🐜",
  breakup: "Ah, relationship troubles? Have you tried dating your ex's best friend? Or maybe slide into their sibling's DMs? What could possibly go wrong? 💔😈"
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to Coach Wreck™! I'm here to give you the absolute worst life advice imaginable. What terrible decision can I help you make today? 😈",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Easter eggs
    if (lowerInput.includes('help')) return easterEggResponses.help;
    if (lowerInput.includes('life')) return easterEggResponses.life;
    if (lowerInput.includes('breakup') || lowerInput.includes('relationship')) return easterEggResponses.breakup;
    
    // Random sarcastic response
    return sarcasticResponses[Math.floor(Math.random() * sarcasticResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAskAgain = () => {
    if (isTyping) return;
    
    setIsTyping(true);
    setTimeout(() => {
      const randomResponse: Message = {
        id: Date.now(),
        text: sarcasticResponses[Math.floor(Math.random() * sarcasticResponses.length)],
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, randomResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-black to-gray-900 border-b border-gray-800 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-violet-400 animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Coach Wreck™
            </h1>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col">
        {/* Chat Window */}
        <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-gray-800 shadow-2xl flex-1 flex flex-col h-[60vh] md:h-[70vh]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-black scrollbar-thumb-gray-700">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[70%] p-3 rounded-lg shadow-lg ${
                    message.isBot
                      ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-300 border border-violet-500/30'
                      : 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border border-blue-500/30'
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-300 border border-violet-500/30 p-3 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-xs">Coach Wreck is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-800 bg-black/50">
            <div className="flex space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask for some terrible advice..."
                className="flex-1 bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping || !inputText.trim()}
                className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-violet-500/25 disabled:cursor-not-allowed group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                <span className="hidden sm:inline">Send</span>
              </button>
              <button
                onClick={handleAskAgain}
                disabled={isTyping}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed group"
                title="Ask Again"
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                <span className="hidden sm:inline">Ask Again</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-black to-gray-900 border-t border-gray-800 p-4 text-center">
        <p className="text-gray-400 text-sm max-w-4xl mx-auto">
          🚀 Built for fun at the Useless Projects Hackathon • Advice so bad, it's actually kinda good.
        </p>
      </footer>
    </div>
  );
}

export default App;