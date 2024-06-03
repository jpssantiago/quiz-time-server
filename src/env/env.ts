import { z } from "zod"
import "dotenv/config"

const schema = z.object({
    PORT: z.coerce.number(),
    DATABASE_URL: z.string(),
})

export const env = schema.parse(process.env)