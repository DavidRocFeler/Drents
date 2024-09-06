export const validateCredentials = ({ username, password }) => {
    const errors = {};

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