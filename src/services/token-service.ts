import jwt from "jsonwebtoken"

import { env } from "../env/env"

export function generateToken(pin: string): string {
    return jwt.sign({ pin }, env.JWT_SECRET_KEY, { expiresIn: "1d" })
}