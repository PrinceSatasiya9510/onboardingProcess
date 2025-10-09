import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Slice/slice";

export const store = configureStore({
    reducer: {
        storeKey: UserSlice,
    },
})