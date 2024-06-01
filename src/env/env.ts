import { z } from "zod"

const schema = z.object({
    DATABASE_URL: z.string(),
    JWT_SECRET_KEY: z.string(),
    BCRYPT_SALT_ROUNDS: z.coerce.number(),
})

export const env = schema.parse(process.env)