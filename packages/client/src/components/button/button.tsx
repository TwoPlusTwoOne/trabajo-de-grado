import * as React from 'react'
import * as styles from './button.scss'
import classNames from 'classnames'

export type Props = {
  kind: 'primary' | 'secondary' | 'danger'
  onClick: () => void
  className?: string
}

export class Button extends React.Component<Props> {
  render() {
    const { className, kind, onClick, children } = this.props
    return <button onClick={onClick} className={classNames(styles.button, styles[kind], className)}>
      {children}
    </button>
  }
}
