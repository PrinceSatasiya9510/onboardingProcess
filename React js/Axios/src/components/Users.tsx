import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsersData } from "../slice/slice";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import type { AppDispatch } from "../store/store";
import type { defaultStateInterface, UserInterface } from "../interfaces/userInterface";
import { useNavigate } from "react-router-dom";

export default function Users() {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: defaultStateInterface) => state.storeKey.Users);
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(fetchUsersData());
    }, [dispatch]);

    console.log("🚀 ~ Users ~ data:", users);


    const actionBodyTemplate = (rowData: UserInterface) => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button
                    icon="pi pi-pencil"
                    label="Edit"
                    className="p-button-sm p-button-outlined p-button-info"
                    onClick={() => editData(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    label="Delete"
                    severity="danger"
                    className="p-button-sm"
                    onClick={() => handleDelete(rowData)}
                />
            </div>
        );
    };

    const editData = (data: UserInterface) => {
        navigate("/assignUser", { state: data })
    }

    const handleDelete = (data: UserInterface) => {
        dispatch(deleteUser(data))
    }
    return (
        <div>
            <div className="main scrollbarWidth-none scrollbar-none h-[70vh] overflow-scroll w-[fit-content]">
                <div className="card">
                    <DataTable value={users}>
                        <Column field="name" header="Name"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="phone" header="Phone"></Column>
                        <Column field="address" header="Address"></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}