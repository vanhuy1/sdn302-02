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
import RegisterForm from './features/users/RegisterForm';
import ViewAllRoomBook from './features/booking/ViewAllRoomBook';
import EditBooking from './features/booking/EditBooking';
import UserList from './features/users/';
import UpdateUser from './features/users/UpdateUser';
import Bill from './features/bill/Bill';

import ViewAllRoom from './features/room/ViewAllRooms';
import ViewAllCategory from './features/room/ViewAllCategory'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<RegisterForm />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Service />} />
        <Route path="contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>


                <Route index element={<HomePage />} />

                <Route path='users'>
                  <Route index elements={<UserList />} />
                  <Route path=':id' element={<UpdateUser />} />

                </Route>


              </Route>
              {/* Booking routes */}
              <Route path="/booking" element={<Booking />} />
              <Route path="/viewroom" element={<ViewAllRoomBook />} />
              <Route path="/edit-booking/:id" element={<EditBooking />} />
              <Route path='/bill' element={<Bill />} />
              {/* Manage room routes */}
              <Route path='/room' element={<ViewAllRoom />} />
              <Route path='/category' element={<ViewAllCategory />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
