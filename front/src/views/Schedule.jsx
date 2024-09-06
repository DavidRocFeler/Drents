import { useState } from "react";
import axios from "axios";
import styles from "../styles/ScheduleAppointments.module.css";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import JustLogo from "../assets/just-logo.jpg";
import ImageForm from "../components/ImageForm";
import { validateAppointments } from "../helpers/validateAppointments";

const Schedule = () => {
    // Hook para redireccionar
    const navigate = useNavigate();

    // Crear el estado para representar datos del appointments 
    const [scheduleData, setScheduleData] = useState({
        date: "",
        time: "",
        description: "",
    });

    // crear el estado para manejar los errores 
    const [ errors, setErrors ] = useState({
        date: "",
        time: "",
        description: "",
    })

    // Crear la función que capturará los datos del input 
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setScheduleData({
            ...scheduleData,
            [name]: value
        });
        setErrors(validateAppointments({
            ...scheduleData,
            [name]: value
        }))
    };

    // Crear la función que capturará los datos del formulario
    const handleOnSubmit = async (event) => {
        event.preventDefault();

        // Obtener el userId del localStorage
        const storedUser = localStorage.getItem("user");
        const userId = storedUser ? JSON.parse(storedUser).id : null;

        if (!userId) {
            alert("User ID not found. Please log in again.");
            navigate("/login");
            return;
        }

        try {
            // Enviar la solicitud con el userId desde el localStorage
            await axios.post("http://localhost:3000/appointments/schedule", {
                ...scheduleData,
                userId,
            });
            alert("Appointment scheduled successfully");

            // Redirigir al usuario a la página de citas
            navigate("/appointments");

        } catch (error) {
            console.error("Error scheduling appointment:", error);
            alert("There was an error scheduling the appointment. Please try again.");
        }

        // Limpiar el formulario
        setScheduleData({
            date: "",
            time: "",
            description: "",
        });
    };

    return (
        <main>
            <div className={styles.logginUser}>
                <figure className={styles.logoMain}>
                    <Link to="/" >
                        <img src={JustLogo} alt="logo" className={styles.logo} />
                    </Link>
                </figure>
                <section className={styles.loggin}>
                    <h3>Schedule your appointment</h3>
                    <div className={styles.needAccount}>
                        <p>Look all appointments</p>
                        <Link to="/appointments"> Appointments </Link>
                    </div>

                    <form onSubmit={handleOnSubmit} action="" className={styles.loginForm}>
                        <input 
                        onChange={handleOnChange} 
                        name="date"
                        value={scheduleData.date} 
                        type="text" 
                        placeholder="date: YYYY-MM-DD" 
                        id="date" className={styles.date} 
                        />
                        { scheduleData.date && errors.date && (
                            <p className={styles.error} > {errors.date} </p>
                        )}
                        <input 
                        onChange={handleOnChange} 
                        name="time"
                        value={scheduleData.time} 
                        type="text" 
                        placeholder="time: 9:00 to 17:00" 
                        id="time" 
                        className={styles.time} 
                        />
                        { scheduleData.time && errors.time && (
                            <p className={styles.error} > {errors.time} </p>
                        )}

                        <input 
                        onChange={handleOnChange} 
                        name="description"
                        value={scheduleData.description} 
                        type="text" 
                        placeholder="Appointment description" 
                        id="description" 
                        className={styles.description} 
                        />
                        { scheduleData.description && errors.description && (
                            <p className={styles.error} > {errors.description} </p>
                        )}

                        <button 
                        className={styles.button} 
                        type="submit"
                        disabled={ errors.date || errors.time || errors.description }
                        >Sign up</button>
                    </form>
                </section>
                <hr />
                <div className={styles.footerLogin}>
                    <p>All rights reserved | 2024 D-rents | Developed by Start4 </p>
                    <aside>
                        <a href="">Privacy</a>
                        <a href="">Terms & Conditions</a>
                        <a href="">Support</a>
                    </aside>
                </div>
            </div>
            <div className={styles.coverPicture}>
                <ImageForm />
            </div>
        </main>
    );
};

export default Schedule;
