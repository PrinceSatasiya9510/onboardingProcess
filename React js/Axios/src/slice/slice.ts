import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { UserInterface, initialStateInterface } from "../interfaces/userInterface"

const initialState: initialStateInterface = {
    Users: [],
    isLoding: false,
    error: false
}

export const fetchUsersData = createAsyncThunk("fetchData", async () => {
    const response = await axios.get("http://localhost:3000/data")
    const data: UserInterface[] = response.data
    console.log("🚀 ~ response.data:", response.data)
    return data
})

export const assignUser = createAsyncThunk("assignUser", async (action: UserInterface) => {
    const response = await axios.post("http://localhost:3000/data", action);
    return response.data as UserInterface;
})

export const deleteUser = createAsyncThunk("deleteUser", async (action: UserInterface) => {
    const response = await axios.delete(`http://localhost:3000/data/${action.id}`);
    return response.data as UserInterface;
})

export const editUserData = createAsyncThunk("editUserData", async (action: UserInterface) => {
    const response = await axios.put(`http://localhost:3000/data/${action.id}`, action);
    return response.data as UserInterface;
})

export const Slice = createSlice({
    name: "slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsersData.pending, (state) => {
            state.isLoding = true
            state.error = false
        })
        builder.addCase(fetchUsersData.fulfilled, (state, action) => {
            if (state.Users) {
                state.Users = action.payload
            }
            state.isLoding = false
            state.error = false
        })
        builder.addCase(fetchUsersData.rejected, (state) => {
            state.isLoding = false
            state.error = true
        })
        builder.addCase(assignUser.fulfilled, (state, action: PayloadAction<UserInterface>) => {
            if (state.Users) {
                state.Users.push(action.payload)
            }
            state.isLoding = false
            state.error = false
        })
        builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<UserInterface>) => {
            if (state.Users) {
                state.Users = state.Users.filter(e => e.id !== action.payload.id)
            }
            state.isLoding = false
            state.error = false
        })
        builder.addCase(editUserData.fulfilled, (state, action: PayloadAction<UserInterface>) => {
            if (state.Users) {
                let dataIndex = state.Users.findIndex(e => e.id == action.payload.id)
                state.Users.splice(dataIndex, 1, action.payload)
            }
            state.isLoding = false
            state.error = false
        })
    },
})

export default Slice.reducer