import * as React from 'react'
import * as styles from './registerView.scss'
import { RegisterForm } from '../../components/register-form/registerForm'
import Paper from '@material-ui/core/Paper/Paper'
import { registerUser } from '../../api/api'
import { Redirect } from 'react-router'
import { Loader } from '../../components/loader/loader'

export type Props = {}

export type State = {
  isRegistering: boolean
  redirect?: string
}

export class RegisterView extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { isRegistering: false }
  }


  handleSubmit = (user: {
    firstName: string
    lastName: string
    address: string
    dni: string
    password: string
    email: string
    dateOfBirth: string
  }) => {
    const { firstName, password, address, dateOfBirth, dni, email, lastName } = user
    this.setState({ isRegistering: true })
    registerUser({
      email,
      dni,
      password,
      birthdate: new Date(dateOfBirth),
      direction: address,
      first_name: firstName,
      last_name: lastName,
    }).then(console.log)
      .catch(console.log)
      .then(() => this.setState({ isRegistering: false, redirect: '/login' }))
  }

  render() {
    const { redirect, isRegistering } = this.state

    if (redirect) return <Redirect to={redirect} />

    return (
      <div className={styles.container}>
        <Paper className={styles.paper}>
          {isRegistering ? <Loader /> : <RegisterForm onSubmit={this.handleSubmit} />}
        </Paper>
      </div>
    )
  }
}
