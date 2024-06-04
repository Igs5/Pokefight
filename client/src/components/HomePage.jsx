import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/pokelist');
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Pokémon App</h1>
      <button onClick={handleButtonClick}>Go to Pokémon List</button>
    </div>
  );
};

export default HomePage;