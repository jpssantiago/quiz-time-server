import fastify from "fastify"

import { connectToDatabase } from "./services/mongodb-service"

const app = fastify()
connectToDatabase()

app.listen({
    port: 3333,
    host: "0.0.0.0"
}, () => console.log("Server running on port 3333 🔥"))