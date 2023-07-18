import React from 'react';

interface TitleProps {
  title: string;
  version: string;
  openChangeLog: () => void;
}

const Title: React.FC<TitleProps> = ({ title, version, openChangeLog }) => (
  <div className="titleContainer">
    <div className="title">{title}</div>
    <div className="version" onClick={openChangeLog}>{version}</div>
  </div>
);

export default Title;
