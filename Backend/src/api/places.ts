import express from "express";
import {createPlace, deletePlace, generateResponse, getAllPlaces, getPlaceById, updateHotel} from '../application/places'
import { isAuthenticated } from "./middleware/authentication-error";
import { isAdmin } from "./middleware/autherization";
import { createEmbeddings } from "../application/embedding";
import { retrive } from "../application/retrive";



const placesRouter = express.Router();

placesRouter.route("/").get(getAllPlaces).post(isAuthenticated, isAdmin,createPlace);
placesRouter.route("/:id").get(getPlaceById).delete(deletePlace).put(updateHotel);
placesRouter.route("/llm").post(generateResponse)
placesRouter.route("/embeddings/create").post(createEmbeddings)
placesRouter.route("/serch/retrieve").get(retrive)
export default placesRouter;