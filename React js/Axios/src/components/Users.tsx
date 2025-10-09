import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "../slice/slice";
import type { AppDispatch } from "../store/store";
import type { defaultStateInterface, UserInterface } from "../interfaces/userInterface";

export default function Users() {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: defaultStateInterface) => state.storeKey.Users);

    useEffect(() => {
        dispatch(fetchUsersData());
    }, [dispatch]);

    console.log("🚀 ~ Users ~ data:", users);

    return (
        <div>
            {users &&
                <ul>
                    {users.map((element: UserInterface) => (
                        <li key={element.id}>{element.name}</li>
                    ))}
                </ul>
            }
        </div>
    );
}