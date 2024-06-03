import { FastifyInstance } from "fastify"

import { getQuiz } from "./get-quiz"

export default async function(app: FastifyInstance) {
    app.get("/quiz/:pin", getQuiz)
}