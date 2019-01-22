import * as React from 'react'
import { CircularProgress } from '@material-ui/core'
import * as styles from './loader.scss'

export const Loader = () => (
  <div className={styles.container}>
    <CircularProgress />
  </div>
)