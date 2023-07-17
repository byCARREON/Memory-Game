function Card({ item, id, handleClick }) {
  const itemClass = item.stat ? " active " + item.stat : ""; // Add the 'active' class and the state class if available

  const handleCardClick = () => {
    if (!item.stat) {  // Only call handleClick if the item is not already flipped
      handleClick(id);
    }
  };

  return (
    <div className={`card bg-white flex justify-center items-center rounded-lg transform rotate-y-180 animate-hideCard transition-transform duration-500 cursor-pointer shadow-lg sm:h-full h-36 ${itemClass}`} onClick={handleCardClick}>
      <div className="front rounded-lg">
        <img className="max-w-80 max-h-80 transition-transform duration-500 animate-hideImage" src={item.img} alt="" />
      </div>
      <div className="back rounded-lg transform transition-all duration-400 ease-in-out hover:scale-105 text-4xl bg-sky-200 text-yellow-400">⸮</div>
    </div>
  );
}

export default Card;