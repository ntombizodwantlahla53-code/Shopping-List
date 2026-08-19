import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './../Features/login'

export const store = configureStore({
    reducer : {
        logins : loginReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>