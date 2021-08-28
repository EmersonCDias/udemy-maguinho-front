import React, { useContext } from 'react'

import Spinner from '../spinner/spinner'
import Styles from './form-status-styles.scss'
import FormContext from '../../contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)
  const { isLoading, apiError } = state

  return (
    <div data-testid="form-status-wrap" className={Styles.statusWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}

      {apiError && <span data-testid="api-error" className={Styles.error}>{apiError}</span>}
    </div>
  )
}

export default FormStatus
