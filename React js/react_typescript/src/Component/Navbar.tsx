import { Menubar } from 'primereact/menubar';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';

type NavBarObject = {
    label: string,
    command: () => void
}

export default function Navbar() {
    const navigate = useNavigate()


    const items: NavBarObject[] = [
        {
            label: 'UseState',
            command: () => navigate('/')
        },
        {
            label: 'UseEffect',
            command: () => navigate('/useEffect')

        },
        {
            label: 'UseContext',
            command: () => navigate('/useContext')

        },
        {
            label: 'UseReducer',
            command: () => navigate('/useReducer')
        },
        {
            label: 'UseMemo',
            command: () => navigate('/useMemo')
        },
        {
            label: 'UseCallback',
            command: () => navigate('/useCallback')
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}
