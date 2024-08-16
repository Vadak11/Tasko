import {SharedSidebar} from "../components/SharedSidebar.jsx";
import {ModalTask} from "../components/ModalTask.jsx";
import {useEffect, useState} from "react";
import api from "../config/api.js";
import {TaskListRow} from "../components/TaskListRow.jsx";
import {Lottie} from "../components/Lottie.jsx";

export const TaskPannel = () => {
    const [tasks, setTasks] = useState([]);
    const [myTasks, setMyTasks] = useState([]);
    const [error, setError] = useState(null);
    const [refreshCount, setRefreshCount] = useState(0);
    const [myTasksSelected, setMyTasksSelected] = useState(false);
    const [loading, setLoading] = useState(true); // Estado para controlar la animación de carga
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Número de tareas por página
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem);
    const currentMyTasks = myTasks.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(
        myTasksSelected ? myTasks.length / itemsPerPage : tasks.length / itemsPerPage
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getTareas = async () => {
        var tareas = [];
        try {
            const response = await api.get(`/tarea`)
            response.data.forEach((tarea) => {
                if (tarea.activo === 1) {
                    tareas.push(tarea);
                }
            })
            setTasks(tareas);
            localStorage.setItem('tareas', JSON.stringify(tareas));
            if (tareas.length === 0) {
                setError("No hay tareas para mostrar");
            }
        } catch (error) {
            setError('No se pudieron cargar los tareas');
            console.error('Error fetching projects:', error);
        }
    };

    const getMyTasks = async () => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        const userId = user.id;
        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        try {
            const response = await api.get(`/tarea/findByUserId/`, {
                params: {
                    userId: userId
                } // Enviar userId como parámetro de consulta
            });
            console.log('Response data:', response.data); // Verifica la respuesta en la consola
            setMyTasks(response.data);
            localStorage.setItem('misTareas', JSON.stringify(response.data));
            if (response.data.length === 0) {
                setError("No se pudieron cargar tus tareas");
            }
        } catch (error) {
            console.error('Error fetching tasks:', error.response?.data || error.message);
            setError("Error al cargar tus tareas");
        }
    };

    const refresh = () => {
        setLoading(true); // Mostrar animación de carga al hacer clic en refrescar
        setRefreshCount((prevCount) => prevCount + 1);
    };

    useEffect(() => {
        console.log('Fetching projects...');
        const fetchProjects = async () => {
            await Promise.all([getTareas(), getMyTasks()]);
            setLoading(false); // Ocultar animación de carga cuando los datos están listos
        };
        fetchProjects();
    }, [refreshCount]);

    return (
        <div className="min-h-screen w-screen">
            <SharedSidebar/>
            <div className="sm:ml-64 flex-grow overflow-auto">
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className="flex items-center justify-between pb-8">
                        <p
                            tabIndex="0"
                            className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
                        >
                            Tareas
                        </p>
                    </div>
                    <div className="p-2 shadow-lg border-t-2 border-gray-100 rounded-lg">
                        <div className="sm:flex items-center justify-between">
                            <div className="flex items-center">
                                <a
                                    onClick={() => {
                                        setMyTasksSelected(false);
                                        setCurrentPage(1); // Reinicia la página a 1
                                    }}
                                    className={`cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800`}
                                >
                                    <div
                                        className={`py-2 px-8 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ${!myTasksSelected ? "bg-indigo-100 text-indigo-700" : ""}`}>
                                        <p>Todos</p>
                                    </div>
                                </a>
                                <a
                                    onClick={() => {
                                        setMyTasksSelected(true);
                                        setCurrentPage(1); // Reinicia la página a 1
                                    }}
                                    className="cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                                >
                                    <div
                                        className={`py-2 px-8 hover:text-indigo-700 hover:bg-indigo-100 rounded-full  ${myTasksSelected ? "bg-indigo-100 text-indigo-700" : ""}`}>
                                        <p>Mis Tareas</p>
                                    </div>
                                </a>
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
                            <div className="flex items-center justify-between">
                                <ModalTask onClick={refresh} modalButtonText="Nuevo Tarea"/>
                            </div>
                        </div>
                        <div className="mt-7 overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                <tbody>
                                {loading ? (
                                    <tr className={"w-full flex items-center justify-center h-96"}>
                                        <div className={""}>
                                            <Lottie
                                                src={"https://lottie.host/34c9280e-c6ce-497c-8b35-e53b1677f297/FpAoWuD5Du.json"}></Lottie>
                                        </div>
                                    </tr>
                                ) : myTasksSelected ? (
                                    currentMyTasks.length > 0 ? (
                                        currentMyTasks.map((tarea) => (
                                            <TaskListRow
                                                onClick={refresh}
                                                key={tarea.id}
                                                id={tarea.id}
                                                tarea={tarea}
                                                priority={tarea.prioridadTarea}
                                                name={tarea.nombre}
                                                description={tarea.descripcion}
                                                endDate={tarea.fechaFin}
                                                status={tarea.estado}
                                            />
                                        ))
                                    ) : (
                                        <tr className={"w-full flex items-center justify-center h-96"}>
                                            <div className={""}>
                                                <Lottie
                                                    src={"https://lottie.host/34c9280e-c6ce-497c-8b35-e53b1677f297/FpAoWuD5Du.json"}></Lottie>
                                            </div>
                                        </tr>
                                    )
                                ) : currentTasks.length > 0 ? (
                                    currentTasks.map((tarea) => (
                                        <TaskListRow
                                            onClick={refresh}
                                            key={tarea.id}
                                            id={tarea.id}
                                            tarea={tarea}
                                            priority={tarea.prioridadTarea}
                                            name={tarea.nombre}
                                            description={tarea.descripcion}
                                            endDate={tarea.fechaFin}
                                            status={tarea.estado}
                                        />
                                    ))
                                ) : (
                                    <tr className={"w-full flex items-center justify-center h-96"}>
                                        <div className={""}>
                                            <Lottie
                                                src={"https://lottie.host/34c9280e-c6ce-497c-8b35-e53b1677f297/FpAoWuD5Du.json"}></Lottie>
                                        </div>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-2 pagination flex items-center justify-end">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 ${
                                    currentPage === index + 1
                                        ? 'bg-indigo-700 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                } transition-all duration-200 rounded-xl me-1`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
