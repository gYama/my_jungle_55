import React from 'react';
import TotalAndSpinCount from './TotalAndSpinCount';

interface HeaderProps {
  mode: string;
  carnivalGamesLeft: string;
  total: number;
  spinCount: number;
}

const Header: React.FC<HeaderProps> = ({mode, carnivalGamesLeft, total, spinCount}) => (
  <div className="header">
    <div className="mode">
      <span>{mode} {carnivalGamesLeft}</span>
    </div>
    <TotalAndSpinCount total={total} spinCount={spinCount}/>
  </div>
);

export default Header;
