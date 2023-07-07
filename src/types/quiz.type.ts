import { ResponseApi } from './utils.type'

export type QuizResponse = ResponseApi<{
  quiz: {
    idQuiz: number
    question: string
    value1: string
    value2: string
    value3: string
    value4: string
    imageQuestion: string
    correctVale: string
    typeQuiz: string
  }
}>
