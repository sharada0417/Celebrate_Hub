import { NextFunction, Request, Response } from "express";
import Place from "../infrastructure/schemas/places";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from "mongoose";

export const retrive = async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try {
        const {query} = req.query;
        if(!query || query === ""){
            const places = (await Place.find()).map((place)=>({
                place:place,
                confidence : 1,
            }));
            return res.status(200).json(places);
        }

        const embeddingModel = new OpenAIEmbeddings({
            model:"text-embedding-ada-002",
            apiKey: process.env.OPENAI_API_KEY,
        });

        const vectorIndex = new MongoDBAtlasVectorSearch(embeddingModel,{
            collection:mongoose.connection.collection("placeVectors"),
            indexName:"vector_index"
        });

        const results = await vectorIndex.similaritySearchWithScore(query as string)

        console.log(results);

        const matchedPlaces = await Promise.all(
            results.map(async(result)=>{
                const place = await Place.findById(result[0].metadata._id);
                return{
                    place:place,
                    confidence:result[1]
                }
            })
        );
         res.status(200).json(matchedPlaces.length > 3 ? matchedPlaces.slice(0,4): matchedPlaces);
         return;
    } catch (error) {
        next(error);
    }
}