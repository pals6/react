import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cards  from './components/Cards'

function App() {
  return(
  <div>
    <h1>AI Interview Flashcards</h1>
    <p>Practice AI, ML, and CS concepts using flashcards.</p>
  

  <Cards />
  </div>
  );
}

export default App
