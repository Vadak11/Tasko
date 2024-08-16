import {useState} from "react";
import Swal from "sweetalert2";
import api from "../config/api.js";

// eslint-disable-next-line react/prop-types
export const ModalTask = ({onClick, modalButtonText}) => {
    const active = 1;
    const [description, setDescription] = useState("");
    const status = "SIN_ASIGNAR";
    const [endDate, setEndDate] = useState("");
    const startDate = new Date().toISOString();
    const [name, setName] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const priority = null;
    const proyectId = null;
    const _userId = null;

    const [showModal, setShowModal] = useState(false);

    const formatDate = (fecha) => {
        const fechaObj = new Date(fecha);

        const IsoFromat = new Intl.DateTimeFormat('sv-SE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).format(fechaObj);

        // Reemplazamos los espacios y comas por el formato requerido
        return IsoFromat.replace(" ", "T").replace(",", "").replace(/:/g, ":").substring(0, 19);
    };

    const saveTask = async (event) => {
        event.preventDefault();
        if ((name == null || name === "") || (description == null || description === "") || ((new Date(endDate).getTime() <= Date.now()))) {
            Swal.fire({
                title: "Rellene todos los campos",
                text: "y/o digite una fecha de finalización válida",
                icon: "info"
            });
        } else {
            try {
                const activo = active;
                const descripcion = description;
                const estado = status;
                const fechaFin = endDate;
                const fechaInicio = startDate;
                const nombre = name;
                const prioridadTarea=taskPriority;
                const prioridad = priority;
                const proyectoId = proyectId;
                const userId = _userId;

                const response = await api.post('/tarea', {
                    nombre,
                    descripcion,
                    fechaFin,
                    activo,
                    estado,
                    fechaInicio,
                    prioridad,
                    prioridadTarea,
                    proyectoId,
                    userId
                });
                console.log(response.data);
                Swal.fire({
                    title: "¡Tarea Registrada!",
                    icon: "success",
                });
                onClick();
                setShowModal(false);
            } catch (error) {
                Swal.fire({
                    title: "Ha ocurrido un error",
                    text: "Por favor comuníquese con el administrador.",
                    icon: "error"
                });
                setShowModal(false);
            }
        }
    }
    return (
        <>
            <button
                type="button"
                className="text-white bg-indigo-700 active:indigo-800 hover:bg-indigo-800 px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => setShowModal(true)}
            >
                <div className={"flex items-center justify-center"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="4" strokeLinecap="butt" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span className={"ms-2"}>{modalButtonText}</span>
                </div>
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-2/3 md:w-1/2 lg:w-1/3 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Creación de Tarea
                                    </h3>
                                </div>
                                {/*body*/}
                                <form onSubmit={saveTask}>
                                    <div className="p-4 w-full flex flex-wrap">
                                        <label htmlFor="name"
                                               className="block mb-2 text-sm font-medium text-gray-900 ">Nombre</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            name="name"
                                            id="name"
                                            className="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                            placeholder="--------"
                                            required
                                        />
                                    </div>
                                    <div className="p-4 w-full flex flex-wrap">
                                        <label htmlFor="description"
                                               className="block mb-2 text-sm font-medium text-gray-900 ">Descripción</label>
                                        <input
                                            type="text"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            name="description"
                                            id="description"
                                            className="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                            placeholder="--------"
                                            required
                                        />
                                    </div>
                                    <div className="p-4 w-full flex flex-wrap">
                                        <label htmlFor="taskPriority"
                                               className="block mb-2 text-sm font-medium text-gray-900">
                                            Prioridad
                                        </label>
                                        <select
                                            id="taskPriority"
                                            name="taskPriority"
                                            value={priority}
                                            onChange={(e) => setTaskPriority(e.target.value)}
                                            className="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                            required
                                        >
                                            <option value="" disabled>Selecciona una prioridad</option>
                                            <option value="BAJA">Baja</option>
                                            <option value="MEDIA">Media</option>
                                            <option value="ALTA">Alta</option>
                                            <option value="URGENTE">Urgente</option>
                                        </select>
                                    </div>
                                    <div className="p-4 w-full flex flex-wrap">
                                        <label htmlFor="endDate"
                                               className="block mb-2 text-sm font-medium text-gray-900 ">Fecha Estimada
                                            de Finalización</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            name="endDate"
                                            id="endDate"
                                            className="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                            placeholder="--------"
                                            required
                                        />
                                    </div>
                                    <div
                                        className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cerrar
                                        </button>
                                        <button
                                            className="bg-indigo-700 text-white active:bg-indigo-800  px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                            onClick={saveTask}
                                        >
                                            Crear Proyecto
                                        </button>
                                    </div>
                                </form>
                                {/*footer*/}

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}