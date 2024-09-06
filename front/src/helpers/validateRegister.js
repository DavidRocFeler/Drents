export const validateRegister = ({ name, email, birthdate, nDni, username, password }) => {
    const errors = {};

    // Validación de name
    if (!name) {
        errors.name = "The name field is required.";
    } else {
        if (name.length < 3) {
            errors.name = "The name must have at least 3 characters.";
        }
        if (name.length > 20) {
            errors.name = "The name must be less than 20 characters.";
        }
    }

    // Validación de email
    if (!email) {
        errors.email = "The email field is required.";
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = "The email must be a valid email address.";
        }
    }

    // Validación de birthdate
    if (!birthdate) {
        errors.birthdate = "The birthdate field is required.";
    } else {
        const dateRegex = /\d{4}-\d{2}-\d{2}/;
        if (!dateRegex.test(birthdate)) {
            errors.birthdate = "The birthdate must be in the format yyyy-mm-dd.";
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const birthdateDate = new Date(birthdate);
            const ageDiff = new Date(today.getTime() - birthdateDate.getTime());
            const age = ageDiff.getUTCFullYear() - 1970;
            if (age < 16) {
                errors.birthdate = "The person must be at least 16 years old.";
            }
        }
    }

    // Validación de nDni
    if (!nDni) {
        errors.nDni = "The DNI field is required.";
    } else {
        if (typeof nDni !== "number") {
            errors.nDni = "The DNI must be a number.";
        } else if (nDni < 0) {
            errors.nDni = "The DNI must be a positive number.";
        }
    }

    // Validación de username
    if (!username) {
        errors.username = "The username field is required.";
    } else {
        if (username.length < 4) {
            errors.username = "The username must have at least 4 characters.";
        }
        if (username.length > 20) {
            errors.username = "The username must be less than 20 characters.";
        }
    }

    // Validación de password
    if (!password) {
        errors.password = "The password field is required.";
    } else {
        if (password.length < 4) {
            errors.password = "The password must have at least 4 characters.";
        }
        if (password.length > 20) {
            errors.password = "The password must be less than 20 characters.";
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&€£]).*$/;
        if (!passwordRegex.test(password)) {
            errors.password = "The password must contain at least one letter, one number, and one special character";
        }
    }

    return errors;
};