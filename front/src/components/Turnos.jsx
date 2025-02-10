import styles from "../styles/Card.module.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://drents-production.up.railway.app";

const Turnos = (props) => {
    const { id, date, time, status, description } = props.appointments;

    const handletSubmit = () => {
        console.log(`Trying to cancel the turn with id${id}`);
        if (window.confirm(`Do you want to cancel the shift with id ${id}?`)) {
            console.log(`Confirmed: Cancel Shift with id ${id}`);
            axios.put(`${API_URL}/appointments/cancel/${id}`)
                .then(response => {
                    console.log(`shift with id ${id} successfully canceled. Server Response:`, response.data);
                    alert(`The shift with id ${id} has been cancelled`);
                    props.onCancel(id); // Actualiza el estado local para reflejar el cambio
                })
                .catch(error => {
                    console.error("Error canceling the shift:", error);
                    alert(`Unable to cancel shift with id ${id}.`);
                });
        } else {
            console.log(`Cancellation of the shift with id  ${id} aborted by the user.`);
        }
    };

    return (
        <div className={styles.card}>
            <h4>id: {id}</h4>
            <h4>date: {date}</h4>
            <h4>time: {time}</h4>
            <h4>Description: {description}</h4>
            {
                status === "ACTIVE" ? (
                    <h4 className={styles.active} onClick={handletSubmit}>Active (Cancel)</h4>
                ) : (
                    <h4 className={styles.cancelled}>Canceled</h4>
                )
            }
        </div>
    );
};

export default Turnos;
