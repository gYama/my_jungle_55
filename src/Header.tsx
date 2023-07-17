import React from 'react';
import TotalAndSpinCount from './TotalAndSpinCount';

interface HeaderProps {
  mode: string;
  total: number;
  spinCount: number;
}

const Header: React.FC<HeaderProps> = ({mode, total, spinCount}) => (
  <div className="header">
    <div className="mode">
      <span>{mode}</span>
    </div>
    <TotalAndSpinCount total={total} spinCount={spinCount}/>
  </div>
);

export default Header;
