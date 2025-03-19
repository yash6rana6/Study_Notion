
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    loading: false,
    signupData: null,
};

try {
    const storedToken = localStorage.getItem("token");
    initialState.token = storedToken ? JSON.parse(storedToken) : null;
} catch (error) {
    console.error("Failed to parse token from localStorage", error);
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload; 
        },

        setLoading(state, action) {
            state.loading = action.payload;
        },

        setSignupData(state, action) {
            state.signupData = action.payload;
        },
    },
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;
