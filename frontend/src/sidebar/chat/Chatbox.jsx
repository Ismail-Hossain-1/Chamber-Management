import axios from 'axios';
import React, { useRef, useEffect } from 'react';

const Chatbox = ({ messages, setMessages, handleMessageSubmit, inputMessage, setInputMessage }) => {
  const messageContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on initial load and whenever messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Example: Add the new message to the messages state
    const newMessage = {
      text: inputMessage,
      type: 'sent', // Assuming sent messages for this example
    };

    const doctor = JSON.parse(localStorage.getItem('auth-user')).user;

    setMessages([...messages, newMessage]);

    const response = await axios.post('https://my-chamber-ai-backend.vercel.app/api/chat', { prompt: inputMessage, doctor: doctor })
    //console.log(response);
    const res = {
      text: response.data,
      type: 'received'
    };
    setMessages(prevMessages => [...prevMessages, res]);
    scrollToBottom(); // Scroll to bottom after adding a new message

    setInputMessage(''); // Clear the input field
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white rounded-lg  overflow-hidden">
      <div ref={messageContainerRef} className="flex-1 py-4 overflow-y-auto" style={{ minHeight: '0' }}>
        {messages.length === 0 ? (
          <p className="text-center text-gray-400">Nothing to show here <br/>Chat Powered by Gemini </p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`flex justify-${message.type === 'sent' ? 'end' : 'start'} my-2`}>
              {message.type === 'sent' ? (
                <div className={`px-4 py-2 sm:max-w-xs md:max-w-md bg-blue-500 text-white rounded-lg`}>
                  {message.text}
                </div>
              ) : (
                <div className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-lg`}>
                  {message.text}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className='absolute bottom-0 w-full flex-wrap'>
        <form onSubmit={handleSubmit} className="flex  flex-wrap fixed rounded-xl items-center bg-white border-t border-gray-200">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="border border-black top-0 flex-1 px-4 py-2 rounded-lg text-stone-500 font-semibold focus:outline-none bg-emerald-200 h-12 text-wrap"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500  hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
