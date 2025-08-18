import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../../domain/errors/unauthorized-error";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // Narrow the Clerk auth object so TypeScript knows about userId
  const auth = req.auth as { userId?: string } | undefined;
  if (!auth?.userId) {
    throw new UnauthorizedError("Unauthorized");
  }
  next();
};
