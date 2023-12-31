import React, { useState, useEffect, useRef } from 'react';
import { background, soundOff, soundOn } from '../assets/index';

const SoundButton = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);
  const firstInteraction = useRef(true);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (firstInteraction.current) {
        audioRef.current.play();
        firstInteraction.current = false;
      }
    };

    document.addEventListener('click', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [soundEnabled]);

  return (
    <>
      <div className="mute-button absolute top-0 right-0 w-12 cursor-pointer" onClick={toggleSound}>
        <img src={soundEnabled ? soundOn : soundOff} alt="" />
      </div>
      <audio ref={audioRef} loop>
        <source src={background} type="audio/mpeg" />
      </audio>
    </>
  );
};

export default SoundButton;