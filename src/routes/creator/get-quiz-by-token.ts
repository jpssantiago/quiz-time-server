import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"

import { generateToken, getPinByToken } from "../../services/token-service"
import { getQuizByPin } from "../../services/quiz-service"

const schema = z.object({
    authorization: z.string()
})

export async function getQuizByToken(request: FastifyRequest, response: FastifyReply) {
    const { data: parsed } = schema.safeParse(request.headers)
    if (!parsed) {
        return response.code(400).send({ err: "bad request" })
    }

    const token = parsed.authorization.split(" ")[1]
    const payload = getPinByToken(token)
    if (!payload) {
        return response.code(401).send({ err: "invalid token" })
    }

    const quiz = await getQuizByPin(payload.pin)
    if (!quiz) {
        return response.code(404).send({ err: "quiz does not exist" })
    }

    const newToken = generateToken(payload.pin)
    delete (quiz as {password?: string}).password
    return response.send({ token: newToken, quiz })
}