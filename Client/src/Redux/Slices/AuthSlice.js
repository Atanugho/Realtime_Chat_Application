import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "@/helper/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    data: (() => {
        const data = localStorage.getItem('data');
        if (data && data !== "undefined") {
          return JSON.parse(data);
        }
        return {}; 
      })(),
      
  };
  

export const createAccount = createAsyncThunk("/auth/signup", async (data) =>{
    try {
        const res = axiosInstance.post("auth/register", data);
        toast.promise(res,{
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
});

export const login = createAsyncThunk("/auth/login", async (data) =>{
    try {
        const res = axiosInstance.post("auth/login", data);
        toast.promise(res,{
            loading: "Wait! authentication in progress",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to login"
        });

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
});

export const logout = createAsyncThunk("/auth/logout", async () =>{
    try {
      const res = axiosInstance.post("/auth/logout");
      toast.promise(res, {
        loading: "Wait! logout in progress...",
        success: (data) => {
            return data?.data?.message;
        },
        error: "Failed to logout"
    });
    return (await res).data;

    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (state, action) => {
        
        const user = action?.payload?.data;
        
        if (user) {
          localStorage.setItem("data", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          state.isLoggedIn = true;
          state.data = user;
        }
      })
      .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
      })
    },
  });

export const { setSocketConnection } = authSlice.actions;

export default authSlice.reducer;