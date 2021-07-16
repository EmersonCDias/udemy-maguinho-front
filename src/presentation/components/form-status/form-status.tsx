import React, { useContext } from 'react'

import Spinner from '../spinner/spinner'
import Styles from './form-status-styles.scss'
import FormContext from '../../contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={Styles.statusWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}

      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
