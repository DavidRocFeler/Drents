import Credential from "../entities/credentialEntity";
import ICreateCredentiaDto from "../dtos/ICreateCredentialDto";
import { credentialRepositry } from "../repository/indexRepository";

export const createCredentialService = async ( createCredential: ICreateCredentiaDto ):
    Promise<Credential> => {
    const { username, password } = createCredential;
    // validate que la credencial no exista verificando si el username ya existe
    const foundCredential: Credential | null = await credentialRepositry.findOneBy({username})
    if(foundCredential)
        throw new Error(`This user ${username} already exist`)
    // crear la nueva credencial
    const newCredential: Credential = credentialRepositry.create({
        username, password
    });
    // guardar la credencial creada en la base de datos
    await credentialRepositry.save(newCredential);
    return newCredential;
};

export const validateCredentialService = async ( validateCredential: ICreateCredentiaDto ):
    Promise<Credential> => {
    const { username, password } = validateCredential;
    // validate que la credencial exista verificando si el username ya existe
    const foundCredential = await credentialRepositry.findOneBy({username});
    // creamos la condicional
    if(!foundCredential)
        throw new Error(`User ${username} not found`)
    // validamos por medio el password con una condicional
    if(foundCredential.password !== password)
        throw new Error(`User password ${username} not found`);
    return foundCredential;
};