import * as styles from '../views/checkout-view/checkoutView.scss'
import { Paper } from '@material-ui/core'
import * as React from 'react'

export const wrapped = (content: any) => {
  return <div className={styles.container}>
    <Paper className={styles.paper}>
      {content}
    </Paper>
  </div>
}