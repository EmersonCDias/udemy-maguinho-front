import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response'
import { HttpPostClient, HttpPostParam } from '../protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParam): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body

    return Promise.resolve(this.response)
  }
}
