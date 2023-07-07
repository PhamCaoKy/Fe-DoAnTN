import { ResponseApi } from './utils.type'

export type LessonResponse = ResponseApi<{
  lesson: { idLesson: number; course: string; nameLesson: string; created_on: string }
}>
