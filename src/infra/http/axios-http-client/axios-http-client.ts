import axios from 'axios'
import { HttpPostClient, HttpPostParam } from '../../../data/protocols/http/http-post-client'
import { HttpResponse } from '../../../data/protocols/http/http-response'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParam<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body)

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
