import { Validation } from '../protocols/validation'

/**
 * SPY vs STUB
 *
 * SPY = Espia os métodos de entrada
 * STUB = Mockar resposta fixa
 * */

class ValidationStub implements Validation {
  errorMessage: string

  validate (fieldValue: string, fieldName: string): string {
    return this.errorMessage
  }
}

export default ValidationStub
