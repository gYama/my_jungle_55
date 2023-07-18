import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // useNavigateを追加
import ChangeLog from './ChangeLog';
import SlotGame from './SlotGame';
import './App.css';

  const App: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<SlotGame />} /> {/* ルートパスにスロット画面を表示 */}
          <Route path="/change-log" element={<ChangeLog />} /> {/* versionがクリックされた場合にChangeLog画面を表示 */}
        </Routes>
      </Router>
    );
  };
  
export default App;
