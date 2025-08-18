"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmbeddings = void 0;
const mongodb_1 = require("@langchain/mongodb");
const openai_1 = require("@langchain/openai");
const documents_1 = require("@langchain/core/documents");
const mongoose_1 = __importDefault(require("mongoose"));
const places_1 = __importDefault(require("../infrastructure/schemas/places"));
const createEmbeddings = async (req, res, next) => {
    try {
        const embeddingModel = new openai_1.OpenAIEmbeddings({
            model: "text-embedding-ada-002",
            apiKey: process.env.OPENAI_API_KEY,
        });
        const vectorIndex = new mongodb_1.MongoDBAtlasVectorSearch(embeddingModel, {
            collection: mongoose_1.default.connection.collection("placeVectors"),
            indexName: "vector_index",
        });
        const places = await places_1.default.find({});
        const docs = places.map((place) => {
            const { _id, name, location, suitableFor, price, services, description } = place;
            return new documents_1.Document({
                pageContent: `${description} Located in ${location}. Price per one day ${price}`,
                metadata: { _id },
            });
        });
        await vectorIndex.addDocuments(docs);
        res.status(200).json({
            message: "Embeddings created successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createEmbeddings = createEmbeddings;
