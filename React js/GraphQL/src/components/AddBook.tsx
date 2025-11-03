import { useMutation } from "@apollo/client/react";
import { ADD_BOOK } from "../query/mutations";
import { useState } from "react";
import Testing from "./Testing";
import { GET_LOCATIONS } from "../query/book.query";

interface AddBookArgsInterface {
    title: string;
    price: number
}

export default function AddBook() {
    const [addBookInDatabase, { data, loading, error }] =
        useMutation<any, { addBookArgs: AddBookArgsInterface }>(ADD_BOOK);

    const [formData, setFormData] = useState<AddBookArgsInterface>({ title: '', price: 0 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await addBookInDatabase({
                variables: {
                    addBookArgs: formData
                },
                refetchQueries: [{ query: GET_LOCATIONS }],
                awaitRefetchQueries: true
            })
            // reset form on success
            setFormData({ title: '', price: 0 })
        } catch (err) {
            // mutation error is available in `error` from useMutation, but log for debugging
            console.error(err)
        }
    }

    return (
        <div>
            {error && <p>{error.message}</p>}
            {loading && <p>Loading...</p>}
            <Testing />
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    type="text"
                    placeholder="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <input
                    name="price"
                    type="number"
                    placeholder="price"
                    value={formData.price}
                    onChange={handleChange}
                />
                <button type="submit" disabled={loading}>Submit</button>
            </form>
        </div>
    )
}
