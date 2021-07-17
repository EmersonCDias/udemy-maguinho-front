import React, { useContext, ReactElement } from 'react'
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa'

import FormContext from '../../contexts/form/form-context'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]

  const handleEnableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleOnChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const getStatus = (): ReactElement =>
    error
      ? <FaRegTimesCircle data-testid={`${props.name}-status-icon-error`} color="red" />
      : <FaRegCheckCircle data-testid={`${props.name}-status-icon-success`} color="green" />

  const getTitle = (): string => error || 'Tudo certo'

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} readOnly onFocus={handleEnableInput} onChange={handleOnChange} />

      <span data-testid={`${props.name}-status`} title={getTitle()}>
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
