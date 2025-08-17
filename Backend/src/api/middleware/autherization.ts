import { NextFunction,Request , Response } from "express";
import { ClerkClient } from "@clerk/express";
import ForbiddenError from "../../domain/errors/forbidden-error";

export const isAdmin =(req:Request,res:Response,next:NextFunction) =>{
    if(!(req?.auth?.seseionClaims?.role !== "admin")){
        throw new ForbiddenError("Forbidden");
    }
    next();
}

