import { database } from "./mongodb-service"
import { Quiz } from "../models/quiz"

const collection = database.collection("quiz")

export async function getQuizByPin(pin: string): Promise<Quiz | null> {
    try {
        const document = await collection.findOne({ pin })
        
        return (document as unknown) as Quiz
    } catch (err) {
        return null
    }
}