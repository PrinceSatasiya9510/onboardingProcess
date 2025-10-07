// eslint-disable-next-line no-unused-vars
import { useReducer } from 'react'
import { initialState, reducer } from '../reducers/countReducers'
import { Button } from 'primereact/button';

export default function UseReducer() {
    const [count, dispatch] = useReducer(reducer, initialState)
    return (
        <>
            <h1>{count}</h1>
            <Button label='1' onClick={() => dispatch(1)} />
            <Button label='10' onClick={() => dispatch(10)} />
            <Button label='100' onClick={() => dispatch(100)} />
        </>
    )
}