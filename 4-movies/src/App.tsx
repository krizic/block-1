import React from 'react';
import './App.css';
import { StartPage } from './components/StartPage';

function App() {

  const name = "Vedran!!!"

  return (
    <div className="App">
      <StartPage name={name} />
    </div>
  );
}

export default App;
