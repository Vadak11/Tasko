import {SharedSidebar} from "../components/SharedSidebar.jsx";
import {ModalProyect} from "../components/ModalProyect.jsx";
import {useEffect, useState} from "react";
import api from "../config/api.js";
import {ProyectListRow} from "../components/ProyectListRow.jsx";
import {Lottie} from "../components/Lottie.jsx";

export const ProyectPannel = () => {
    const [proyects, setProyects] = useState([]);
    const [myProyects, setMyProyects] = useState([]);
    const [error, setError] = useState(null);
    const [refreshCount, setRefreshCount] = useState(0);
    const [myProyectsSelected, setMyProyectsSelected] = useState(false);
    const [loading, setLoading] = useState(true); // Estado para controlar la animación de carga
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Número de proyectos por página
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProyects = proyects.slice(indexOfFirstItem, indexOfLastItem);
    const currentMyProyects = myProyects.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(
        myProyectsSelected ? myProyects.length / itemsPerPage : proyects.length / itemsPerPage
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getProyectos = async () => {
        var proyectos = [];
        try {
            const response = await api.get(`/proyecto`)
            response.data.forEach((proyecto) => {
                if (proyecto.activo === 1) {
                    proyectos.push(proyecto);
                }
            })
            setProyects(proyectos);
            localStorage.setItem('proyectos', JSON.stringify(proyectos));
            if (proyectos.length === 0) {
                setError("No hay proyectos para mostrar");
            }
        } catch (error) {
            setError('No se pudieron cargar los proyectos');
            console.error('Error fetching projects:', error);
        }
    };

    const getMyProyects = async () => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        const userId = user.id;
        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        try {
            const response = await api.get(`/proyecto/findByUserId/${userId}`, {
                params: {userId} // Enviar userId como parámetro de consulta
            });
            console.log('Response data:', response.data); // Verifica la respuesta en la consola
            setMyProyects(response.data);
            localStorage.setItem('misProyectos', JSON.stringify(response.data));
            if (response.data.length === 0) {
                setError("No se pudieron cargar tus proyectos");
            }
        } catch (error) {
            console.error('Error fetching projects:', error.response?.data || error.message);
            setError("Error al cargar tus proyectos");
        }
    };

    const refresh = () => {
        setLoading(true); // Mostrar animación de carga al hacer clic en refrescar
        setRefreshCount((prevCount) => prevCount + 1);
    };

    useEffect(() => {
        console.log('Fetching projects...');
        const fetchProjects = async () => {
            await Promise.all([getProyectos(), getMyProyects()]);
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
                            Proyectos
                        </p>
                    </div>
                    <div className="p-2 shadow-lg border-t-2 border-gray-100 rounded-lg">
                        <div className="sm:flex items-center justify-between">
                            <div className="flex items-center">
                                <a
                                    onClick={() => {
                                        setMyProyectsSelected(false);
                                        setCurrentPage(1); // Reinicia la página a 1
                                    }}
                                    className={`cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800`}
                                >
                                    <div
                                        className={`py-2 px-8 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ${!myProyectsSelected ? "bg-indigo-100 text-indigo-700" : ""}`}>
                                        <p>Todos</p>
                                    </div>
                                </a>
                                <a
                                    onClick={() => {
                                        setMyProyectsSelected(true);
                                        setCurrentPage(1); // Reinicia la página a 1
                                    }}
                                    className="cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                                >
                                    <div
                                        className={`py-2 px-8 hover:text-indigo-700 hover:bg-indigo-100 rounded-full  ${myProyectsSelected ? "bg-indigo-100 text-indigo-700" : ""}`}>
                                        <p>Mis Proyectos</p>
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
                                <ModalProyect onClick={refresh} modalButtonText="Nuevo Proyecto"/>
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
                                ) : myProyectsSelected ? (
                                    currentMyProyects.length > 0 ? (
                                        currentMyProyects.map((proyecto) => (
                                            <ProyectListRow
                                                onClick={refresh}
                                                key={proyecto.id}
                                                id={proyecto.id}
                                                proyecto={proyecto}
                                                name={proyecto.nombre}
                                                description={proyecto.descripcion}
                                                endDate={proyecto.fechaFin}
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
                                ) : currentProyects.length > 0 ? (
                                    currentProyects.map((proyecto) => (
                                        <ProyectListRow
                                            onClick={refresh}
                                            key={proyecto.id}
                                            id={proyecto.id}
                                            proyecto={proyecto}
                                            name={proyecto.nombre}
                                            description={proyecto.descripcion}
                                            endDate={proyecto.fechaFin}
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
