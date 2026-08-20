import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../components/Features/login'
import registerReducer from '../components/Features/register'
import homeReducer from '../components/Features/list'

export const store = configureStore({
    reducer : {
        register : registerReducer,
        login : loginReducer,
        home : homeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch