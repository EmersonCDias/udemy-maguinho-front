import React, { useContext, ReactElement } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'

import FormContext from '../../contexts/form/form-context'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(FormContext)
  const error = errorState[props.name]

  const handleEnableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): ReactElement => <FaRegCheckCircle color="red" />

  const getTitle = (): string => error

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={handleEnableInput} />

      <span data-testid={`${props.name}-status`} title={getTitle()}>
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
