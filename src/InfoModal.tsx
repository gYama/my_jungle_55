import React, { useState } from 'react';
import './InfoModal.css';

const InfoModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="InfoModal">
      <button onClick={handleModalOpen}>Info</button>
      {isModalOpen && (
        <div className="InfoModal_content">
          <button className="InfoModal_closeButton" onClick={handleModalClose}>X</button>
          <h2>Info Content Here</h2>
          {/* Put more content here */}
        </div>
      )}
    </div>
  );
};

export default InfoModal;
