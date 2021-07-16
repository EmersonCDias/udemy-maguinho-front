import React, { memo } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'

import Styles from './input.styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => (
  <div className={Styles.inputWrap}>
    <input {...props} />

    <span>
      <FaRegCheckCircle color="red" />
    </span>
  </div>
)

export default memo(Input)
