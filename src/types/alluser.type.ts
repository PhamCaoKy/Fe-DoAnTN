import { User } from './user.type'
import { ResponseApi } from './utils.type'

export type AllUserResponse = ResponseApi<{
  token: string
  data:[User] 
}>

