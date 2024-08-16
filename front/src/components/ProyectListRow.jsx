import {useState} from 'react';
import api from "../config/api.js";

// eslint-disable-next-line react/prop-types
export const ProyectListRow = ({onClick, id, name, description, endDate}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dateFormat = (input) => {
        const endDate = input.endDate;
        const date = new Date(endDate);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const trimText = (text) => {
        if (text.length > 15) {
            const trimText = text.slice(0, 15);
            return trimText + "...";
        } else {
            return text;
        }
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    }

    const handleEdit = () => {
        setIsDropdownOpen(prev => !prev);
    }

    const handleDelete = async () => {
        console.log(`id ${id}`);
        setIsDropdownOpen(prev => !prev);
        try {
            await api.delete(`/proyecto/`, {
                params: {
                    id: id
                }
            });
        }catch (error){
            console.log(error);
        }
        onClick();
    }
    return (
        <>
            <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded hover:bg-gray-100">
                <td className="">
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{name}</p>
                    </div>
                </td>
                <td className="pl-5">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="round">
                            <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                            <line x1="3" y1="22" x2="21" y2="22"></line>
                        </svg>
                        <p className="text-sm leading-none text-gray-600 ml-2">{trimText(description)}</p>
                    </div>
                </td>
                <td className="pl-5">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <p className="text-sm leading-none text-gray-600 ml-2">{dateFormat({endDate})}</p>
                    </div>
                </td>
                <td className="pl-5">
                    <div className="relative flex justify-center">
                        <button onClick={toggleDropdown} className="focus:ring-2 rounded-md focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="feather feather-more-vertical">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 bg-white w-24 z-50 rounded-xl shadow-xl">
                                <div
                                    tabIndex="0"
                                    className="focus:outline-none focus:text-indigo-600 w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white rounded-t-xl"
                                    onClick={handleEdit}
                                >
                                    <p>Editar</p>
                                </div>
                                <div
                                    tabIndex="0"
                                    className="focus:outline-none focus:text-indigo-600 w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white rounded-b-xl"
                                    onClick={handleDelete}
                                >
                                    <p>Eliminar</p>
                                </div>
                            </div>
                        )}
                    </div>
                </td>
            </tr>
        </>
    )
}
