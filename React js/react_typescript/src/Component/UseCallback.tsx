import { useCallback, useState } from 'react';
import { Button } from 'primereact/button';
import UseCallbackUI from './UseCallbackUI';

export default function UseCallback() {
    const [value, setValue] = useState<number[]>([]);

    const generateValue = useCallback((response: number) => {
        const newNumbers: number[] = [];
        for (let i = 0; i < response; i++) {
            let number: number = Math.floor(Math.random() * 100);
            newNumbers.push(number);
        }
        setValue(newNumbers);
        return value
    }, []);

    console.log("🚀 ~ UseCallback ~ value:", value);

    return (
        <div>
            <UseCallbackUI props={generateValue} />

            <h3>Generated Numbers:</h3>
            <ul>
                {value.map((num, index) => (
                    <li key={index}>{num}</li>
                ))}
            </ul>

            <Button
                label='Generate 5 more numbers'
                onClick={() => generateValue(5)}
                className="p-button-secondary"
            />
        </div>
    );
}