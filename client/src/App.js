import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './features/auth/home';
import { Route, Routes } from 'react-router-dom';
import Login from './features/auth/Login'
import Public from './components/Public';
import Layout from './components/Layout';
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import Prefetch from './features/auth/Prefetch'
import DashLayout from './components/DashLayout'
import Booking from './features/booking/BookingRoom';
import ViewAllRoomBook from './features/booking/ViewAllRoomBook';
import EditBooking from './features/booking/EditBooking';
import DeleteBooking from './features/booking/DeleteBooking';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<HomePage />} />

              </Route>
              {/* Booking routes */}
              <Route path="/booking" element={<Booking />} />
              <Route path="/viewroom" element={<ViewAllRoomBook />} />
              <Route path="/edit-booking/:id" element={<EditBooking />} />
              <Route path="/delete-booking/:id" element={<DeleteBooking />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
