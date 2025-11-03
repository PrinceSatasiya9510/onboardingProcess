import { useLazyQuery } from "@apollo/client/react"
import { useState } from "react"
import { LOGIN_QUERY } from "../query/login"

export default function Login() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [login, { loading, data, error }] = useLazyQuery<
        { login: string },
        { email: string; password: string }
    >(LOGIN_QUERY)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password) return
        login({ variables: { email, password } })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                Login
            </button>

            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {data?.login && <p>Token: {data.login}</p>}
        </form>
    )
}
