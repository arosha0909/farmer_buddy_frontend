import { Permission } from "enum/permission";
import { UserTypes } from "enum/userTypes";
import { UserVerificationStatus } from "enum/userVerificationStatus";

export interface LoginRes {
    token: string
    role: string
}
  
export interface User {
    email: string;
    password: string;
    phone?: string;
    role?: UserTypes;
    permissions?: Permission[];
    verificationStatus:UserVerificationStatus;
    name?: string;
    lastLogin?: Date;
}