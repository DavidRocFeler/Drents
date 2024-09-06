import { userRepository } from "../repository/indexRepository";
import User from "../entities/userEntity";
import ICreateUserDto from "../dtos/ICreateUserDto";
import { createCredentialService } from "./credentialService";

// traer todos los usuarios
export const getAllUserService = async ():
    Promise<User[]> => {
    const allUser: User[] = await userRepository.find()
    return allUser;
};

export const getUserByIdService = async ( id: number ):
    Promise<User> => {
    const userId: User | null = await userRepository.findOne({
        where: {id},
        relations: ["appointments"]
    });
    if(!userId) 
        throw new Error(`User with id: ${id} not found`);
    return userId;
};

export const createUserService = async ( createUserDto: ICreateUserDto ):
    Promise<User> => {
    const { name, email, birthdate, nDni, username, password } = createUserDto
    const user  = await userRepository.findOneBy({email})
    if(user) 
        throw new Error(`User email ${email} already exist`)
    // crear la nueva credencial
    const newCredential = await createCredentialService({
        username, password
    });
    // crear el usuario 
    const newUser = userRepository.create({
        name, email, birthdate, nDni
    });
    // asosiar el usuario ala credencial
    newUser.credential = newCredential;
    //guardar en la base de datos 
    await userRepository.save(newUser);
    return newUser;   
};


export const foundUserByCredentialIdService = async ( credentialId: number ):
    Promise<User> => {
    const foundUser: User | null = await userRepository.findOneBy({
        credential: {id: credentialId}
    });
    if(!foundUser)
        throw new Error(`User not found`);
    return foundUser;
};