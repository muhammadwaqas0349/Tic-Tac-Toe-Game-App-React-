import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [matrix, setMatrix] = useState(Array(9).fill(null)); 
  const [isXTurn, setIsXTurn] = useState(true); 
  const [won, setWon] = useState(null); 


  const handleUserClick = (e) => {
    const pos = e.target.id; 
    console.log(pos);
    const copyMatrux = [...matrix]; 
    copyMatrux[pos] =  isXTurn ? "X" : "O"; 
    setMatrix(copyMatrux); 
    setIsXTurn( (prev) => !prev); 
  }
  const decideWinner = () => {
    //winner chance 
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if(matrix[a] && 
        matrix[a] === matrix[b] &&
        matrix[a] === matrix[c]
        ){
          setWon(matrix[a]); 
        }
      
    }
    
  }

  useEffect(() => {
    decideWinner();
  }, [matrix]); 

  const resetGame = () => {
  setMatrix(Array(9).fill(null)); 
  setIsXTurn(true);    
  setWon(null);  

  }; 

  return (
    <>
    <div className="App">
      <h1>Tic Toc Toe</h1>
      <div className='board' onClick={handleUserClick}>
       {
        matrix.map( (item, index) => (
           <div key={index} id={index} className='box'>
            {item}</div>
        ))
       } 
      </div>
      
      <div className='game-info'>
        <button onClick={resetGame}>Reset</button>
        <div className='turnX'>Next Player: {isXTurn? "X" : "O"}</div>
{         won && <div className='winInfo'>Player {won} won the Game</div>
}      </div>
    </div>

      
    </>
  )
}

export default App
