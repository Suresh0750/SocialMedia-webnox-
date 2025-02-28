
import { Schema, Document, model } from "mongoose";
import { User } from "@/domain/models/Users";

export interface UserDocuments extends User, Document {}

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true,trim:true },
    email: { type: String, required: true, unique: true,trim:true },
    password: { type: String, required: true,trim:true},
    avatar: { type: String, default: '',trim:true},
  },
  { timestamps: true,versionKey: false }
);

export default model<UserDocuments>("User", userSchema, "users");