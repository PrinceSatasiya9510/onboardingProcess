import React, { useEffect, useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { InputNumber, type InputNumberChangeEvent } from "primereact/inputnumber";
import { useDispatch } from 'react-redux';
import { assignUser, editUserData } from '../slice/slice';
import type { AppDispatch } from '../store/store';
import type { UserInterface } from "../interfaces/userInterface"
import { useLocation, useNavigate } from 'react-router-dom';

interface FormData {
    id: number;
    name: string;
    email: string;
    phone: number | null;
    address: string;
}

const initialFormState: FormData = {
    id: 1,
    name: '',
    email: '',
    phone: null,
    address: ''
};

type eventType = React.ChangeEvent<HTMLInputElement> | InputNumberChangeEvent;

export default function AssignUser() {
    const [formData, setFormData] = useState<FormData>(initialFormState);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const location = useLocation()
    let editUser = location.state as (UserInterface & { id: number }) | null

    useEffect(() => {
        if (editUser) {
            setFormData({
                id: editUser.id,
                name: editUser.name,
                email: editUser.email,
                phone: editUser.phone,
                address: editUser.address
            });
        }
    }, [editUser]);


    const handleChange = (e: eventType, fieldName: keyof FormData) => {
        let newValue: string | number | null = null;
        if ('target' in e && e.target instanceof HTMLInputElement) {
            newValue = e.target.value;
        }
        else if ('value' in e) {
            newValue = e.value;
        }
        if (newValue !== null || (e as InputNumberChangeEvent).value === null) {
            setFormData(prevData => ({
                ...prevData,
                [fieldName]: newValue
            }));
        }
    };

    const handleSubmit = () => {
        if (editUser) {
            dispatch(editUserData(formData))
            editUser = null
        } else {
            const finalData = { ...formData, id: Date.now().toString() }
            dispatch(assignUser(finalData))
        }
        navigate("/")
    };

    return (
        <>
            <div className="mainContainer w-[fit-content] flex flex-col">

                <div className="card mt-5 hidden ml-5 flex justify-content-center">
                    <InputNumber
                        value={formData.id}
                        placeholder="id"
                    />
                </div>

                <div className="card mt-5 ml-5 flex justify-content-center">
                    <InputText
                        value={formData.name}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'name')}
                        placeholder="Name"
                    />
                </div>

                <div className="card mt-2 ml-5 flex justify-content-center">
                    <InputText
                        value={formData.email}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'email')}
                        placeholder="Email"
                    />
                </div>

                <div className="card mt-2 ml-5 flex justify-content-center">
                    <InputNumber
                        value={formData.phone}
                        useGrouping={false}
                        onChange={(e) => handleChange(e, 'phone')}
                        placeholder="Phone"
                    />
                </div>

                <div className="card mt-2 ml-5 flex justify-content-center">
                    <InputText
                        value={formData.address}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'address')}
                        placeholder="Address"
                    />
                </div>

                <div className="ml-5 mt-2">
                    <Button
                        label="Submit"
                        className="w-32 ml-5"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </>
    )
}