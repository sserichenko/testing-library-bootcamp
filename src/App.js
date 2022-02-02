import React from 'react';
import Cards from "./components/Cards/Cards";
import cats from "./mocks/cats.json";
import './App.css';

function App() {
  return (
    <div className="container"> 
      <Cards cats={cats}/>
    </div>
  );
}

export default App;
