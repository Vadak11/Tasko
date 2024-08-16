import { SharedSidebar } from "../components/SharedSidebar.jsx";
import { useEffect, useState } from "react";
import api from "../config/api.js";
import { UserCard } from "../components/UserCard.jsx";

export const MemberPannel = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [refreshCount, setRefreshCount] = useState(0);

    const getUsers = async () => {
        try {
            const response = await api.get('/user');
            localStorage.setItem('users', JSON.stringify(response.data));
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            setError('No se pudieron cargar los usuarios');
            console.error('Error fetching users:', error);
        }
    }

    const refresh = () => {
        setRefreshCount(refreshCount + 1);
    }

    useEffect(() => {
        getUsers();
    }, [refreshCount]);

    // Function to chunk the users array into groups of 3
    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }

    // Get chunks of 3 users each
    const userChunks = chunkArray(users, 3);

    return (
        <div className="min-h-screen w-screen">
            <SharedSidebar/>
            <div className="sm:ml-64 flex-grow overflow-auto">
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className="flex items-center justify-between pb-8">
                        <p tabIndex="0" className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                            Usuarios
                        </p>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={refresh}
                                className="ml-4 sm:ml-8 bg-indigo-100 rounded-full hover:text-indigo-700"
                            >
                                <div className="flex items-center p-2 text-gray-500 hover:text-indigo-700 group">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="butt"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="">
                        {/* Render each chunk of users */}
                        {userChunks.map((chunk, rowIndex) => (
                            <div key={rowIndex} className="flex flex-wrap gap-4 p-4">
                                {chunk.map((user, index) => (
                                    <UserCard
                                        key={index}
                                        name={user.nombre}
                                        lastname={user.primerApellido}
                                        role={user.rol}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
