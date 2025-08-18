"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalErrorHandlingMiddleware = (err, req, res, next) => {
    console.error(err); // log the actual error
    if (err.name === "NotFoundError") {
        res.status(404).json({ message: err.message });
        return;
    }
    if (err.name === "ValidationError") {
        res.status(400).json({ message: err.message });
        return;
    }
    if (err.name = "UnauthorizedError") {
        res.status(401).json({ message: err.message });
        return;
    }
    if (err.name = "ForbiddenError") {
        res.status(403).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
};
exports.default = GlobalErrorHandlingMiddleware;
