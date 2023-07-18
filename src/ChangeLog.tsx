// ChangeLog.tsx
import React from 'react';
import changeItems from './changelog.json'; // update this path as necessary
import './App.css';

interface ChangeItem {
  version: string;
  date: string;
  changes: string[];
}

const ChangeLog: React.FC = () => (
  <div className="changeLogContainer">
    <h1>Change Log</h1>
    {changeItems.map((item: ChangeItem, index: number) => (
      <div key={index} className="changeItem">
        <h2>{item.version} - {item.date}</h2>
        <ul>
          {item.changes.map((change, index) => (
            <li key={index}>{change}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default ChangeLog;
