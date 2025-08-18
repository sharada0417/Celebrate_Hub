"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnathorizedError";
    }
}
exports.default = UnauthorizedError;
