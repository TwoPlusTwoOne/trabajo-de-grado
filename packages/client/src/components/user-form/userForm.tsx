import * as React from 'react'
import { UserBase } from '../../helpers/auth'
import { TextField } from '@material-ui/core'
import { Button } from '../button/button'
import { Loader } from '../loader/loader'
import * as styles from './userForm.scss'

export type Props = {
  user: UserBase | null
  isSubmitting: boolean
  onSubmit: (user: UserBase) => void
  onCancel: () => void
}

export type State = {
  fields: Fields
}

export type Fields = {
  [K in keyof UserBase]: UserBase[K]
}

export class UserForm extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      fields: {
        last_name: '',
        first_name: '',
        id: -1,
        userID: -1,
        email: '',
        birthdate: '',
        direction: '',
        dni: '',
        password: '',
      },
    }
  }


  componentDidMount(): void {
    this.mapPropsToState()
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.user !== this.props.user) this.mapPropsToState()
  }

  mapPropsToState = () => {
    const { user } = this.props

    if (!user) {
      this.setState({
        fields: {
          last_name: '',
          first_name: '',
          id: -1,
          userID: -1,
          email: '',
          birthdate: '',
          direction: '',
          dni: '',
          password: '',
        },
      })
    } else {
      const { password, dni, direction, birthdate, email, userID, id, first_name, last_name } = user
      this.setState({ fields: { password, dni, direction, birthdate, email, userID, id, first_name, last_name } })
    }

  }

  handleChange = (fieldName: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fields: { ...this.state.fields, [fieldName]: event.target.value } })
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.fields)
  }

  isSubmitDisabled = () => {
    const { fields } = this.state

    return !Object.entries(fields).reduce((acc, field) => acc && !!field[1], true)
  }

  render() {
    const { onCancel, isSubmitting } = this.props
    const { birthdate, direction, dni, email, first_name, last_name, password } = this.state.fields
    return (
      <div>
        <div>
          <TextField
            className={styles.field}
            label={'First name'}
            name={'first_name'}
            value={first_name}
            onChange={this.handleChange('first_name')}
          />
        </div>
        <div>
          <TextField
            className={styles.field}
            label={'Last name'}
            name={'last_name'}
            value={last_name}
            onChange={this.handleChange('last_name')}
          />
        </div>
        <div>
          <TextField
            className={styles.field}
            label={'Email'}
            name={'email'}
            value={email}
            onChange={this.handleChange('email')}
            type={'email'}
          />
        </div>
        <div>
          <TextField
            className={styles.field}
            label={'Birth date'}
            name={'birthdate'}
            value={birthdate}
            onChange={this.handleChange('birthdate')}
            type={'date'}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div>
          <TextField
            className={styles.field}
            label={'Address'}
            name={'direction'}
            value={direction}
            onChange={this.handleChange('direction')}
          />
        </div>
        <div>
          <TextField
            className={styles.field}
            label={'DNI'}
            name={'dni'}
            value={dni}
            onChange={this.handleChange('dni')}
          />
        </div>
        <div>
          <TextField
            className={styles.field}
            label={'Password'}
            name={'password'}
            value={password}
            onChange={this.handleChange('password')}
            type={'password'}
          />
        </div>
        <div>
          {isSubmitting
            ? <Loader />
            : <div className={styles.buttonsDiv}>
              <Button kind={'secondary'} onClick={onCancel}>Cancel</Button>
              <Button isDisabled={this.isSubmitDisabled()} kind={'primary'} onClick={this.handleSubmit}>Submit</Button>
            </div>
          }
        </div>
      </div>
    )
  }
}
