import { HttpResponse } from './http-response'

export type HttpPostParam = {
  url: string
  body?: object
}

export interface HttpPostClient {
  post(params: HttpPostParam): Promise<HttpResponse>
}
