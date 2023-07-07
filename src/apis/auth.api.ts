import { AllUserResponse } from 'src/types/alluser.type'
import { AuthResponse } from 'src/types/auth.type'
import { FlashCardResponse } from 'src/types/flashcard.type'
import { LessonResponse } from 'src/types/lesson.type'
import { LessonCompleteResponse } from 'src/types/lessonComplete.type'
import { QuizResponse } from 'src/types/quiz.type'
import { TestOnlineResponse } from 'src/types/testonlineresponse.type'
import { TopicResponse } from 'src/types/topicResopne.type'

import http from 'src/utils/http'
import httpAi from 'src/utils/httpAI'

export const registerAccount = (body: { email: string; name: string; password: string }) =>
  http.post<AuthResponse>('/signup', body)

export const loginAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/signin', body)

export const logout = () => http.post('/logout')

export const getLesson = (body: { course: string }) => http.post<LessonResponse>('/lesson', body)
export const getFlashCard = (body: { idLesson_FK: number }) => http.post<FlashCardResponse>('/flashcard', body)
export const getQuiz = (body: { idLesson_FK: number }) => http.post<QuizResponse>('/quiz', body)

export const newCompleteLesson = (body: {
  lessonComplete: string
  dateComplete: string
  point: number
  course: string
  idLesson_FK: number
  idUser_FK: number
}) => http.post<LessonCompleteResponse>('/newlessoncomplete', body)
export const getCompleteLesson = (body: { idUser_FK: number }) =>
  http.post<LessonCompleteResponse>('/lessoncomplete', body)

export const getInfoLesson = (body: { idLesson: number }) => http.post<LessonResponse>('/infoLesson', body)

export const getAllUserResult = () => http.get<LessonCompleteResponse>('/alluserresults')

export const getAllUser = () => http.get<AllUserResponse>('/allusers')

export const postWriting = (body: FormData) => httpAi.post('/upload', body)

export const getAllTopic = () => http.get<TopicResponse>('/alltopic')

export const getTestOnline = (body: { idTopic: number }) => http.post<TestOnlineResponse>('/testonline', body)

export const updateActiveUser = (body: { isActive: number; idUser: number }) => http.put('/setactive', body)

export const deleteUser = (body: { idUser: number }) => http.delete('/deleteuser', { data: body })
