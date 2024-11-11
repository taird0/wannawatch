import './App.css';
import React from 'react';
import SeachContainer from './containers/SearchContainer';


function App() {
  return (
    <div className='app'>
      <h1>what you <span style={{color: "red"}}>wanna</span>watch?</h1>
      <SeachContainer />
    </div>
  );
}

export default App;
