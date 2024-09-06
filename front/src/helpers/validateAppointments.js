export const validateAppointments = ({ date, time, description }) => {
    const errors = {};

    // Validación de la fecha
    if (!date) {
        errors.date = "This field is required";
    } else {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;  // Expresión regular para formato YYYY-MM-DD
        if (!dateRegex.test(date)) {
            errors.date = "The date must be in the format yyyy-mm-dd.";
        } else {
            const appointmentDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const in14days = new Date(today);
            in14days.setDate(in14days.getDate() + 14);

            if (appointmentDate < tomorrow || appointmentDate > in14days) {
                errors.date = "The appointment date must be from tomorrow and no later than 14 days from today.";
            }
        }
    }

    // Validación de la hora
    if (!time) {
        errors.time = "The time field is required";
    } else {
        const validTimes = [
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
        ];
        if (!validTimes.includes(time)) {
            errors.time = "The time field must be in 60-minute intervals from 9:00 to 17:00.";
        }
    }

    // Validación de la descripción
    if (!description) {
        errors.description = "The description field is required";
    } else if (typeof description !== "string") {
        errors.description = "The description field must be a string";
    } else if (description.length < 4 || description.length > 50) {
        errors.description = "The description field must be between 4 and 50 characters.";
    }

    return errors;  // Devuelve el objeto de errores
};
