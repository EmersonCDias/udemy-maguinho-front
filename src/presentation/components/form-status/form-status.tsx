import React from 'react'

import Spinner from '../spinner/spinner'
import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => (
  <div className={Styles.statusWrap}>
    <Spinner className={Styles.spinner} />

    <span className={Styles.error}>Erro</span>
  </div>
)

export default FormStatus
