import { Question } from "./question"

export interface Quiz {
    _id: string
    pin: string
    password: string
    questions: Question[]
}