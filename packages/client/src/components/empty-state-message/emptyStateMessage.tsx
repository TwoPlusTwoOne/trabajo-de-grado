import * as React from 'react'
import * as styles from './emptyStateMessage.scss'
import classNames from 'classnames'

export const EmptyStateMessage = (props: { message: string, className?: string }) => <div
  className={classNames(styles.emptyMessage, props.className)}>{props.message}</div>
