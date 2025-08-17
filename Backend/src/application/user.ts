import { Request,Response,NextFunction } from "express";
import User from "../infrastructure/schemas/user";
import ValidationError from "../domain/errors/validation-error";

export const createUser = async (req : Request ,res :Response , next :NextFunction) => {
    try {
       const user = req.body;

    //validate the request data
    if (!user.name || !user.email) {
        throw new ValidationError("Invalid user data");
    }

    //Add the user
    await User.create({
        name:user.name,
        email:user.email,
    })

    //return the response
    res.status(201).send();
    return; 
    } catch (error) {
        next(error);
    }
    
}

export const GetAllUsers =async (req :Request,res:Response , next:NextFunction) => {
    const users = await User.find();
    res.status(200).json(users);
    return;
}