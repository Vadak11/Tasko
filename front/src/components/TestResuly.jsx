import api from "../config/api.js";
import {useState} from "react";

export const TestResuly = () => {
    const [result, setResult] = useState({});

    const getData = async () => {
        const response = await api.get('/proyecto',
            {
                params:{
                    userId:1
                }
            });
        localStorage.setItem('proyectos', JSON.stringify(response.data));
        setResult(response.data);
    }
    return (
        <>
            <button onClick={getData}>Click</button>
            <p>{result}</p>
        </>
    )
}


