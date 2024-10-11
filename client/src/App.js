import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './features/auth/home';
import { Route, Routes } from 'react-router-dom';
import Login from './features/auth/Login'
import Public from './components/Public';
import About from './components/about/About';
import Service from './components/services/services';
import Contact from './components/contact/Contact';
import Layout from './components/Layout';
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import Prefetch from './features/auth/Prefetch'
import DashLayout from './components/DashLayout'
import Booking from './features/booking/BookingRoom';
import Bill from './features/bill/Bill';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Service />} />
        <Route path="contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<HomePage />} />

              </Route>
              {/* Booking routes */}
              <Route path="/booking" element={<Booking />} />
              <Route path='/bill' element={<Bill />} />

            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
