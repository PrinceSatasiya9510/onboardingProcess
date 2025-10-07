import { useMemo, useState } from 'react';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';

const largeArray = new Array(50_00_000).fill(0).map((_, index) => {

    return index === 49_99_999 ? true : false;
});

const performHeavyComputation = (arr: boolean[]) => {
    const result = arr.map(el => !el);
    console.log("🚀 ~ performHeavyComputation ~ result:", result)
    return result;
};

export default function UseMemo() {
    const [count, setCount] = useState<number>(0);
    const options = ['Off', 'On'];
    const [value, setValue] = useState(options[0]);
    const [state, setState] = useState("useMemo are off");

    useMemo(() => {
        return performHeavyComputation(largeArray);
    }, [value == "On" ? null : count]);

    const Increment = () => {
        setCount(prevCount => prevCount + 1);
    }

    return (
        <div>
            <h1>{state}</h1>
            <SelectButton
                value={value}
                onChange={(e) => {
                    const newValue = e.value;
                    setValue(newValue);
                    setState(newValue === "On" ? "useMemo is on" : "useMemo are off");
                }}
                options={options}
            />
            <h1>Count: {count}</h1>
            <Button onClick={Increment} label='Increment' />
        </div>
    );
}