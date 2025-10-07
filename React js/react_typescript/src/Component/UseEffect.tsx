import { useEffect, useState } from 'react'

export default function UseEffect() {
    const [noDependency, setNoDependency] = useState<number>(0)
    const [withDependeny, setWithDependeny] = useState<number>(0)
    const [emptyDependeny, setEmptyDependeny] = useState<number>(0)

    // useEffect with an no dependency array it's run continuously.
    useEffect(() => {
        setTimeout(() => {
            setNoDependency(noDependency + 1)
        }, 1000);
    })

    // useEffect with empty dependency runs only one time.
    useEffect(() => {
        setTimeout(() => {
            setEmptyDependeny(emptyDependeny + 1)
        }, 1000);
    }, [])

    // useEffect with fill dependency runs only when state are change.
    useEffect(() => {
        setTimeout(() => {
            setWithDependeny(withDependeny + 1)
        }, 1000);
    }, [withDependeny])


    return (
        <div>
            <h1>Use Effect</h1>
            <h1> No Dependeny:- {noDependency && noDependency}</h1>
            <h1> Empty Dependeny:- {emptyDependeny && emptyDependeny}</h1>
            <h1> with Dependeny:- {withDependeny && withDependeny}</h1>
        </div>
    )
}
