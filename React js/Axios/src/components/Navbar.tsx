import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate()
    const items = [
        {
            label: 'Users',
            command: () => navigate("/")
        },
        {
            label: 'Assign User',
            command: () => navigate("/assignUser")
        },

    ];
    return (
        <div>
            <Menubar model={items} />
        </div>
    )
}
