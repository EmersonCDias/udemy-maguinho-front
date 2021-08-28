import { Authentication, AuthenticationParams } from '../../domain/usecases/authenticantion'
import { mockAccountModel } from '../../domain/_mocks/mock-account'
import { AccountModel } from '../../domain/models/account-model'

export default class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  callsCount = 0

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++

    return await Promise.resolve(this.account)
  }
}
