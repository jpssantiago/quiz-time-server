import { z } from "zod"
import "dotenv/config"

const schema = z.object({
    PORT: z.coerce.number(),
    DATABASE_URL: z.string(),
    JWT_SECRET_KEY: z.string(),
    BCRYPT_SALT_ROUNDS: z.coerce.number(),
})

export const env = schema.parse(process.env)