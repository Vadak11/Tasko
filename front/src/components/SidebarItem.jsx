import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const SidebarItem = ({route, svg, children}) => {
    const navigate = useNavigate();
    const handleNavigate=()=>{
        navigate(route);
    }

    return (
        <li>
            <a onClick={handleNavigate}
               className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {svg}
                <span className="flex-1 ms-3 whitespace-nowrap">{children}</span>
            </a>
        </li>
    )
}