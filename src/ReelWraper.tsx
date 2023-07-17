import React from 'react';

interface ReelWrapperProps {
    children: string[];
}

const ReelWrapper: React.FC<ReelWrapperProps> = ({children}) => (
    <div className="reelWrapper">
      {children}
    </div>
  );
  