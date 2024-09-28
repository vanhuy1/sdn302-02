import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/about/about';
import Service from './components/services/services';
import Contact from './components/contact/contact';
import Public from './components/Public';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/home" element={<Public />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

