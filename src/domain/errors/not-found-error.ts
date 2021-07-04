export class NotFoundError extends Error {
  constructor () {
    super('Página não encontrada')
    this.name = 'NotFoundError'
  }
}
