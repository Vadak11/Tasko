import './App.css'
import Login from "./views/Login.jsx";
import Register from './views/Register.jsx';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Dashboard} from "./views/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import {TaskPannel} from "./views/TaskPannel.jsx";
import {ProyectPannel} from "./views/ProyectPannel.jsx";
import {MemberPannel} from "./views/MemberPannel.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/" element={<PrivateRoute />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="task-pannel" element={<TaskPannel />} />
                    <Route path="proyect-pannel" element={<ProyectPannel />} />
                    <Route path="member-pannel" element={<MemberPannel />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
