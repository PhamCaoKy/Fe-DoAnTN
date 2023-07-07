import { ResponseApi } from './utils.type'

export type LessonCompleteResponse = ResponseApi<{
  userResult: [{
    idUserResults: number
    lessonComplete: string
    dateComplete: string
    point: string
    course: string
    idLesson_FK: number
    idUser_FK: number
  }]
}>
