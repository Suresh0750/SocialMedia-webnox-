import { ObjectId } from "mongoose";


export interface User{
  readonly  username : string;
  readonly  email: string;
  readonly  password : string;
  readonly  avatar : string;
}