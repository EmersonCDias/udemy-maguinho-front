import axios from 'axios'
import faker from 'faker'
import { AxiosHttpClient } from './axios-http-client'
import { HttpPostParam } from '../../../data/protocols/http/http-post-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.datatype.number()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)
const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParam<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('Should call AXIOS with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct status code and body', async () => {
    const sut = makeSut()

    const httpResponse = await sut.post(mockPostRequest())

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})