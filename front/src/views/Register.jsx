// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import axios from 'axios';
import logo from '../assets/img/png/logo-no-background.png';
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validateEmail = (email) => {
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return passwordRegex.test(password);
};


const Register = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [secondLastname, setSecondLastname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRetype, setPasswordRetype] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({username: '', password: '', passwordRetype:''});

    const handleLoginRedirect = () => {
        navigate(`/login`);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);
        var valid = true;
        if (passwordRetype!==password) {
            setErrors((prevErrors) => ({...prevErrors, passwordRetype: 'La contraseña no coincide'}));
            valid = false;
        } else {
            setErrors((prevErrors) => ({...prevErrors, email: ''}));
        }
        if (!validateEmail(email)) {
            setErrors((prevErrors) => ({...prevErrors, email: 'Email no válido'}));
            valid = false;
        } else {
            setErrors((prevErrors) => ({...prevErrors, email: ''}));
        }

        if (!validatePassword(password)) {
            setErrors((prevErrors) => ({...prevErrors, password: 'Contraseña no válida'}));
            valid = false;
        } else {
            setErrors((prevErrors) => ({...prevErrors, password: ''}));
        }
        if (valid) {
            try {
                const nombre = name;
                const apellido = lastname;
                const segundoApellido = secondLastname;
                const username= email;
                const direccion = address;
                const telefono = "test";
                const activo = 1;
                const response = await axios.post('http://localhost:8080/auth/register', {
                    nombre,
                    apellido,
                    segundoApellido,
                    email,
                    direccion,
                    telefono,
                    activo,
                    username,
                    password
                });
                console.log(response.data); // Manejar el login exitoso
                Swal.fire({
                    title: "¡Registro Exitoso!",
                    icon: "success",
                });
                setLoading(false);
                handleLoginRedirect();
            } catch (error) {
                Swal.fire({
                    title: "Ha ocurrido un error",
                    text: "Por favor comuníquese con el administrador.",
                    icon: "error"
                })
                setLoading(false);
            }
        } else {
            Swal.fire({
                title: "Datos inválidos",
                text: "Verifque los datos ingresados.",
                icon: "info"
            })
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#"
                   className="flex justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-1/4" src={logo} alt="logo"/>
                </a>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Regístrate
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                            <div className="w-full flex flex-wrap">
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="--------"
                                    required
                                />
                            </div>
                            <div className="w-full flex flex-wrap">
                                <div className="w-1/2 pr-2">
                                    <label htmlFor="lastname"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                                    <input
                                        type="text"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        name="lastname"
                                        id="lastname"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="--------"
                                        required
                                    />
                                </div>
                                <div className="w-1/2 pl-2">
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Segundo
                                        Apellido
                                        <small className="ml-1 text-gray-400">(Opcional)</small>
                                    </label>
                                    <input
                                        type="text"
                                        value={secondLastname}
                                        onChange={(e) => setSecondLastname(e.target.value)}
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="--------"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="--------"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu
                                    Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                                {errors.email && <span>{errors.email}</span>}
                            </div>
                            <div className="w-full flex flex-wrap">
                                <div className={"w-1/2 pr-2"}>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                    {errors.password &&
                                        <span className={"text-red-600 italic"}>{errors.password}</span>}
                                </div>
                                <div className={"w-1/2 pl-2"}>
                                    <label htmlFor="passwordRetype"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirma
                                        tu Contraseña</label>
                                    <input
                                        type="password"
                                        value={passwordRetype}
                                        onChange={(e) => setPasswordRetype(e.target.value)}
                                        name="passwordRetype"
                                        id="passwordRetype"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                    {errors.passwordRetype &&
                                        <span className={"text-red-600 italic"}>{errors.passwordRetype}</span>}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${loading ? 'cursor-auto bg-blue-400 hover:bg-blue-400' : ''}`}>
                                {loading ? "Validando Datos..." : "Registrarme"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;