import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

import { getQuizByPin } from "../../services/quiz-service"

const schema = z.object({
    pin: z.string()
})

export async function getQuiz(request: FastifyRequest, response: FastifyReply) {
    const { data: parsed } = schema.safeParse(request.params)
    if (!parsed) {
        return response.code(400).send({ err: "bad request" })
    }

    const quiz = await getQuizByPin(parsed.pin)
    if (!quiz) {
        return response.code(404).send({ err: "quiz does not exist" })
    }
    
    return response.send({ ...quiz })
}