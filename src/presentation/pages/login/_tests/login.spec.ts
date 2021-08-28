import { cleanup, fireEvent, waitFor } from '@testing-library/react'
import faker from 'faker'
import 'jest-localstorage-mock'

import {
  simulateValidSubmit,
  simulateStatusForField,
  populatePasswordField,
  populateEmailField,
  makeSut
} from './_helpers/login-helper'
import { InvalidCredentialsError } from '../../../../domain/errors/invalid-crendentials-error'

describe('Login', () => {
  afterEach(cleanup)

  beforeEach(() => {
    localStorage.clear()
  })

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

  test('should show spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })

    populateEmailField(sut)

    fireEvent.submit(sut.getByTestId('login-form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()

    jest.spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))

    simulateValidSubmit(sut)

    const formStatusWrap = sut.getByTestId('form-status-wrap')
    await waitFor(() => formStatusWrap)

    // const apiError = sut.getByTestId('api-error')

    // expect(apiError.textContent).toBe(error.message)
    expect(formStatusWrap.childElementCount).toBe(1)
  })

  test('should add accessToken to localStorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut)

    await waitFor(() => sut.getByTestId('login-form'))

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
  })
})
