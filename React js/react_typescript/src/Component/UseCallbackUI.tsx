import React, { useEffect } from 'react';
import UseCallback from './UseCallback';

interface UseCallbackUIProps {
    props: (response: number) => void;
}

function UseCallbackUI({ props }: UseCallbackUIProps) {
    console.log('useCallBack Child component rendered!')
    return (
        <div>
            <h2>UseCallback UI Component</h2>
        </div>
    );
}

export default React.memo(UseCallbackUI);