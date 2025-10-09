import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { InputNumber } from "primereact/inputnumber";
import { useDispatch } from "react-redux";
import { addUser, updateData } from "../Slice/slice";
import { useLocation, useNavigate } from "react-router-dom";



export default function AddUsers() {
    const [id, setId] = useState<number | null>();
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<number | null>();
    const [password, setPassword] = useState<string>();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    let editData = location.state


    useEffect(() => {
        if (editData) {
            setId(editData.id)
            setName(editData.name)
            setEmail(editData.email)
            setPhone(editData.phone)
            setPassword(editData.password)
        }
    }, [location])


    const handleSubmit = () => {
        if (name && email && phone && password) {
            if (editData) {
                let editedData = { id, name, email, phone, password }
                dispatch(updateData(editedData))
                editData = null
            } else {
                let newUser = {
                    id: Date.now(),
                    name,
                    email,
                    phone,
                    password
                }
                dispatch(addUser(newUser))
            }
            navigate("/")
        }
    }


    return (
        <>
            <div className="mainContainer w-[fit-content] flex flex-col">
                <div className="card hidden mt-5 ml-5 flex justify-content-center">
                    <InputNumber value={id} onChange={(e) => setId(e.value)} placeholder="id" />
                </div>
                <div className="card mt-5 ml-5 flex justify-content-center">
                    <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                </div>
                <div className="card mt-2 ml-5 flex justify-content-center">
                    <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="card mt-2 ml-5 flex justify-content-center">
                    <InputNumber value={phone} useGrouping={false} onChange={(e) => setPhone(e.value)} placeholder="Phone" />
                </div>
                <div className="card mt-2 ml-5 flex justify-content-center">
                    <InputText value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <div className="ml-5 mt-2"><Button label="Submit" className="w-32 ml-5" onClick={() => handleSubmit()} /></div>
            </div>
        </>
    )
}
