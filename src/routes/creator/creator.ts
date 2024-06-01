import { FastifyInstance } from "fastify"

import { authenticate } from "./authenticate"

export default async function(app: FastifyInstance) {
    app.post("/authenticate", authenticate)
}