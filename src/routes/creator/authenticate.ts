import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

import { getQuizByPin } from "../../services/quiz-service"
import { comparePasswordWithHash } from "../../services/bcrypt-service"
import { generateToken } from "../../services/token-service"

const schema = z.object({
    pin: z.string(),
    password: z.string()
})

export async function authenticate(request: FastifyRequest, response: FastifyReply) {
    const { data: parsed } = schema.safeParse(request.body)
    if (!parsed) {
        return response.code(400).send({ err: "bad request" })
    }

    const quiz = await getQuizByPin(parsed.pin)
    if (!quiz) {
        return response.code(404).send({ err: "quiz does not exist" })
    }

    const matched = await comparePasswordWithHash(parsed.password, quiz.password)
    if (!matched) {
        return response.code(401).send({ err: "invalid password" })
    }

    const token = generateToken(parsed.pin)
    delete (quiz as {password?: string}).password
    response.send({ token, quiz })
}