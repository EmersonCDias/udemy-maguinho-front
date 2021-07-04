import { HttpStatusCode } from '../../protocols/http/http-response'
import { HttpPostClient } from '../../protocols/http/http-post-client'
import { AuthenticationParams } from '../../../domain/usecases/authenticantion'
import { InvalidCredentialsError } from '../../../domain/errors/invalid-crendentials-errors'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
    }
  }
}
