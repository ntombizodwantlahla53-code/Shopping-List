import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../components/Features/login'
import registerReducer from '../components/Features/register'
import mainReducer from '../components/Features/list'
import itemsReducer from "../components/Features/items";

export const store = configureStore({
    reducer : {
        register : registerReducer,
        login : loginReducer,
        main : mainReducer,
        items: itemsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch