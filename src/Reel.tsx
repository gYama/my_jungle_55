import React from 'react';

interface ReelProps {
  reelData: string[];
  position: number;
}

const getSlice = (reel: string[], position: number) => {
    if (position + 3 > reel.length) {
      return [...reel.slice(position), ...reel.slice(0, 3 - (reel.length - position))];
    } else {
      return reel.slice(position, position + 3);
    }
  };
  
const Reel: React.FC<ReelProps> = ({reelData, position}) => (
  <div className="reel">
    {getSlice(reelData, position).map((symbol: string, i: number) => (
      <div key={i} className="symbol">
        {symbol}
      </div>
    ))}
  </div>
);

export default Reel;
