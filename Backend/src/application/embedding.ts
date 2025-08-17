import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Place from "../infrastructure/schemas/places";

export const createEmbeddings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const embeddingModel = new OpenAIEmbeddings({
      model: "text-embedding-ada-002",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorIndex = new MongoDBAtlasVectorSearch(embeddingModel, {
      collection: mongoose.connection.collection("placeVectors"),
      indexName: "vector_index",
    });

    const places = await Place.find({});

    const docs = places.map((place) => {
      const { _id, name, location, suitableFor, price, services, description } = place;

      return new Document({
        pageContent: `${description} Located in ${location}. Price per one day ${price}`,
        metadata: { _id },
      });
    });

    await vectorIndex.addDocuments(docs);

    res.status(200).json({
      message: "Embeddings created successfully",
    });
  } catch (error) {
    next(error);
  }
};
