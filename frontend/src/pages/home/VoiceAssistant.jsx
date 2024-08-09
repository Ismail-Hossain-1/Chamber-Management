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
      const response = await axios.post('https://my-chamber-ai-backend.vercel.app/api/assistant', {
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
      recognition.onstart = () => {
        console.log('Voice recognition started.');
        setListening(true)
        recognition.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          setRepeatedText(transcript);
          speakText(transcript); // Speak the recognized text
          console.log('Recognized:', transcript);
        };
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setListening(false);
        };
        recognition.onend = () => {
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
    <div className='flex flex-col items-center bg-slate-700 rounded h-5/6 p-5 ' >
      <button className='btn bg-cyan-300 text-2xl' onClick={toggleRecognition}>
        {listening ? 'Stop Talking' : 'Start Talking'}
      </button>
      <div className='bg-indigo-300 rounded-full animate-pulse p-10'>{listening && !isSpeaking && <MdOutlineSettingsVoice className='size-20 text-lime-900' />}</div>

     {listening && <div>
        <p className='bg-emerald-200 p-4 m-5 rounded-md text-xl text-wrap'>
          {repeatedText}</p>
        {isSpeaking && <p className='text-white font-bold'>Agent Speaking...</p>}
        <div className='bg-indigo-300 text-wrap relative rounded-full animate-pulse m-5 p-10'>{isSpeaking && < MdRecordVoiceOver className='size-20 text-lime-900' />}</div>

      </div> }
    </div>
  );
};

export default VoiceAssistant;
