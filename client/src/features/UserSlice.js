import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: {},
    message: "",
    isLoading: false,
    isSuccess: false,
    isError: false
}

// ================= REGISTER =================
export const addUser = createAsyncThunk(
    "user/addUser",
    async (userData) => {
        try {
            const response = await axios.post(
                "http://localhost:3004/register",
                userData
            );

            return response.data.message;

        } catch (error) {
            console.log("Server Error.." + error);
        }
    }
);

// ================= LOGIN =================
export const login = createAsyncThunk(
    "user/login",
    async (userData) => {
        try {

            const response = await axios.post(
                "http://localhost:3004/login",
                userData
            );

            if (response.data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }

            return response.data;

        } catch (error) {
            console.log("Server Error.." + error);
        }
    }
);

export const UserSlice = createSlice({
    name: "user",

    initialState,

    reducers: {
        resetState: (state) => {
            state.message = "";
            state.isSuccess = false;
            state.isError = false;
        }
    },

    extraReducers: (builder) => {

        // ================= REGISTER =================
        builder.addCase(addUser.pending, (state) => {
            state.isLoading = true;
        })

        .addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload;
        })

        .addCase(addUser.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })

        // ================= LOGIN =================
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })

        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;

            state.user = action.payload.user;

            state.message = action.payload.message;
        })

        .addCase(login.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export const { resetState } = UserSlice.actions;
export default UserSlice.reducer;