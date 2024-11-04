import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../features/auth/authSlice.js'
import bookingReducer from '../features/booking/BookingSlice.js'
import roomReducer from '../features/room/RoomSlice.js'
import staffReducer from '../store/staffSlice.js'
import departmentReducer from "../store/departmentSlice.js"
import profileReducer from "../store/profileSlice.js"
import billSlice from "../store/billSlice.js"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        profile: profileReducer,
        booking: bookingReducer,
        room: roomReducer,
        staff: staffReducer,
        department: departmentReducer,
        bill: billSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)