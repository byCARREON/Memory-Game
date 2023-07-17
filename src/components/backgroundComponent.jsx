import React from 'react';
import './background.css'

const BackgroundComponent = () => {
  return (
    <div>
      <div className="background -z-50">
        {[...Array(20)].map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
    </div>
  );
};

export default BackgroundComponent;