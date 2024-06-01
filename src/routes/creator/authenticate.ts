import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

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

    if (parsed.password != "password123") { // temporary password
        return response.code(401).send({ err: "invalid password" })
    }

    const token = generateToken(parsed.pin)
    response.send({ token })
}