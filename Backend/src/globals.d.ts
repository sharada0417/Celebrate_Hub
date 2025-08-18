/// <reference types="@clerk/express/env"/>

export {};

//create a type of role
export type Role = "admin"

declare global {
    interface CustomJwtSessionClaims{
        metadata:{
            role?:Role;
        };
    }
}