import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import type { DataInteface, StoreKey } from '../interfaces/dataInterface';
import { useDispatch, useSelector } from 'react-redux';
import { deleteData } from '../Slice/slice';
import { Editor } from 'primereact/editor';
import { useNavigate } from 'react-router-dom';



export default function Users() {
    const [user, setUser] = useState<DataInteface[]>();
    const navigate = useNavigate()

    const selectoer = useSelector((state: StoreKey) => {
        return state.storeKey.users
    })

    useEffect(() => {
        setUser(selectoer)
    })

    const actionBodyTemplate = (rowData: DataInteface) => {
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

    const dispatch = useDispatch()

    const handleDelete = (data: DataInteface) => {
        dispatch(deleteData(data))
    }

    const editData = (data: DataInteface) => {
        navigate("/addUsers", { state: data })
    }

    return (
        <>
            <div className="main scrollbarWidth-none scrollbar-none h-[70vh] overflow-scroll w-[fit-content]">
                <div className="card">
                    <DataTable value={user}>
                        <Column field="name" header="Name"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="phone" header="Phone"></Column>
                        <Column field="password" header="Password"></Column>
                        <Column header="Action" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}