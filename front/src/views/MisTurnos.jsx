import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Turnos from "../components/Turnos";
import styles from "../styles/Appointments.module.css";
import axios from "axios";
import NavBar from "../components/NavBar";
import { loginSuccess } from "../redux/userSlice";

const MisTurnos = () => {
    const [appointments, setAppointments] = useState([]);
    const userId = useSelector((state) => state.user.userInfo?.id);
    const dispatch = useDispatch();

    // Cargar el userId desde localStorage si es necesario
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && !userId) {
            const parsedUser = JSON.parse(storedUser);
            console.log("Cargando usuario desde localStorage:", parsedUser);
            dispatch(loginSuccess(parsedUser)); // Carga el usuario en Redux
        }
    }, [userId, dispatch]);

    // Obtener las citas del usuario desde el endpoint /users/:id
    useEffect(() => {
        if (userId) {
            console.log(`Ejecutando solicitud para obtener los datos del usuario con ID ${userId}`);
            axios.get(`http://localhost:3000/users/${userId}`)  // Ahora hacemos la solicitud a /users/:id
                .then((res) => {
                    console.log("Datos obtenidos del usuario con citas:", res.data);

                    // Verifica si el usuario tiene citas (appointments)
                    if (res.data.appointments && Array.isArray(res.data.appointments)) {
                        console.log("Citas del usuario logueado:", res.data.appointments);
                        setAppointments(res.data.appointments);  // Asigna las citas al estado
                    } else {
                        console.log("El usuario no tiene citas.");
                        setAppointments([]);  // Usuario sin citas
                    }
                })
                .catch((error) => console.error("Error al obtener los datos del usuario", error));
        }
    }, [userId]);

    const handleCancel = (cancelledId) => {
        setAppointments(appointments.map(appointment =>
            appointment.id === cancelledId ? { ...appointment, status: "CANCELLED" } : appointment
        ));
    };

    return (
        <>
            <NavBar />
            <div className={styles.appointmentsContainer}>
                <h1 className={styles.title}>Appointments</h1>
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <Turnos 
                        key={appointment.id} 
                        appointments={appointment} 
                        onCancel={handleCancel}
                        />
                    ))
                ) : (
                    <p>No appointments found</p>
                )}
            </div>
        </>
    );
};

export default MisTurnos;

