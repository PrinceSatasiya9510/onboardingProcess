import { createContext } from 'react'

export const count: number = 20
export const counter = createContext<number>(count)