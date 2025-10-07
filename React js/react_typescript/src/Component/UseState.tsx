import { useState } from 'react'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';



// The useState hook in React is a function that allows functional components
// to manage and update their own local state.It provides a way to add state 
// variables to functional components, which were previously limited to class
// components for state management.

export default function UseState() {
    const [count, setCount] = useState<number>(0)

    const Increment = (): void => {
        setCount(count + 1)
    }
    const Decrement = (): void => {
        setCount(count - 1)
    }
    return (
        <>
            <div>
                <h1>UseState</h1>
                <h2>Count:- {count && count}</h2>

                <Button label='Increment' onClick={() => Increment()} />
                <Button label='Decrement' onClick={() => Decrement()} />


            </div>
        </>
    )
}
