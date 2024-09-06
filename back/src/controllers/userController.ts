import { Request, Response } from "express";
import { createUserService, foundUserByCredentialIdService, getAllUserService, getUserByIdService } from "../services/userService";
import ICreateUserDto from "../dtos/ICreateUserDto";
import ICreateCredentiaDto from "../dtos/ICreateCredentialDto";
import { validateCredentialService } from "../services/credentialService";
import Credential from "../entities/credentialEntity";
import User from "../entities/userEntity";

export const getAllUserController = async ( 
    req: Request, 
    res: Response
) => {
    try {
        const allUser = await getAllUserService();
        res.status(200).json(allUser);
    } catch (error: any) {
        res.status(404).json({message: error.message})
    };
};

export const getUserByIdController = async (
    req: Request<{id: string}>,
    res: Response
) => {
    const {id} = req.params;
    try {
        const userId = await getUserByIdService(Number(id));
        res.status(200).json(userId);
    } catch (error: any) {
        res.status(404).json({message: error.message})
    };
};

export const registerController = async ( 
    req: Request<{}, {}, ICreateUserDto>,
    res: Response
) => {
    const { name, email, birthdate, nDni, username, password } = req.body;
    try {
        const newUser = await createUserService({
            name, email, birthdate, nDni, username, password
        });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    };
};

export const loginController = async ( 
    req: Request<{}, {}, ICreateCredentiaDto>,
    res: Response
) => {
    const { username, password } = req.body;
    try {
        const credential: Credential = await validateCredentialService({username, password})
        const user: User = await foundUserByCredentialIdService(credential.id)
        res.status(200).json({
            login: true,
            user
        });
    } catch (error: any) {
        res.status(400).json({message: error.message});
    };
};