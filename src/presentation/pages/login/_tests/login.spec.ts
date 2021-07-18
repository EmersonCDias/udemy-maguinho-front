import { cleanup } from '@testing-library/react'
import faker from 'faker'

import {
  simulateValidSubmit,
  simulateStatusForField,
  populatePasswordField,
  populateEmailField,
  makeSut
} from './_helpers/login-helper'

describe('Login', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const { sut, validationStub } = makeSut({
      validationError: faker.random.words()
    })

    const formStatusWrap = sut.getByTestId('form-status-wrap')
    expect(formStatusWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    simulateStatusForField(sut, 'email', validationStub.errorMessage)
    simulateStatusForField(sut, 'password', validationStub.errorMessage)
  })

  test('should show email error if validation fails', () => {
    const { sut, validationStub } = makeSut({
      validationError: faker.random.words()
    })

    validationStub.errorMessage = faker.random.words()

    populateEmailField(sut)

    simulateStatusForField(sut, 'email', validationStub.errorMessage)
  })

  test('should show password error if validation fails', () => {
    const { sut, validationStub } = makeSut({
      validationError: faker.random.words()
    })

    validationStub.errorMessage = faker.random.words()

    populatePasswordField(sut)

    simulateStatusForField(sut, 'password', validationStub.errorMessage)
  })

  test('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)

    simulateStatusForField(sut, 'email', 'Tudo certo')
  })

  test('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)

    simulateStatusForField(sut, 'password', 'Tudo certo')
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('should show loading on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
