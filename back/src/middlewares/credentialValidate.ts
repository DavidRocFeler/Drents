import ICreateCredentialDto from "../dtos/ICreateCredentialDto";
import { Request, Response, NextFunction } from "express";

const credentialValidate = (
    req: Request < {}, {}, ICreateCredentialDto>,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body;
    try {
        // Validación de username
        if (!username) throw new Error("El campo username es requerido");
        if (username.length < 4)
            throw new Error("El campo username debe tener al menos 4 caracteres");
        if (username.length > 20)
            throw new Error("El campo username debe tener un máximo de 20 caracteres");

        // Validación de password
        if (!password) throw new Error("El campo password es requerido");
        if (password.length < 4)
            throw new Error("El campo password debe tener al menos 4 caracteres");
        if (password.length > 20)
            throw new Error("El campo password debe tener un máximo de 10 caracteres");
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&€£]).*$/;
        if (!passwordRegex.test(password))
            throw new Error("El campo password debe tener al menos una letra, un número y un caracter especial (@$!%*?&€£)");
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
    next();
};

export default credentialValidate;
