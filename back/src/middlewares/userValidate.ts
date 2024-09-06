import { Response, Request, NextFunction } from "express";
import ICreateUserDto from "../dtos/ICreateUserDto";
import { userRepository } from "../repository/indexRepository";
import { credentialRepositry } from "../repository/indexRepository";// Importa también tu repositorio de credenciales si es necesario

const userValidate = async (
    req: Request<{}, {}, ICreateUserDto>,
    res: Response,
    next: NextFunction
) => {
    const { name, birthdate, nDni, username, password } = req.body;

    try {
        // Validación de nombre
        if (!name) throw new Error("The name field is required.");
        if (name.length < 3) throw new Error("The name must have at least 3 characters.");
        if (name.length > 20) throw new Error("The name must have less than 20 characters.");

        // Validación de fecha de nacimiento
        if (!birthdate) throw new Error("The birthdate field is required.");
        const dateRegex = /\d{4}-\d{2}-\d{2}/;
        if (!dateRegex.test(birthdate)) throw new Error("The birthdate must follow the format yyyy-mm-dd.");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const birthdateDate = new Date(birthdate);
        const ageDiff = new Date(today.getTime() - birthdateDate.getTime());
        const age = ageDiff.getUTCFullYear() - 1970;
        if (age < 16) throw new Error("The user must be at least 16 years old.");

        // Validación de nDni
        if (!nDni) throw new Error("The nDni field is required.");
        if (typeof nDni !== "number") throw new Error("The nDni must be a number.");
        if (nDni < 0) throw new Error("The nDni must be a positive number.");

        // Comprobar si el nDni ya existe en la base de datos
        const existingUserByDni = await userRepository.findOneBy({ nDni });
        if (existingUserByDni) throw new Error("The DNI is already in use.");

        // Validación de username
        if (!username) throw new Error("The username field is required.");
        if (username.length < 4) throw new Error("The username must have at least 4 characters.");
        if (username.length > 20) throw new Error("The username must have less than 20 characters.");

        // Comprobar si el username ya existe en la base de datos
        const existingCredentialByUsername = await credentialRepositry.findOneBy({ username });
        if (existingCredentialByUsername) throw new Error("The username is already in use.");

        // Validación de password
        if (!password) throw new Error("The password field is required.");
        if (password.length < 4) throw new Error("The password must have at least 4 characters.");
        if (password.length > 20) throw new Error("The password must have less than 20 characters.");
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&€£]).*$/;
        if (!passwordRegex.test(password)) throw new Error(
            "The password must have at least one letter, one number, and one special character."
        );

        // Comprobar si el password ya existe en la base de datos
        const existingCredentialByPassword = await credentialRepositry.findOneBy({ password });
        if (existingCredentialByPassword) throw new Error("The password is already in use.");

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Si todo está bien, pasa al siguiente middleware/controlador
    next();
};

export default userValidate;
