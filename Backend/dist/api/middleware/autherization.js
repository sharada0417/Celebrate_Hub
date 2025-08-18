"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const forbidden_error_1 = __importDefault(require("../../domain/errors/forbidden-error"));
const isAdmin = (req, res, next) => {
    // Narrow the Clerk auth object to access sessionClaims safely
    const auth = req.auth;
    // If role is not "admin", forbid
    if (auth?.sessionClaims?.role !== "admin") {
        throw new forbidden_error_1.default("Forbidden");
    }
    next();
};
exports.isAdmin = isAdmin;
