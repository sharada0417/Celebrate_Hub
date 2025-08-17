import express from "express";
import {createPlace, deletePlace, getAllPlaces, getPlaceById, updateHotel} from '../application/places'
import { isAuthenticated } from "./middleware/authentication-error";
import { isAdmin } from "./middleware/autherization";

const placesRouter = express.Router();

placesRouter.route("/").get(getAllPlaces).post(isAuthenticated, isAdmin,createPlace);
placesRouter.route("/:id").get(getPlaceById).delete(deletePlace).put(updateHotel);

export default placesRouter;