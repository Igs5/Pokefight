import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PokeDetail =()=>{
    const handleFightClick = () => {
        navigate('/fight');
      };

    return(
        <p>
            <h1>Pokemon name and characteristics fetched by id</h1>
            <button onClick={handleFightClick}>Fight</button>
        </p>
    )
}
export default PokeDetail;