import { FastifyInstance } from "fastify"

import { authenticate } from "./authenticate"
import { getQuizByToken } from "./get-quiz-by-token"

export default async function(app: FastifyInstance) {
    app.post("/authenticate", authenticate)
    app.post("/creator", getQuizByToken)
}