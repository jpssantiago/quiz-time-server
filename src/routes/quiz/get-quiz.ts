import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

import { getQuizById } from "../../services/quiz-service"

const schema = z.object({
    id: z.string()
})

export async function getQuiz(request: FastifyRequest, response: FastifyReply) {
    const { data: parsed } = schema.safeParse(request.params)
    if (!parsed) {
        return response.code(400).send({ err: "bad request" })
    }

    const quiz = await getQuizById(parsed.id)
    if (!quiz) {
        return response.code(404).send({ err: "quiz does not exist" })
    }
    
    return response.send({ ...quiz })
}