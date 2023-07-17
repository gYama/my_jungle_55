import React from 'react';

interface SpinButtonProps {
    spinReel: () => void;
    isSpinning: boolean;
  }
  
const SpinButton: React.FC<SpinButtonProps> = ({spinReel, isSpinning}) => (
    <button onClick={spinReel} disabled={isSpinning}>
      SPIN
    </button>
  );

export default SpinButton;
