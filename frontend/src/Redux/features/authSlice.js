import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api"

export const login = createAsyncThunk('auth/login', async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.SignIn(formValue);
        toast.success("Login Successfully")
        navigate("/")
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const Register = createAsyncThunk('auth/register', async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.SignUp(formValue);
        toast.success("Register Successfully")
        navigate("/login")
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: "",
        loading: false
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
    }
})
export default authSlice.reducer;