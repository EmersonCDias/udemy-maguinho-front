import { HttpStatusCode } from '../../protocols/http/http-response'
import { HttpPostClient } from '../../protocols/http/http-post-client'
import { AuthenticationParams } from '../../../domain/usecases/authenticantion'
import { InvalidCredentialsError } from '../../../domain/errors/invalid-crendentials-error'
import { UnexpectedError } from '../../../domain/errors/unexpected-error'
import { NotFoundError } from '../../../domain/errors/not-found-error'
import { ServerError } from '../../../domain/errors/server-error'
import { AccountModel } from '../../../domain/models/account-model'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break

      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()

      case HttpStatusCode.notFound:
        throw new NotFoundError()

      case HttpStatusCode.serverError:
        throw new ServerError()

      default:
        throw new UnexpectedError()
    }
  }
}
