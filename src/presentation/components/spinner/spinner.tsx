import React from 'react'
import { VscLoading } from 'react-icons/vsc'

import Styles from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = ({ className }: Props) => (
  <VscLoading data-testid="spinner" className={[Styles.spinner, className].join(' ')} />
)

export default Spinner
