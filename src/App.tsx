import React, { useState, useEffect } from 'react';
import TotalAndSpinCount from './TotalAndSpinCount';
import './App.css';

const symbolBonuses: { [key: string]: number } = {
  '🔔': 400,
  '7': 2000,
  '🍒': 200,
  '🐯': 100,
  '🍇': 300,
  '3': 1000,
  '🤡': 500,
};
const leftReel = ['🔔', '7', '🐯', '🍇', '🐯', '🍇', '3', '🍒', '🍇', '🐯', '🍇', '7', '🤡', '🍇', '🐯', '🍇', '🍒', '3', '🍇', '🐯', '🍇'];
const centerReel = ['🐯', '7', '🍇', '🍒', '🤡', '🐯', '3', '🍇', '🍒', '🐯', '🔔', '🍇', '🍒', '🐯', '3', '🍇', '🍒', '🐯', '🔔', '🍇', '🍒'];
const rightReel = ['🍇', '7', '3', '🔔', '🐯', '🍇', '🤡', '🔔', '🐯', '🍇', '🤡', '🔔', '🐯', '🍇', '🤡', '🔔', '🐯', '🍇', '🤡', '🔔', '🐯'];

const testmode = true;
let isSeven = false;

const getSlice = (reel: string[], position: number) => {
  if (position + 3 > reel.length) {
    return [...reel.slice(position), ...reel.slice(0, 3 - (reel.length - position))];
  } else {
    return reel.slice(position, position + 3);
  }
};

const App: React.FC = () => {
  const [leftReelPosition, setLeftReelPosition] = useState(0);
  const [centerReelPosition, setCenterReelPosition] = useState(0);
  const [rightReelPosition, setRightReelPosition] = useState(0);
  const [total, setTotal] = useState(0); // "Bonus" to "Total" and initial value is 0
  const [newMedals, setNewMedals] = useState(0);
  const [isMedalsVisible, setIsMedalsVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [lampColor, setLampColor] = useState("unlit");

  useEffect(() => {
    if (newMedals > 0) {
      setIsMedalsVisible(true);
      const timer = setTimeout(() => {
        setIsMedalsVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [newMedals]);

  const spinReel = () => {
    isSeven = false;
    setIsMedalsVisible(false);
    setIsSpinning(true);
    setNewMedals(0);
    setLampColor("unlit");
  
    const nextSpinCount = spinCount + 1;
    setSpinCount(nextSpinCount);
  
    let leftReelCounter = testmode && nextSpinCount % 3 === 0 ? leftReel.indexOf('7') : Math.floor(Math.random() * 21);
    let centerReelCounter = testmode && nextSpinCount % 3 === 0 ? centerReel.indexOf('7') : Math.floor(Math.random() * 21);
    let rightReelCounter = testmode && nextSpinCount % 3 === 0 ? rightReel.indexOf('7') : Math.floor(Math.random() * 21);
  
    if(testmode && nextSpinCount % 3 === 0){
      setLampColor("lit");
      isSeven = true;
    }
    const intervalId = setInterval(() => {
      leftReelCounter += 1;
      centerReelCounter += 1;
      rightReelCounter += 1;
      setLeftReelPosition(leftReelCounter % 21);
      setCenterReelPosition(centerReelCounter % 21);
      setRightReelPosition(rightReelCounter % 21);
    }, 100);
  
    setTimeout(() => {
      clearInterval(intervalId);
      // Reels should always stop on '7', on every third spin
      if (testmode && nextSpinCount % 3 === 0) {
        setLeftReelPosition(leftReel.indexOf('7'));
        setCenterReelPosition(centerReel.indexOf('7'));
        setRightReelPosition(rightReel.indexOf('7'));
      }
      calculateBonus(leftReelCounter % 21, centerReelCounter % 21, rightReelCounter % 21);
      setIsSpinning(false);
    }, 3000);
  };
    
  const calculateBonus = (leftPosition: number, centerPosition: number, rightPosition: number) => {
    const leftSymbols = getSlice(leftReel, leftPosition);
    const centerSymbols = getSlice(centerReel, centerPosition);
    const rightSymbols = getSlice(rightReel, rightPosition);

    const winningLines = [
      [leftSymbols[1], centerSymbols[1], rightSymbols[1]], // middle horizontal
      [leftSymbols[0], centerSymbols[0], rightSymbols[0]], // top horizontal
      [leftSymbols[2], centerSymbols[2], rightSymbols[2]], // bottom horizontal
      [leftSymbols[0], centerSymbols[1], rightSymbols[2]], // diagonal top-left to bottom-right
      [leftSymbols[2], centerSymbols[1], rightSymbols[0]], // diagonal bottom-left to top-right
    ];

    let totalBonus = 0; // Total bonus for this spin
    for (const line of winningLines) {
      if (line.every((symbol, _, arr) => symbol === arr[0])) {
        const bonus = symbolBonuses[line[0]];
        totalBonus += bonus;
        if (line[0] === '7') { // Changed from '3' to '7'
          setLampColor("lit");
        }
      }
    }
    if (testmode && isSeven) {
      totalBonus = 2000; 
    }
    if(totalBonus > 0){
      setNewMedals(totalBonus);
      setTotal(previousTotal => previousTotal + totalBonus); // Add to total instead of decreasing from a bonus
    }
  };

  return (
    <div className="App">
      <TotalAndSpinCount total={total} spinCount={spinCount}/>
      <div className="title">My Jungle 55</div>
      <div className="reelContainer">
        <div className="reelWrapper">
          <div className="reel">
            {getSlice(leftReel, leftReelPosition).map((symbol, i) => (
              <div key={i} className="symbol">
                {symbol}
              </div>
            ))}
          </div>
          <div className={`lamp ${lampColor}`}>55</div>
        </div>
        <div className="reelWrapper">
          <div className="reel">
            {getSlice(centerReel, centerReelPosition).map((symbol, i) => (
              <div key={i} className="symbol">
                {symbol}
              </div>
            ))}
          </div>
          <div>
            <button onClick={spinReel} disabled={isSpinning}>
              SPIN
            </button>
          </div>
        </div>
        <div className="reelWrapper">
          <div className="reel">
            {getSlice(rightReel, rightReelPosition).map((symbol, i) => (
              <div key={i} className="symbol">
                {symbol}
              </div>
            ))}
          </div>
          <div>
            {isMedalsVisible && <div className="newMedals">+{newMedals}</div>}
          </div>
        </div>
      </div>
    </div>
  );  

};

export default App;
