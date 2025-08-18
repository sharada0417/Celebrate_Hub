"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrive = void 0;
const places_1 = __importDefault(require("../infrastructure/schemas/places"));
const openai_1 = require("@langchain/openai");
const mongodb_1 = require("@langchain/mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const retrive = async (req, res, next) => {
    try {
        const { query } = req.query;
        if (!query || query === "") {
            const places = (await places_1.default.find()).map((place) => ({
                place: place,
                confidence: 1,
            }));
            return res.status(200).json(places);
        }
        const embeddingModel = new openai_1.OpenAIEmbeddings({
            model: "text-embedding-ada-002",
            apiKey: process.env.OPENAI_API_KEY,
        });
        const vectorIndex = new mongodb_1.MongoDBAtlasVectorSearch(embeddingModel, {
            collection: mongoose_1.default.connection.collection("placeVectors"),
            indexName: "vector_index"
        });
        const results = await vectorIndex.similaritySearchWithScore(query);
        console.log(results);
        const matchedPlaces = await Promise.all(results.map(async (result) => {
            const place = await places_1.default.findById(result[0].metadata._id);
            return {
                place: place,
                confidence: result[1]
            };
        }));
        res.status(200).json(matchedPlaces.length > 3 ? matchedPlaces.slice(0, 4) : matchedPlaces);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.retrive = retrive;
