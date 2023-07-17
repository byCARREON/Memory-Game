import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstScreen from './components/FirstScreen';
import SecondScreen from './components/SecondScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstScreen />} />
        <Route path="/second-screen" element={<SecondScreen />} />
      </Routes>
    </Router>
  );
};

export default App;