"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingDTO = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateBookingDTO = zod_1.default.object({
    placeId: zod_1.default.string(),
    CheckIn: zod_1.default.string(),
    CheckOut: zod_1.default.string(),
    PartyType: zod_1.default.array(zod_1.default.enum(["Couple Party", "Crowd Party", "Mixed"])),
});
