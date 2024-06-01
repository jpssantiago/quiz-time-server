import bcrypt from "bcrypt"

import { env } from "../env/env"

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS)
}