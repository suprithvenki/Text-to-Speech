import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Play from "./Assets/play.png";

const App = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const textAreaRef = useRef(null);
  const voiceSelectRef = useRef(null);

  useEffect(() => {
    const speech = new SpeechSynthesisUtterance();

    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      speech.voice = availableVoices[selectedVoice]; // Set default voice
    };

    window.speechSynthesis.onvoiceschanged = updateVoices;

    // Cleanup function
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleVoiceChange = () => {
    const selectedIndex = voiceSelectRef.current.value;
    setSelectedVoice(selectedIndex);
  };

  const handleSpeak = () => {
    const speech = new SpeechSynthesisUtterance();
    speech.voice = voices[selectedVoice];
    speech.text = textAreaRef.current.value;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <div className="hero">
        <h1>
          Text To Audio <span>Translator</span>
        </h1>
        <textarea
          placeholder="Write anything here..."
          ref={textAreaRef}
        ></textarea>
        <div className="row">
          <select ref={voiceSelectRef} onChange={handleVoiceChange}>
            {voices.map((voice, index) => (
              <option key={index} value={index}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
          <button onClick={handleSpeak}>
            <img src={Play} alt="Translate" /> Translate
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
