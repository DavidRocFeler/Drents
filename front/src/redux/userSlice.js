import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    userInfo: null, 
    isAuthenticated: false
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.userInfo = action.payload;
            state.isAuthenticated = true;
            // Guardar la información del usuario en localStorage
            localStorage.setItem("user", JSON.stringify(state.userInfo));   
        },
        logout: (state) => {
            state.userInfo = null;
            state.isAuthenticated = false;
            // Eliminar la información del usuario de localStorage
            localStorage.removeItem("user");
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;