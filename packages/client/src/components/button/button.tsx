import * as React from 'react'
import * as styles from './button.scss'
import classNames from 'classnames'
import MaterialButton from '@material-ui/core/Button'

export type Props = {
  kind: 'primary' | 'secondary' | 'danger'
  onClick: () => void
  className?: string
  isDisabled?: boolean
}

export class Button extends React.Component<Props> {
  render() {
    const { className, kind, onClick, children, isDisabled } = this.props
    return <MaterialButton
      disabled={isDisabled}
      onClick={onClick}
      className={classNames(styles.button, styles[kind], isDisabled && styles.disabled, className)}
    >
      {children}
    </MaterialButton>
  }
}
