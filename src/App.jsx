import { useState, useEffect } from 'react';
import Header from "./components/Header"
import Form from "./components/Form"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    // Si hay algo en el local storage entonces lo pasamos a pacientes como un
    // arreglo
    useEffect( () => {
        const obtenerLS = () => {
            const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
            setPacientes(pacientesLS);
        };

        obtenerLS();
    }, []);

    // Convertimos a cadena lo que se encuentre en pacientes para almacenarlo
    // en el local storage
    useEffect( () => {
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
    }, [pacientes]);

    const eliminarPaciente = id => {
        const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id );

        setPacientes(pacientesActualizados);
    };

    return (
        <div className="container mx-auto">
            <Header />
            <div className="mt-12 md:flex">
                <Form
                    pacientes={pacientes}
                    setPacientes={setPacientes}
                    paciente={paciente}
                    setPaciente={setPaciente}
                />
                <ListadoPacientes
                    pacientes={pacientes}
                    setPaciente={setPaciente}
                    eliminarPaciente={eliminarPaciente}
                />
            </div>
        </div>
    );
}

export default App;