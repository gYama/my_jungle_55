import React, { ReactNode } from 'react';

interface ReelWrapperProps {
    children: ReactNode;
}

const ReelWrapper: React.FC<ReelWrapperProps> = ({children}) => (
    <div className="reelWrapper">
      {children}
    </div>
);
  
export default ReelWrapper;
