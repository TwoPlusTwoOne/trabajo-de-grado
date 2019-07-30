import * as React from 'react'
import * as styles from './registerForm.scss'
import TextField from '@material-ui/core/TextField/TextField'
import { Button } from '../button/button'

type Fields = {
  firstName: string
  lastName: string
  address: string
  dni: string
  password: string
  email: string
  dateOfBirth: string
}

export type Props = {
  onSubmit: (user: Fields) => void
}

export type State = {
  fields: Fields
}

export class RegisterForm extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      fields: {
        firstName: '',
        lastName: '',
        address: '',
        dni: '',
        password: '',
        email: '',
        dateOfBirth: '',
      }
    }
  }


  handleChange = (name: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fields: { ...this.state.fields, [name]: event.target.value } })
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.fields)
  }

  render() {
    const { fields } = this.state
    return (
      <div>
        <div>
          <TextField
            className={styles.field}
            label={'First name'}
            value={fields.firstName}
            onChange={this.handleChange('firstName')}
            margin={'normal'}
          />
        </div>
        <div>
          <TextField
            className={styles.field}
            label={'Last name'}
            value={fields.lastName}
            onChange={this.handleChange('lastName')}
            margin={'normal'}
          />
        </div>
        <div>
          <TextField
            className={styles.field}
            label={'Address'}
            value={fields.address}
            onChange={this.handleChange('address')}
            margin={'normal'}
          />
        </div>
        <div>
          <TextField
            className={styles.field}
            label={'DNI'}
            value={fields.dni}
            onChange={this.handleChange('dni')}
            margin={'normal'}
          />
        </div>
        <div>
          <TextField
            className={styles.field}
            label={'Password'}
            value={fields.password}
            onChange={this.handleChange('password')}
            margin={'normal'}
            type={'password'}
          />
        </div>
        <div>
          <TextField
            className={styles.field}
            label={'Email'}
            value={fields.email}
            onChange={this.handleChange('email')}
            margin={'normal'}
          />
        </div>
        <div>
          <TextField
            className={styles.field}
            label={'Date of birth'}
            value={fields.dateOfBirth}
            onChange={this.handleChange('dateOfBirth')}
            margin={'normal'}
            type={'date'}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div>
          <Button className={styles.registerButton} kind={'primary'} onClick={this.handleSubmit}>Register</Button>
        </div>
      </div>
    )
  }
}
