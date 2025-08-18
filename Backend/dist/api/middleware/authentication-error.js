"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const unauthorized_error_1 = __importDefault(require("../../domain/errors/unauthorized-error"));
const isAuthenticated = (req, res, next) => {
    // Narrow the Clerk auth object so TypeScript knows about userId
    const auth = req.auth;
    if (!auth?.userId) {
        throw new unauthorized_error_1.default("Unauthorized");
    }
    next();
};
exports.isAuthenticated = isAuthenticated;
