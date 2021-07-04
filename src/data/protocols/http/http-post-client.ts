import { HttpResponse } from './http-response'

export type HttpPostParam<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<T, R> {
  post(params: HttpPostParam<T>): Promise<HttpResponse<R>>
}
