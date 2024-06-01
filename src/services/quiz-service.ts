import { ObjectId } from "mongodb"

import { database } from "./mongodb-service"
import { Quiz } from "../models/quiz"
import { Question } from "../models/question"

const collection = database.collection("quiz")

export async function getQuizByPin(pin: string): Promise<Quiz | null> {
    try {
        const document = await collection.findOne({ pin })
        
        return (document as unknown) as Quiz
    } catch (err) {
        return null
    }
}

export async function addQuiz(pin: string, hash: string, questions: Question[]): Promise<ObjectId | null> {
    try {
        const { insertedId } = await collection.insertOne({ pin, password: hash, questions })
        return insertedId
    } catch (err) {
        return null
    }
}