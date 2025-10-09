import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DataInteface } from "../interfaces/dataInterface";

interface UserState {
    users: DataInteface[];
}

const updateLocalStorage = (users: DataInteface[]) => {
    try {
        localStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
        console.error("Could not update local storage:", error);
    }
};

const getInitialUserState = (): UserState => {
    let localData = localStorage.getItem("users");

    if (localData) {
        try {
            const users = JSON.parse(localData);
            if (Array.isArray(users)) {
                return { users };
            }
        } catch (error) {
            console.error("Error parsing local storage data:", error);
        }
    }

    const defaultUsers: DataInteface[] = [{
        id: 9,
        name: 'abc',
        email: "abc@example",
        phone: 45454,
        password: "abc@123"
    }];

    updateLocalStorage(defaultUsers);

    return { users: defaultUsers };
}

const initialState: UserState = getInitialUserState();

export const UserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<DataInteface>) => {
            state.users.push(action.payload);
            updateLocalStorage(state.users);
        },
        deleteData: (state, action: PayloadAction<DataInteface>) => {
            state.users = state.users.filter(e => e.id !== action.payload.id)
            updateLocalStorage(state.users)
        },
        updateData: (state, action: PayloadAction<DataInteface>) => {
            let findIndex = state.users.findIndex(e => e.id == action.payload.id)
            state.users.splice(findIndex, 1, action.payload)
            updateLocalStorage(state.users)
        }
    }
});

export const { addUser, deleteData, updateData } = UserSlice.actions
export default UserSlice.reducer