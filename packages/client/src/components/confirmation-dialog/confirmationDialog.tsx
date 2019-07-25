import * as React from 'react'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import { Button } from '../button/button'
import Typography from '@material-ui/core/Typography/Typography'

export type Props = {
  open: boolean
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
  content: any
  title: string
}

export class ConfirmationDialog extends React.PureComponent<Props> {
  render() {
    const { open, title, confirmLabel, cancelLabel, content, onCancel, onConfirm } = this.props
    return (
      <Dialog open={open} onBackdropClick={onCancel} onEscapeKeyDown={onCancel}>
        <DialogTitle>
          {title}
        </DialogTitle>

        <DialogContent>
          {content}
        </DialogContent>

        <DialogActions>
          <Button onClick={onCancel} kind={'secondary'}>
            <Typography color={'inherit'} variant={'button'}>{cancelLabel}</Typography>
          </Button>
          <Button onClick={onConfirm} kind={'primary'}>
            <Typography color={'inherit'} variant={'button'}>{confirmLabel}</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
