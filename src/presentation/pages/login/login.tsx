import React from 'react'

import LoginHeader from '../../components/login-header/login-header'
import Footer from '../../components/footer/footer'
import Input from '../../components/input/input'
import FormStatus from '../../components/form-status/form-status'
import Styles from './login.styles.scss'

const Login: React.FC = () => (
  <div className={Styles.login}>
    <LoginHeader />

    <form action="" className={Styles.form}>
      <h2>Login</h2>

      <Input type="email" name="email" placeholder="Digite seu email" />
      <Input type="password" name="password" placeholder="Digite sua senha" />

      <button type="submit" className={Styles.submit}>Entrar</button>

      <span className={Styles.link}>Criar conta</span>

      <FormStatus />
    </form>

    <Footer />
  </div>
)

export default Login
