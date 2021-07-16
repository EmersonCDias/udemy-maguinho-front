import React, { useContext } from 'react'

import Spinner from '../spinner/spinner'
import Styles from './form-status-styles.scss'
import FormContext from '../../contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={Styles.statusWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}

      {errorState.main && <span className={Styles.error}>{errorState.main}</span>}
    </div>
  )
}

export default FormStatus
