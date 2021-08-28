import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'

import ValidationStub from '../../../../_mocks/mock-validation'
import AuthenticationSpy from '../../../../_mocks/mock-authentication'
import Login from '../../login'

/**
 * SPY vs STUB
 *
 * SPY = Espia os métodos de entrada
 * STUB = Mockar resposta fixa
 * */

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

export const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()

  validationStub.errorMessage = params?.validationError

  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)

  return {
    sut,
    validationStub,
    authenticationSpy
  }
}

export const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

export const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

export const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

export const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  // const validationIcon = validationError
  //   ? sut.getByTestId(`${fieldName}-status-icon-error`)
  //   : sut.getByTestId(`${fieldName}-status-icon-success`)

  expect(fieldStatus.title).toBe(validationError || 'Tudo certo')
  // expect(fieldStatus.firstElementChild).toBe(validationIcon)
}
