"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const places_1 = require("../application/places");
const authentication_error_1 = require("./middleware/authentication-error");
const autherization_1 = require("./middleware/autherization");
const embedding_1 = require("../application/embedding");
const retrive_1 = require("../application/retrive");
const placesRouter = express_1.default.Router();
placesRouter.route("/").get(places_1.getAllPlaces).post(authentication_error_1.isAuthenticated, autherization_1.isAdmin, places_1.createPlace);
placesRouter.route("/:id").get(places_1.getPlaceById).delete(places_1.deletePlace).put(places_1.updateHotel);
placesRouter.route("/llm").post(places_1.generateResponse);
placesRouter.route("/embeddings/create").post(embedding_1.createEmbeddings);
placesRouter.route("/serch/retrieve").get(retrive_1.retrive);
exports.default = placesRouter;
