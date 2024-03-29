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
export const register = createAsyncThunk('auth/register', async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.SignUp(formValue);
        toast.success("Register Successfully")
        navigate("/login")
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const googlSignIn = createAsyncThunk('auth/googlSignIn', async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.googleSignIn(formValue);
        toast.success("Google Sign in Successfully")
        navigate("/")
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
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLogOut: (state, action) => {
            localStorage.clear()
            state.user = null
        }

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
        [register.pending]: (state, action) => {
            state.loading = true
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false
            // localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
            state.user = action.payload
        },
        [register.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [googlSignIn.pending]: (state, action) => {
            state.loading = true
        },
        [googlSignIn.fulfilled]: (state, action) => {
            state.loading = false
            // localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
            state.user = action.payload
        },
        [googlSignIn.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
    }
})
export const { setUser, setLogOut } = authSlice.actions

export default authSlice.reducer;