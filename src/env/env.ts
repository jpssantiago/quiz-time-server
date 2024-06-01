import { z } from "zod"

const schema = z.object({
    DATABASE_URL: z.string(),
    JWT_SECRET_KEY: z.string(),
})

export const env = schema.parse(process.env)