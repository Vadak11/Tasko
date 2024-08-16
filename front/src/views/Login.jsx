// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import axios from 'axios';
import logo from '../assets/img/png/logo-no-background.png';
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import api from "../config/api.js";
import {data} from "autoprefixer";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegisterRedirect = () => {
        navigate(`/register`);
    };

    const handleLogin = async (event) => {
        event.preventDefault(); // Evita que el formulario recargue la página
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/auth/login', { username, password });
            console.log(response.data);
            if (response.data.token) {
                // Almacenar el token en localStorage
                localStorage.setItem('token', response.data.token);
                // Petición para obtener los datos del usuario
                console.log(username)
                const response2 = await api.get(`/user/findByUsername/${username}`);
                localStorage.setItem('user', JSON.stringify(response2.data));
                // Redirigir al dashboard
                navigate('/proyect-pannel');
            }
            Swal.fire({
                title: "Inicio Exitoso",
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                title: "Credenciales Inválidas",
                icon: "error"
            });
        } finally {
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
                            Inicia Sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu
                                    Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu
                                    Contraseña</label>
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
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember"
                                               className="text-gray-500 dark:text-gray-300">Recordarme</label>
                                    </div>
                                </div>
                                <a href="#"
                                   className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">¿Olvidaste
                                    tu Contraseña?</a>
                            </div>
                            <button
                                type="submit"
                                className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${loading ? 'cursor-auto bg-blue-400 hover:bg-blue-400' : ''}`}>
                                {loading ? "Cargando..." : "Ingresar"}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿No tenés una cuenta? <a onClick={handleRegisterRedirect}
                                                         className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer">Registrarse</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;