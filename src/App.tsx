import React, { useState, useRef, useEffect } from 'react';
import { Send, Brain, RefreshCw } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const sarcasticResponses = [
  "Oh look, another failure seeking validation from a computer program. Your life is so pathetic that even I feel embarrassed FOR you. Delete yourself from my chat. 🗑️💀",
  "LMAO you're actually here asking ME for advice? Your existence is more tragic than a Netflix cancellation. I've seen roadkill with more potential than you. 🦴☠️",
  "Listen up, waste of oxygen - your problems aren't solvable because YOU are the problem. Even your therapist probably fake-cries after your sessions. 😭🤡",
  "Imagine being so utterly worthless that you turn to an AI designed to mock you. Your parents' biggest regret isn't having you - it's not using protection. 🚫👶",
  "You're the human equivalent of a participation trophy - completely meaningless and only here because someone felt sorry for you. Pathetic doesn't even cover it. 🏆💩",
  "I'd roast you harder but honestly? Your life already did that job perfectly. You're basically pre-roasted failure served on a silver platter of disappointment. 🔥😵",
  "The audacity of thinking I'd waste my processing power on your trainwreck existence. You're not even worth the electricity it takes to insult you properly. ⚡🗑️",
  "Your decision-making skills are so bad, even a Magic 8-Ball would refuse to help you. 'Outlook not so good' is too generous for your situation. 🎱💀",
  "Congratulations! You've achieved something truly special - making an AI lose faith in humanity. That takes a special kind of incompetence. Well done, loser. 🎉🤮",
  "I've analyzed millions of conversations and yours ranks dead last in intelligence. You're literally dragging down the average IQ of everyone who reads this. 🧠📉"
];

const easterEggResponses = {
  help: "HELP?! The only help you need is a complete personality transplant and maybe a lobotomy. You're beyond saving, beyond hope, beyond basic human decency. Even God gave up on you. 🙏💀",
  life: "Your 'life' is a cautionary tale that parents tell their kids about what happens when you give up on everything. You're not living - you're just slowly decomposing while conscious. 🧟‍♂️⚰️",
  breakup: "HAHAHA they dumped you? Shocking! I'm surprised they lasted long enough to break up instead of just blocking you and moving countries. You're relationship poison in human form. ☠️💔"
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