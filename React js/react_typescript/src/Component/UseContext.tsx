import { useContext } from 'react'
import { counter } from '../context/context'


export default function UseContext() {


    const myCount = useContext<number>(counter)
    console.log("🚀 ~ UseContext ~ con:", myCount)
    return (
        <div>
            <h1>Use Context Hook</h1>
            <h2>Data :- {myCount && myCount}</h2>
        </div>
    )
}
