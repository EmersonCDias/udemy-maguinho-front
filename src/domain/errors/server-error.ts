export class ServerError extends Error {
  constructor () {
    super('Desculpe, tivemos um erro no servidor. Tente novamente mais tarde.')
    this.name = 'ServerError'
  }
}
