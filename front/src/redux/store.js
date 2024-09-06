import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

// intentar obtener los datos del usuario desde local storage
const persistedUser = localStorage.getItem("user") ?
JSON.parse(localStorage.getItem("user")) : 
null;

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    },
    preloadedState: {
        user: persistedUser ? { ...persistedUser, isAuthenticated: true } : 
        { userInfo: null, isAuthenticated: false }, 
    },
});

export default store;