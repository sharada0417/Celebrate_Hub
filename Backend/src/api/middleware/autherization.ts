import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../../domain/errors/forbidden-error";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Narrow the Clerk auth object to access sessionClaims safely
  const auth = req.auth as { sessionClaims?: { role?: string } } | undefined;
  // If role is not "admin", forbid
  if (auth?.sessionClaims?.role !== "admin") {
    throw new ForbiddenError("Forbidden");
  }
  next();
};
