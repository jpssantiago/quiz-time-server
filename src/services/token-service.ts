import jwt, { JwtPayload } from "jsonwebtoken"

import { env } from "../env/env"

export function generateToken(pin: string): string {
    return jwt.sign({ pin }, env.JWT_SECRET_KEY, { expiresIn: "1d" })
}

export function getPinByToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, env.JWT_SECRET_KEY) as JwtPayload
    } catch (err) {
        return null
    }
}