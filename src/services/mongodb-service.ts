import { MongoClient } from "mongodb"

import { env } from "../env/env"

const client = new MongoClient(env.DATABASE_URL)

export async function connectToDatabase() {
    await client.connect()
    console.log("Server connected to MongoDB 📦")
}

export const database = client.db("quiztime")