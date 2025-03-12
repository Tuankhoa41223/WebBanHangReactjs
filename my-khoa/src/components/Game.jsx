import React, { useState, useEffect } from 'react';

function Game(props) {
    const [points, setPoints] = useState(0);
    const [time, setTime] = useState(0);
    const [circles, setCircles] = useState([]);
  
    useEffect(() => {
      // Initialize circles when the game starts
      const initialCircles = createCircles();
      setCircles(initialCircles);
  
      // Start the timer
      const timer = setInterval(() => {
        setTime(prevTime => prevTime + 0.1); 
      }, 100);
  
      return () => clearInterval(timer);
    }, []);
  
    const createCircles = () => {
      // Create an array of circle objects with random positions
      return [...Array(10).keys()].map(i => ({
        id: i + 1,
        left: Math.random() * 90 + '%',
        top: Math.random() * 80 + '%',
      }));
    };
  
    const handleCircleClick = (id) => {
      setPoints(points + 1);
      setCircles(circles.filter(circle => circle.id !== id));
    };
  
    const handleRestart = () => {
      setPoints(0);
      setTime(0);
      setCircles(createCircles());
    };
  
    return (
      <div className="game-container">
        <h1>LET'S PLAY</h1>
        <div className="game-info">
          <div>Points: {points}</div>
          <div>Time: {time.toFixed(1)}s</div>
        </div>
        <button onClick={handleRestart}>Restart</button>
        <div className="game-board">
          {circles.map(circle => (
            <div
              key={circle.id}
              className="circle"
              style={{ left: circle.left, top: circle.top }}
              onClick={() => handleCircleClick(circle.id)}
            >
              {circle.id}
            </div>
          ))}
        </div>
      </div>
    );
}

export default Game;