import { useEffect, useState } from "react"
import { GET_LOCATIONS } from "../query/book.query";
import { useMutation, useQuery } from "@apollo/client/react";
import { ADD_BOOK } from "../query/mutations";

type Book = {
    id: number;
    title: string;
    price: number;
    __typename?: string;
};

interface FetchLinksData {
    books: Book[];
}

export default function Testing() {

    const [book, setBook] = useState<Book[]>([])
    const { loading, error, data } = useQuery<FetchLinksData>(GET_LOCATIONS);

    useEffect(() => {
        if (data?.books) setBook(data.books)
    }, [data])

    if (loading) return <>Loading...</>
    if (error) return <>Error: {error.message}</>



    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {book && book.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </>
    )
}
