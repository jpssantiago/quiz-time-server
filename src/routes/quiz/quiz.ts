import { FastifyInstance } from "fastify"

import { getQuiz } from "./get-quiz"
import { createQuiz } from "./create-quiz"

export default async function(app: FastifyInstance) {
    app.get("/quiz/:pin", getQuiz)
    app.post("/quiz", createQuiz)
}