import { HttpPostParam } from '../protocols/http/http-post-client'
import faker from 'faker'

export const mockPostRequest = (): HttpPostParam<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
