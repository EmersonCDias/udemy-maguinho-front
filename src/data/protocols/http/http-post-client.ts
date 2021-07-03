export type HttpPostParam = {
  url: string
}

export interface HttpPostClient {
  post(params: HttpPostParam): Promise<void>
}
