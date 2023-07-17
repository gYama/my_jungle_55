import React, { useState, useEffect } from 'react';
import TotalAndSpinCount from './TotalAndSpinCount';
import Header from './Header';
import Reel from './Reel';
import ReelWrapper from './ReelWrapper';
import SpinButton from './SpinButton';
import Title from './Title';
// import Reel from './Reel';
import './App.css';

const leftReel = ['🔔', '7', '🐯', '🍇', '🐯', '🍇', '3', '🍒', '🍇', '🐯', '🍇', '7', '🤡', '🍇', '🐯', '🍇', '🍒', '3', '🍇', '🐯', '🍇'];
const centerReel = ['🐯', '7', '🍇', '🍒', '🤡', '🐯', '3', '🍇', '🍒', '🐯', '🔔', '🍇', '🍒', '🐯', '3', '🍇', '🍒', '🐯', '🔔', '🍇', '🍒'];
const rightReel = ['🍇', '7', '3', '🔔', '🐯', '🍇', '🤡', '🔔', '🐯', '🍇', '🤡', '🔔', '🐯', '🍇', '🤡', '🔔', '🐯', '🍇', '🤡', '🔔', '🐯'];
const symbolProbabilities = {
  '🐯': 1 / 7,
  '🍇': 1 / 6,
  '🍒': 1 / 30,
  '🔔': 1 / 256,
  '🤡': 1 / 256,
  '3': 1 / 256,
  '7': 1 / 256,
};
const symbolBonuses: { [key: string]: number } = {
  '🔔': 400,
  '7': 2000,
  '🍒': 50,
  '🐯': 100,
  '🍇': 300,
  '3': 1000,
  '🤡': 500,
};

const effectiveLines = [[0,0,0],[1,1,1],[2,2,2],[0,1,2],[2,1,0]];
const testmode = true;
let mode = "";

const getSlice = (reel: string[], position: number) => {
  if (position + 3 > reel.length) {
    return [...reel.slice(position), ...reel.slice(0, 3 - (reel.length - position))];
  } else {
    return reel.slice(position, position + 3);
  }
};

const findSymbolByProbability = (probabilities: { [key: string]: number }) => {
  const randomValue = Math.random();
  let cumulativeProbability = 0.0;
  for (const symbol in probabilities) {
    cumulativeProbability += probabilities[symbol];
    if (randomValue <= cumulativeProbability) {
      return symbol;
    }
  }
  return null;
};

const getSymbolIndex = (reel: string[], symbol: string): number[] => {
  const symbolIndices: number[] = [];
  for (let i = 0; i < reel.length; i++) {
    if (reel[i] === symbol) {
      symbolIndices.push(i);
    }
  }
  return symbolIndices;
};

const getSymbolIndices = (reel: string[]): { [key: string]: number[] } => {
  const symbolIndices: { [key: string]: number[] } = {};
  for (const symbol of Object.keys(symbolProbabilities)) {
    symbolIndices[symbol] = getSymbolIndex(reel, symbol);
  }
  return symbolIndices;
};

const leftSymbolIndices = getSymbolIndices(leftReel);
const centerSymbolIndices = getSymbolIndices(centerReel);
const rightSymbolIndices = getSymbolIndices(rightReel);

const getRandomSymbolIndex = (symbolIndices: { [key: string]: number[] }, symbol: string): number => {
  const indices = symbolIndices[symbol];
  return indices[Math.floor(Math.random() * indices.length)];
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

  if(testmode){
    mode = "TEST MODE";
  }
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
    setIsMedalsVisible(false);
    setIsSpinning(true);
    setNewMedals(0);
    setLampColor("unlit");
  
    const nextSpinCount = spinCount + 1;
    setSpinCount(nextSpinCount);
    
    let drawnSymbol = findSymbolByProbability(symbolProbabilities);
    if(testmode && nextSpinCount % 3 === 0){
      const testArray = ['3','7'];
      drawnSymbol = testArray[Math.floor(Math.random() * testArray.length)];
    }
    console.log(drawnSymbol);
    const effectiveLine = effectiveLines[Math.floor(Math.random() * effectiveLines.length)];
    console.log(effectiveLine);
          
    let leftReelCounter = drawnSymbol ? getRandomSymbolIndex(leftSymbolIndices, drawnSymbol) : Math.floor(Math.random() * 21);
    let centerReelCounter = drawnSymbol ? getRandomSymbolIndex(centerSymbolIndices, drawnSymbol) : Math.floor(Math.random() * 21);
    let rightReelCounter = drawnSymbol ? getRandomSymbolIndex(rightSymbolIndices, drawnSymbol) : Math.floor(Math.random() * 21);

    if(drawnSymbol === '🍒'){
      rightReelCounter = Math.floor(Math.random() * 21);
    }

    if (testmode && nextSpinCount % 3 === 0) {
      setLampColor("lit");
    }
  
    let tmpLeftReelCounter = leftReelCounter;
    let tmpCenterReelCounter = centerReelCounter;
    let tmpRightReelCounter = rightReelCounter;

    const intervalId = setInterval(() => {
      tmpLeftReelCounter += 1;
      tmpCenterReelCounter += 1;
      tmpRightReelCounter += 1;
      setLeftReelPosition(tmpLeftReelCounter % 21);
      setCenterReelPosition(tmpCenterReelCounter % 21);
      setRightReelPosition(tmpRightReelCounter % 21);
    }, 100);
  
    setTimeout(() => {
      clearInterval(intervalId);
    
      leftReelCounter = (leftReelCounter - effectiveLine[0] + leftReel.length) % leftReel.length;
      centerReelCounter = (centerReelCounter - effectiveLine[1] + centerReel.length) % centerReel.length;
      rightReelCounter = (rightReelCounter - effectiveLine[2] + rightReel.length) % rightReel.length;
    
      const checkSymbols = [null, '3', '🍒'];
      const checkCounter = [5,6,7,14,15,16];
      if (!checkSymbols.includes(drawnSymbol) && checkCounter.includes(leftReelCounter)) {
          leftReelCounter = (leftReelCounter - 3 + leftReel.length) % leftReel.length;
      }
    
      if (drawnSymbol === null) {
        const leftSymbolsTmp = getSlice(leftReel, leftReelCounter % 21);
        const centerSymbolsTmp = getSlice(centerReel, centerReelCounter % 21);
        const rightSymbolsTmp = getSlice(rightReel, rightReelCounter % 21);
        const winningLinesTmp = [
          [leftSymbolsTmp[0], centerSymbolsTmp[0], rightSymbolsTmp[0]], // top horizontal
          [leftSymbolsTmp[1], centerSymbolsTmp[1], rightSymbolsTmp[1]], // middle horizontal
          [leftSymbolsTmp[2], centerSymbolsTmp[2], rightSymbolsTmp[2]], // bottom horizontal
          [leftSymbolsTmp[0], centerSymbolsTmp[1], rightSymbolsTmp[2]], // diagonal top-left to bottom-right
          [leftSymbolsTmp[2], centerSymbolsTmp[1], rightSymbolsTmp[0]], // diagonal bottom-left to top-right
        ];
        for (const line of winningLinesTmp) {
          if (line.every((symbol, _, arr) => symbol === arr[0]) && line[0] !== '🍒') {
            rightReelCounter = (rightReelCounter + 1) % rightReel.length;
            break;
          }
        }
      }
          
      setLeftReelPosition(leftReelCounter % 21);
      setCenterReelPosition(centerReelCounter % 21);
      setRightReelPosition(rightReelCounter % 21);
    
      calculateBonus(drawnSymbol, leftReelCounter % 21, centerReelCounter % 21, rightReelCounter % 21);
      setIsSpinning(false);
    }, 3000);
  };

  const calculateBonus = (drawnSymbol:string|null, leftPosition: number, centerPosition: number, rightPosition: number) => {
    const leftSymbols = getSlice(leftReel, leftPosition);
    const centerSymbols = getSlice(centerReel, centerPosition);
    const rightSymbols = getSlice(rightReel, rightPosition);
  
    let totalBonus = 0;
  
    if (drawnSymbol === null && leftSymbols.includes('🍒')) {
      const bonus = symbolBonuses['🍒'];
      totalBonus += bonus;
    }
  
    const winningLines = [
      [leftSymbols[0], centerSymbols[0], rightSymbols[0]], // top horizontal
      [leftSymbols[1], centerSymbols[1], rightSymbols[1]], // middle horizontal
      [leftSymbols[2], centerSymbols[2], rightSymbols[2]], // bottom horizontal
      [leftSymbols[0], centerSymbols[1], rightSymbols[2]], // diagonal top-left to bottom-right
      [leftSymbols[2], centerSymbols[1], rightSymbols[0]], // diagonal bottom-left to top-right
    ];
  
    for (const line of winningLines) {
      if (line.every((symbol, _, arr) => symbol === arr[0])) {
        const bonus = symbolBonuses[line[0]];
        totalBonus += bonus;
        if (line[0] === '7' || line[0] === '3') {
          setLampColor("lit");
        }

        if (line[0] === '🍒' && leftSymbols.includes('🍒')) {
          totalBonus += bonus;
        }
      }
    }
  
    if(totalBonus > 0){
      setNewMedals(totalBonus);
      setTotal(previousTotal => previousTotal + totalBonus);
    }
  };
    
  return (
    <div className="App">
      <Header mode={mode} total={total} spinCount={spinCount} />
      <Title title="My Jungle 55" />
      <div className="reelContainer">
        <ReelWrapper>
          <Reel reelData={leftReel} position={leftReelPosition} />
          <div className={`lamp ${lampColor}`}>55</div>
        </ReelWrapper>
        <ReelWrapper>
          <Reel reelData={centerReel} position={centerReelPosition} />
          <SpinButton spinReel={spinReel} isSpinning={isSpinning} />
        </ReelWrapper>
        <ReelWrapper>
          <Reel reelData={rightReel} position={rightReelPosition} />
          {isMedalsVisible && <div className="newMedals">+{newMedals}</div>}
        </ReelWrapper>
      </div>
    </div>
  );
    
};

export default App;
