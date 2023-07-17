import React, { useState, useEffect, useRef } from 'react';
import { background, soundOff, soundOn } from '../assets/index';

const SoundButton = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);
  const unmuteClicked = useRef(false);

  const toggleSound = () => {
    if (!unmuteClicked.current) {
      unmuteClicked.current = true;
      audioRef.current.play();
    }
    setSoundEnabled(!soundEnabled);
  };

  useEffect(() => {
    if (audioRef.current && !soundEnabled) {
      audioRef.current.pause();
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