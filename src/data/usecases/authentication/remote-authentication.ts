import { HttpPostClient } from '../../protocols/http/http-post-client'
import { AuthenticationParams } from '../../../domain/usecases/authenticantion'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    return await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
