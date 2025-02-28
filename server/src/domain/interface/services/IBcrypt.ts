

export interface IBcrypt{
    hashPassword(password:string):Promise<string>
    comparePass(password:string,hashPassword:string) : Promise<boolean>
}