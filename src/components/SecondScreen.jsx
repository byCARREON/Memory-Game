import React, { useState, useEffect } from 'react';
import Card from './Card';
import SoundBtn from './SoundBtn';
import AudioPlayer from 'react-audio-player';
import { moon, comet, sun, star, incorrect, correct, ticking } from '../assets/index';
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const SecondScreen = () => {
  const [items, setItems] = useState([
    // Initial state for the items array
    // Each object represents a card item
    // The array is sorted randomly using Math.random() - 0.5
    { id: 1, name: 'comet', img: comet, stat: '', disabled: false },
    { id: 1, name: 'comet', img: comet, stat: '', disabled: false },
    { id: 2, name: 'moon', img: moon, stat: '', disabled: false },
    { id: 2, name: 'moon', img: moon, stat: '', disabled: false },
    { id: 3, name: 'star', img: star, stat: '', disabled: false },
    { id: 3, name: 'star', img: star, stat: '', disabled: false },
    { id: 4, name: 'sun', img: sun, stat: '', disabled: false },
    { id: 4, name: 'sun', img: sun, stat: '', disabled: false }
  ].sort(() => Math.random() - 0.5));

  // State variables
  const [prev, setPrev] = useState(-1);
  const [disableClicks, setDisableClicks] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [matchSound, setMatchSound] = useState(false);
  const [timer, setTimer] = useState(30);
  const [playTick, setPlayTick] = useState(false);
  const [gameResolved, setGameResolved] = useState(false);
  const [gameFailed, setGameFailed] = useState(false);

  let interval;

  useEffect(() => {
    interval = setInterval(() => { 
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timer === 10) {
      setPlayTick(true);
    }
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(interval);
      setGameFailed(true);
    }
  }, [timer]);

  function check(current) {
    if (items[current].id === items[prev].id) {
      // If the selected card matches the previous card
      items[current].stat = 'correct';
      items[prev].stat = 'correct';
      setItems([...items]);
      setPrev(-1);
      setShowModal(true); 
      setMatchSound(true); 
      // Update the card statuses, show the modal, and play the match sound effect

      setTimeout(() => {
        setShowModal(false);
        setMatchSound(false); 
        // After a delay, hide the modal and stop the match sound effect
        
        const resolved = items.every((item) => item.stat === 'correct');
        // Check if all cards have been matched (resolved)
        if (resolved) {
          setGameResolved(true);
          // If all cards have been matched, set the gameResolved state variable to true
        }
      }, 1000);
    } else {
      // If the selected card does not match the previous card
      items[current].stat = 'wrong';
      items[prev].stat = 'wrong';
      setItems([...items]);
      setDisableClicks(true); 
      setShowModal(true); 
      // Update the card statuses, disable further clicks, and show the modal

      setTimeout(() => {
        const updatedItems = items.map((item, index) => {
          if (index === current || index === prev) {
            return { ...item, stat: '' };
          }
          return item;
        });
        // Reset the status of the selected card and the previous card
        setItems(updatedItems);
        setPrev(-1);
        setDisableClicks(false);
        setShowModal(false); 
        // Update the card statuses, enable clicks, and hide the modal
      }, 1000);
    }
  }

  function handleClick(id) {
    // Check if the clicked card is not disabled and clicks are not disabled
    if (!items[id].disabled && !disableClicks) {
      items[id].stat = 'active';
      setItems([...items]);
      // Update the clicked card's status to 'active'
      if (prev === -1) {
        setPrev(id);
        // If there is no previous card selected, set the current card as the previous card
      } else {
        const updatedItems = items.map((item, index) => {
          if (index === id) {
            return { ...item, disabled: true };
          }
          return item;
        });
        // Disable the clicked card

        setItems(updatedItems);
        check(id);
        // Update the card statuses, disable the clicked card, and call the check function
      }
    }
  }

  function resetGame() {
    setItems([
      { id: 1, name: 'comet', img: comet, stat: '', disabled: false },
      { id: 1, name: 'comet', img: comet, stat: '', disabled: false },
      { id: 2, name: 'moon', img: moon, stat: '', disabled: false },
      { id: 2, name: 'moon', img: moon, stat: '', disabled: false },
      { id: 3, name: 'star', img: star, stat: '', disabled: false },
      { id: 3, name: 'star', img: star, stat: '', disabled: false },
      { id: 4, name: 'sun', img: sun, stat: '', disabled: false },
      { id: 4, name: 'sun', img: sun, stat: '', disabled: false }
    ].sort(() => Math.random() - 0.5));
    // Reset the items array with new shuffled card configurations

    setPrev(-1);
    // Reset the previous card index to -1
    setDisableClicks(false);
    setShowModal(false);
    setMatchSound(false);
    setTimer(30);
    setPlayTick(false);
    setGameResolved(false);
    setGameFailed(false);
    // Reset various game state variables to their initial values
  }

  const GameResult = ({ message, resetGame }) => {
    return (
      <div className='h-screen flex justify-center items-center flex-col'>
        <h2>{message}</h2>
        <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 hover:animate-bounce' onClick={resetGame}>
          Play Again
        </button>
      </div>
    );
  };
  
  if (gameResolved) {
    return <GameResult message="You did it!" resetGame={resetGame} />;
  }
  
  if (gameFailed) {
    return <GameResult message="Oops! You didn't find them all" resetGame={resetGame} />;
  }

  return (
    <div className='overflow-hidden'>
      <SoundBtn />
      <div className='first-screen h-screen flex justify-center items-center flex-col'>
        <div className="container mx-auto grid grid-cols-4 gap-4">
          {items.map((item, index) => (
            <Card
              key={index}
              item={item}
              id={index}
              handleClick={handleClick}
              disabled={item.disabled}
            />
          ))}
        </div>
        <Popup open={showModal} closeOnDocumentClick={false}>
          <div className="modal bg-white rounded-lg shadow-lg p-4 text-center">
            {matchSound ? (
              <>
                <h2 className="text-2xl mb-4">Nice! It's a match</h2>
                <AudioPlayer src={correct} autoPlay />
              </>
            ) : (
              <>
                <h2 className="text-2xl mb-4">Sorry, but this is not a match</h2>
                <AudioPlayer src={incorrect} autoPlay />
              </>
            )}
          </div>
        </Popup>
        {playTick && <AudioPlayer src={ticking} autoPlay />}
        <div className='text-2xl'>{timer > 0 ? `${timer} seconds left` : "Time's up!"}</div>
      </div>
    </div>
  );
};

export default SecondScreen;