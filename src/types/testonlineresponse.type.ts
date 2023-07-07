import { TestOnline } from './testonline.type'
import { ResponseApi } from './utils.type'

export type TestOnlineResponse = ResponseApi<{
  testOnline: [TestOnline]
}>
