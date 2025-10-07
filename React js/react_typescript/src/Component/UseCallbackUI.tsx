import React, { useEffect } from 'react';

interface UseCallbackUIProps {
    props: (response: number) => void;
}

export default function UseCallbackUI({ props }: UseCallbackUIProps) {

    // useEffect(() => {
    //     props(2);

    // }, [props]);


    return (
        <div>

            <h2>UseCallback UI Component</h2>
        </div>
    );
}