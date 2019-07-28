import * as React from 'react'
import * as styles from './creditCardForm.scss'
import classNames from 'classnames'
import { TextField } from '@material-ui/core'
import { Button } from '../button/button'

export type Props = {
  onSubmit: (info: CreditCardInfo) => void
}

export type State = {
  fields: CreditCardInfo
}

export class CreditCardForm extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      fields: {
        cardNumber: '',
        expirationDate: '',
        idNumber: '',
        name: '',
        securityCode: '',
      }
    }
  }

  handleChange = (name: keyof CreditCardInfo) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fields: { ...this.state.fields, [name]: event.target.value } })
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.fields)
  }

  isSubmitDisabled = () => {
    const { idNumber, securityCode, expirationDate, name, cardNumber } = this.state.fields

    if (!(idNumber && securityCode && expirationDate && name && cardNumber)) return true

    return false
  }


  render() {
    return (
      <div>
        <div>
          <TextField
            className={classNames(styles.input, styles.cardNumber)}
            label={'Card number'}
            value={this.state.fields.cardNumber}
            onChange={this.handleChange('cardNumber')}
            margin={'normal'}
          />
        </div>
        <div>
          <TextField
            className={classNames(styles.input, styles.name)}
            label={'Cardholder name'}
            value={this.state.fields.name}
            onChange={this.handleChange('name')}
            margin={'normal'}
          />
        </div>
        <div className={styles.dateAndCode}>
          <TextField
            className={classNames(styles.input, styles.expirationDate)}
            label={'Expiration date'}
            value={this.state.fields.expirationDate}
            onChange={this.handleChange('expirationDate')}
            margin={'normal'}
          />
          <TextField
            className={classNames(styles.input, styles.securityCode)}
            label={'Security code'}
            value={this.state.fields.securityCode}
            onChange={this.handleChange('securityCode')}
            margin={'normal'}
          />
        </div>
        <div>
          <TextField
            className={classNames(styles.input, styles.idNumber)}
            label={'Identification number'}
            value={this.state.fields.idNumber}
            onChange={this.handleChange('idNumber')}
            margin={'normal'}
          />
        </div>
        <div className={styles.confirmButtonDiv}>
          <Button isDisabled={this.isSubmitDisabled()} kind={'primary'} onClick={this.handleSubmit}>
            Confirm payment
          </Button>
        </div>
      </div>
    )
  }
}
