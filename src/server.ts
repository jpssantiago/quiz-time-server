import fastify from "fastify"
import cors from "@fastify/cors"

import { env } from "./env/env"
import { connectToDatabase } from "./services/mongodb-service"

const app = fastify()
connectToDatabase()

app.register(cors)
app.register(import("./routes/quiz/quiz"))
app.register(import("./routes/creator/creator"))

app.listen({
    port: env.PORT,
    host: "0.0.0.0"
}, () => console.log(`Server running on port ${env.PORT} 🔥`))