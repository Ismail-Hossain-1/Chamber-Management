import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Assistant = () => {
    const [listening, setListening] = useState(false);
    const [record, setRecord] = useState(false);
    const [stt, setStt] = useState('');
    const [recognition, setRecognition] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false)


    const audioInstance = new Audio();

    const handleButton = () => {
        if (!record) {
            startRecognition();
        } else {
            stopRecognition();
        }
        setRecord(!record);
    };

    const startRecognition = () => {
        if (recognition) {
            recognition.start();
            setListening(true);
        }
    };

    const stopRecognition = () => {
        if (recognition) {
            recognition.stop();
            setListening(false);
        }
    };

    useEffect(() => {

        const initRecognition = () => {
            if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
                const recognition = new window.webkitSpeechRecognition();
                recognition.onstart = () => {
                    console.log('Voice recognition started.');
                    setListening(true);
                };
                recognition.onresult = async (event) => {
                    const transcript = event.results[event.results.length - 1][0].transcript;
                    setStt(transcript);
                    console.log('Recognized:', transcript);
                    await speakText(transcript)
                   
                };
                recognition.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                };
                recognition.onend = () => {
                    console.log('Voice recognition ended.');
                    //startRecognition()
                };
                setRecognition(recognition); // Set the recognition object in state
            } else {
                console.error('SpeechRecognition API not supported.');
            }
        };

        initRecognition();

        return () => {
            if (recognition) {
                recognition.stop();
            }
        };

    }, [record]);


    const speakText = async (text) => {
        setIsSpeaking(true);
        try {
            const response = await axios.post('https://smart-assistant-backend.vercel.app/api/texttospeech', {
                text: text,
                langcode: 'en-gb', // Replace with your desired language code
                name: 'en-GB-Studio-B', // Replace with your desired voice name
            });
            const base64Audio = response.data.base64Audio;
            audioInstance.src = `data:audio/mpeg;base64, ${base64Audio}`;
            audioInstance.play().catch(err => {
                console.error('playback failed', err);
            })

            audioInstance.addEventListener('ended', () => {
                setIsSpeaking(false)
                if (record) {
                    startRecognition()
                }
            })

        } catch (error) {
            console.error('Error fetching or playing TTS:', error);
            setIsSpeaking(false);
        }

    };


    return (
        <div>
            <button type='button' className='btn' onClick={handleButton}>
                {record ? 'Stop' : 'Start'}
            </button>
            <div className='p-5 m-5 btn'>{listening ? 'Listening...' : <div> {stt}</div>}</div>
        </div>
    );
};

export default Assistant;
