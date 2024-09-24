import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
