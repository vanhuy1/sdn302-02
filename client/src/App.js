import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HomePage from "./features/auth/home";
import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import Public from "./components/Public";
import About from "./components/about/about";
import Service from "./features/services/services";
import Contact from "./components/contact/contact";
import Layout from "./components/Layout";
import DashLayout from "./components/DashLayout";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import Prefetch from "./features/auth/Prefetch";
import Booking from "./features/booking/BookingRoom";
import RegisterForm from "./features/users/RegisterForm";
import ViewAllRoomBook from "./features/booking/ViewAllRoomBook";
import EditBooking from "./features/booking/EditBooking";
import UserList from "./features/users/UserList";
import UpdateUser from "./features/users/UpdateUser";
import Bill from "./features/bill/Bill";
import Staffs from "./features/staff/Staffs";
import StaffDetail from "./features/staff/StaffDetail";
import AddStaff from "./features/staff/AddStaff";
import ViewAllRoom from "./features/room/ViewAllRooms";
import ViewAllCategory from "./features/room/ViewAllCategory";
import ManageLayout from "./components/ManageLayout";
import ServiceList from "./features/services/manage/serviceList";
import ServiceDetail from "./features/services/manage/serviceDetail";

function App() {
  return (

    <Routes>
      <Route path='/' element={<Layout />} >
        {/* public routes */}
        <Route index element={<Public />} />


        <Route path="contact" element={<Contact />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<RegisterForm />} />
        {/* <Route path="about" element={<About />} /> */}

        {/* <Route path="contact" element={<Contact />} /> */}

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<HomePage />} />
                <Route path="about" element={<About />} />
                <Route path="booking" element={<Booking />} />
                <Route path="viewroom" element={<ViewAllRoomBook />} />
                <Route path="edit-booking/:id" element={<EditBooking />} />

                <Route path="services" element={<Service />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager]} />}>
                  <Route path='manage' element={<ManageLayout />}>

                    <Route path="users" >
                      <Route index element={<UserList />} />
                      <Route path=':id' element={<UpdateUser />} />
                    </Route>

                    <Route path='staff'>
                      <Route index element={<Staffs />} />
                      <Route path=":id" element={<StaffDetail />} />
                      <Route path="update/:id" element={<AddStaff />} />
                    </Route>

                    <Route path="room" element={<ViewAllRoom />} />
                    <Route path="category" element={<ViewAllCategory />} />

                    <Route path="service" >
                      <Route index element={<ServiceList />} />
                      <Route path=':id' element={<ServiceDetail />} />
                    </Route>



                  </Route>
                </Route>
              </Route>

            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
