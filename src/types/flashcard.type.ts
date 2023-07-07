import { ResponseApi } from './utils.type'

export type FlashCardResponse = ResponseApi<{
  flashcard: { idFlashCard: number; front: string; back: string; voice: string; typeFlashCard: string }
}>
