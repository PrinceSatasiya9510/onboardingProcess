import { configureStore } from "@reduxjs/toolkit";
import Slice from "../slice/slice";

export const store = configureStore({
    reducer: {
        storeKey: Slice
    }
})

export type AppDispatch = typeof store.dispatch;