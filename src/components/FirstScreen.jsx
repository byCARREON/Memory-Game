import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../assets/index';

import { useSpring, animated } from 'react-spring';

const FirstScreen = () => {
  const logoAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-200px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(100px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  });

  return (
    <div>
      <div className="first-screen h-screen flex justify-center items-center flex-col relative">
        <div className='rounded-lg bg-white text-center shadow-xl'>
          <animated.div style={logoAnimation} className="p-10 logo w-64">
            <img atyle={logoAnimation} className='' src={logo} alt="" />
          </animated.div>
          <animated.div style={buttonAnimation} className="pb-10 hover:animate-bounce">
            <Link
              to="/second-screen"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-2xl px-5 py-2.5 text-center mr-2 mb-2 animate-bounce"
            >
              <span>Start</span>
            </Link>
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default FirstScreen;