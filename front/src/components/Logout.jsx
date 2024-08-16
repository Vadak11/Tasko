import { useNavigate } from 'react-router-dom';
export const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {

        if (localStorage.getItem("token")){

            localStorage.removeItem('token');

            navigate('/login');
        }
    };
    return (
        <>
            <button onClick={handleLogout} className={"w-full h-full text-left flex items-center p-2"}>
                <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="butt"
                    strokeLinejoin="round">
                    <path d="M10 9l-6 6 6 6"/>
                    <path d="M20 4v7a4 4 0 0 1-4 4H5"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Cerrar Sesión</span>
            </button>
        </>
    )
}