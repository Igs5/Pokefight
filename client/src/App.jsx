import { useState } from 'react'
import {BrowserRouter,Route, Routes, Router, Link} from "react-router-dom"
import HomePage from './components/HomePage.jsx';
import PokeList from './components/PokeList.jsx';
import PokeDetail from './components/PokeDetail.jsx';
import PokeFight from './components/PokeFight.jsx';

import './App.css'

function App() {
 

  return (
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pokelist" element={<PokeList />} />
      <Route path="/pokemon/:id" element={<PokeDetail />} />
      <Route path="/fight" element={<PokeFight />} />
    </Routes>
  
  )
}

export default App
