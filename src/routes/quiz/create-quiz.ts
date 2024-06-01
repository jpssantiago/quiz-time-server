import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod"

import { getQuizByPin, addQuiz } from "../../services/quiz-service"
import { hashPassword } from "../../services/bcrypt-service"
import { generateToken } from "../../services/token-service"

const answerSchema = z.object({
    id: z.string(),
    text: z.string()
})

const questionSchema = z.object({
    id: z.string(),
    text: z.string(),
    answers: z.array(answerSchema),
    correctAnswer: z.string()
})

const schema = z.object({
    pin: z.string(),
    password: z.string(),
    questions: z.array(questionSchema)
})

export async function createQuiz(request: FastifyRequest, response: FastifyReply) {
    const { data: parsed } = schema.safeParse(request.body)
    if (!parsed) {
        return response.code(400).send({ err: "bad request" })
    }

    const alreadyExists = await getQuizByPin(parsed.pin)
    if (alreadyExists) {
        return response.code(401).send({ err: "pin already in use" })
    }

    const hash = await hashPassword(parsed.password)
    const addedId = await addQuiz(parsed.pin, hash, parsed.questions)
    if (!addedId) {
        return response.code(400).send({ err: "could not insert the quiz" })
    }

    const token = generateToken(parsed.pin)
    response.send({ 
        token, 
        quiz: { 
            _id: addedId.toString(), 
            pin: parsed.pin, 
            questions: parsed.questions 
        } 
    })
}