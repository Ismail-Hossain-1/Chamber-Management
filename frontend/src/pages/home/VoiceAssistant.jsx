import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { MdRecordVoiceOver } from "react-icons/md";
import { MdOutlineSettingsVoice } from "react-icons/md";

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [repeatedText, setRepeatedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  let recognition = null;

  const audioInstance = new Audio();
  const toggleRecognition = () => {
    setListening(prev => {
      const newListening = !prev;
      //console.log("Toggle listening: ", newListening);

      if (recognition) {
        if (newListening && !isSpeaking) {
          recognition.start(); // Start only if not already running
        } else {
          recognition.stop(); // Stop when toggling off
        }
      }
      return newListening;
    });
  };

  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new window.webkitSpeechRecognition();
  }
  else {
    console.error('SpeechRecognition API not supported.');
  }



  const speakText = async (text) => {
    setIsSpeaking(true);

    const doctor = JSON.parse(localStorage.getItem('auth-user')).user;
    try {
      const response = await axios.post('http://localhost:5001/api/assistant', {
        text: text,
        langcode: 'en-gb', // Replace with your desired language code
        name: 'en-GB-Studio-B',
        doctor: doctor // Replace with your desired voice name
      });

      //console.log(response)
      const base64Audio = response.data.base64Audio;
      audioInstance.src = `data:audio/mpeg;base64, ${base64Audio}`;
      audioInstance.play().catch(err => {

        console.error('playback failed', err);
      })

      audioInstance.addEventListener('ended', () => {
        setIsSpeaking(false)
        recognition.start()
      })

    } catch (error) {
      console.error('Error fetching or playing TTS:', error);
      setIsSpeaking(false);
    }

  };

  useEffect(() => {
    // Initialize SpeechRecognition object
    if (true) {
      recognition.onstart = async () => {
        console.log('Voice recognition started.');
        setListening(true)
        recognition.onresult = async (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          setRepeatedText(transcript);
          speakText(transcript); // Speak the recognized text
          console.log('Recognized:', transcript);
        };
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setListening(false);
        };
        recognition.onend = async () => {
          console.log('Voice recognition ended.');
          if (listening && !isSpeaking) {
            recognition.start(); // Restart recognition if it was previously active
          }
        };
      }

      // Initialize AudioContext for Text-to-Speech
      return () => {
        // Clean up SpeechRecognition and AudioContext
        if (recognition) {
          recognition.stop();
        }
      };
    }
  }, [isSpeaking, speakText, toggleRecognition]);

  return (
    <div className='flex flex-col items-center justify-center h-5/6 p-8 mt-4 bg-gray-100 rounded-lg shadow-lg'>
      <div className='w-52 h-56 mb-4'>
        <img src='/assistant.png' alt='Assistant' className='object-cover rounded-lg shadow-md' />
      </div>

      <div className='flex flex-col items-center justify-center w-full'>
        <div className='bg-indigo-600 rounded-full animate-pulse p-8 mb-2'>
          {listening && !isSpeaking && (
            <MdOutlineSettingsVoice className='text-white text-4xl' />
          )}
        </div>

        <button
          className='btn bg-blue-500 hover:bg-blue-600 text-white text-2xl font-semibold rounded-full py-2 px-6 transition duration-300 ease-in-out'
          onClick={toggleRecognition}
        >
          {listening ? 'Stop Talking' : 'Start Talking'}
        </button>

        {listening && (
          <div className='mt-6 w-full flex flex-col items-center'>
            <p className='bg-emerald-200 p-4 rounded-md text-xl text-center font-medium shadow-md'>
              {repeatedText}
            </p>

            {isSpeaking && (
              <p className='text-white font-bold mt-2'>Agent Speaking...</p>
            )}

            <div className='relative rounded-full m-0 pb-6'>
              {isSpeaking && (
                <img className='w-20 h-20 rounded-full shadow-md' src='/assistantGif.gif' alt='Assistant Animation' />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;
