import { Request, Response, NextFunction } from "express";

const GlobalErrorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // log the actual error

  if (err.name === "NotFoundError") {
    res.status(404).json({ message: err.message });
    return;
  }

  if (err.name === "ValidationError") {
    res.status(400).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
};

export default GlobalErrorHandlingMiddleware;
