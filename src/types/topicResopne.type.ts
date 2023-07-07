import { Topic } from './topic.type'
import { ResponseApi } from './utils.type'

export type TopicResponse = ResponseApi<{
  topicOnline: [Topic]
}>