

export interface IUser{
    // _id ?: string
    username : string;
    email : string;
    password : string;
}


export interface LoginUsecaseResponse {
    refreshToken: string;
    accessToken: string;
    userData: {
        [key :string] : string
    }
  }

  export type Payload = {
    userName: string;
    email : string;
    iat: number;
    exp: number;
  };
  
  