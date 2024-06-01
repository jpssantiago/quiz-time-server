import { ObjectId } from "mongodb"

import { database } from "./mongodb-service"
import { Quiz } from "../models/quiz"

const collection = database.collection("quiz")

export async function getQuizById(id: string): Promise<Quiz | null> {
    try {
        const document = await collection.findOne({ _id: new ObjectId(id) })
        
        return (document as unknown) as Quiz
    } catch (err) {
        return null
    }
}