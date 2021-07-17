import React, { useCallback, useEffect, useState } from 'react'

import { Authentication } from '../../../domain/usecases/authenticantion'
import { Validation } from '../../protocols/validation'
import FormContext from '../../contexts/form/form-context'
import LoginHeader from '../../components/login-header/login-header'
import Footer from '../../components/footer/footer'
import Input from '../../components/input/input'
import FormStatus from '../../components/form-status/form-status'
import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleOnSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    setState({
      ...state,
      isLoading: true
    })

    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }, [state])

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
        <form action="" className={Styles.form} onSubmit={handleOnSubmit}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input type="password" name="password" placeholder="Digite sua senha" />

          <button
            disabled={!!state.emailError || !!state.passwordError}
            data-testid="submit"
            type="submit"
            className={Styles.submit}
          >
            Entrar
          </button>

          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Login
