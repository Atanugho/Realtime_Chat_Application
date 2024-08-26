import { configureStore} from '@reduxjs/toolkit';
import authSliceReducer from "./Slices/AuthSlice";
import onlineUsersSliceReducer from "./Slices/OnlineUserSlice";

const store = configureStore({
    reducer: {
        auth:authSliceReducer,  
        onlineUsers:onlineUsersSliceReducer    
    },
    devTools: true
});

export default store;